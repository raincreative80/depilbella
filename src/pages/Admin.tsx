import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getCurrentUser, signOut, hasRole, type AuthUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogOut, Calendar, Users, BarChart3, Settings, MapPin } from 'lucide-react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AppointmentsManager } from '@/components/admin/AppointmentsManager';
import { ProfessionalsManager } from '@/components/admin/ProfessionalsManager';
import { ReviewsManager } from '@/components/admin/ReviewsManager';
import { locations } from '@/lib/data';

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        checkUser();
      }
    });
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkUser = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    
    // Check if user has admin or secretary role
    if (!hasRole(currentUser, 'admin') && !hasRole(currentUser, 'secretary')) {
      navigate('/');
      return;
    }
    
    setUser(currentUser);
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const isAdmin = hasRole(user, 'admin');

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold">Depil Bella Admin</h1>
            <p className="text-sm text-muted-foreground">
              {user?.email} - {isAdmin ? 'Administrador' : 'Secretária'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder="Selecionar local" />
                </SelectTrigger>
                <SelectContent>
                  {isAdmin && <SelectItem value="all">Todas as localizações</SelectItem>}
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="w-4 h-4 mr-2" />
              Agendamentos
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="professionals">
                <Users className="w-4 h-4 mr-2" />
                Profissionais
              </TabsTrigger>
            )}
            {isAdmin && (
              <TabsTrigger value="reviews">
                <Settings className="w-4 h-4 mr-2" />
                Avaliações
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard user={user} locationId={selectedLocation} />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentsManager user={user} locationId={selectedLocation} />
          </TabsContent>

          {isAdmin && (
            <TabsContent value="professionals">
              <ProfessionalsManager />
            </TabsContent>
          )}

          {isAdmin && (
            <TabsContent value="reviews">
              <ReviewsManager />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
