
-- 1) Move has_role to private schema (not exposed by PostgREST/GraphQL)
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, anon, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, anon, service_role;

-- 2) Recreate all RLS policies that referenced public.has_role
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can manage professionals" ON public.professionals;
CREATE POLICY "Admins can manage professionals" ON public.professionals
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can manage schedules" ON public.professional_schedules;
CREATE POLICY "Admins can manage schedules" ON public.professional_schedules
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
CREATE POLICY "Admins can manage reviews" ON public.reviews
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can view all reviews" ON public.reviews;
CREATE POLICY "Admins can view all reviews" ON public.reviews
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can manage all appointments" ON public.appointments;
CREATE POLICY "Admins can manage all appointments" ON public.appointments
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can view all appointments" ON public.appointments;
CREATE POLICY "Admins can view all appointments" ON public.appointments
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- Storage policies referencing public.has_role
DROP POLICY IF EXISTS "Admins can view tattoo images" ON storage.objects;
CREATE POLICY "Admins can view tattoo images" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'tattoo-images'
    AND (
      private.has_role(auth.uid(), 'admin'::public.app_role)
      OR private.has_role(auth.uid(), 'secretary'::public.app_role)
    )
  );

-- 3) Drop the publicly-callable has_role in public schema
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 4) Disable GraphQL API exposure (app uses REST only)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'graphql_public') THEN
    EXECUTE 'REVOKE USAGE ON SCHEMA graphql_public FROM anon, authenticated';
    EXECUTE 'REVOKE ALL ON ALL FUNCTIONS IN SCHEMA graphql_public FROM anon, authenticated';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'graphql') THEN
    EXECUTE 'REVOKE USAGE ON SCHEMA graphql FROM anon, authenticated';
  END IF;
END $$;

-- 5) Tighten appointments INSERT policy
DROP POLICY IF EXISTS "Anyone can create appointments" ON public.appointments;
CREATE POLICY "Anyone can create appointments" ON public.appointments
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    (auth.uid() IS NULL AND client_user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND (client_user_id IS NULL OR client_user_id = auth.uid()))
  );

-- 6) Tighten reviews INSERT policy: only signed-in users, only for own appointments
DROP POLICY IF EXISTS "Anyone can create reviews" ON public.reviews;
CREATE POLICY "Users can review own appointments" ON public.reviews
  FOR INSERT TO authenticated
  WITH CHECK (
    rating BETWEEN 1 AND 5
    AND EXISTS (
      SELECT 1 FROM public.appointments a
      WHERE a.id = appointment_id
        AND a.client_user_id = auth.uid()
        AND a.status = 'completed'::public.appointment_status
    )
  );

-- 7) Restrict tattoo image uploads to `bookings/` folder within the private bucket
DROP POLICY IF EXISTS "Anyone can upload tattoo images" ON storage.objects;
CREATE POLICY "Tattoo image uploads scoped to bookings folder" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    bucket_id = 'tattoo-images'
    AND (storage.foldername(name))[1] = 'bookings'
  );
