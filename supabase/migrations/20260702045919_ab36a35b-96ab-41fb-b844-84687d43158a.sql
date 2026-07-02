
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS tattoo_image_path text;

-- Storage policies: allow anyone (booking is anonymous) to upload to tattoo-images bucket
CREATE POLICY "Anyone can upload tattoo images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'tattoo-images');

-- Only admins and secretaries (authenticated with roles) can view
CREATE POLICY "Admins can view tattoo images"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'tattoo-images'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'secretary'))
);
