import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Phone, MapPin, Clock, Image as ImageIcon } from 'lucide-react';
import type { AuthUser } from '@/lib/auth';
import { services, locations } from '@/lib/data';

interface Appointment {
  id: string;
  client_name: string;
  client_phone: string;
  service_id: string;
  location_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string;
  created_at: string;
  tattoo_image_path: string | null;
}

export const AppointmentsManager = ({ user, locationId = 'all' }: { user: AuthUser | null; locationId?: string }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAppointments();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('appointments-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, () => {
        fetchAppointments();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: false })
        .order('appointment_time', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: 'Erro ao carregar agendamentos',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled' | 'completed') => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Status atualizado',
        description: 'O agendamento foi atualizado com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao atualizar',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: 'secondary',
      confirmed: 'default',
      cancelled: 'destructive',
      completed: 'outline',
    };
    
    const labels: Record<string, string> = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      cancelled: 'Cancelado',
      completed: 'Concluído',
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Carregando agendamentos...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Agendamentos</CardTitle>
      </CardHeader>
      <CardContent>
        {(() => {
          const visible = locationId === 'all' ? appointments : appointments.filter((a) => a.location_id === locationId);
          return visible.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Nenhum agendamento encontrado</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Tatuagem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => {
                const service = services.find(s => s.id === appointment.service_id);
                const location = locations.find(l => l.id === appointment.location_id);
                
                return (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{appointment.client_name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {appointment.client_phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{service?.name.pt}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3" />
                        {location?.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {new Date(appointment.appointment_date).toLocaleDateString('pt-BR')}
                        <Clock className="w-3 h-3 ml-2" />
                        {appointment.appointment_time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <TattooImageCell path={appointment.tattoo_image_path} />
                    </TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell>
                      <Select
                        value={appointment.status}
                        onValueChange={(value) => updateStatus(appointment.id, value as 'pending' | 'confirmed' | 'cancelled' | 'completed')}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="confirmed">Confirmado</SelectItem>
                          <SelectItem value="cancelled">Cancelado</SelectItem>
                          <SelectItem value="completed">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

const TattooImageCell = ({ path }: { path: string | null }) => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const loadUrl = async () => {
    if (!path || url) return;
    setLoading(true);
    const { data, error } = await supabase.storage
      .from('tattoo-images')
      .createSignedUrl(path, 3600);
    if (!error && data) setUrl(data.signedUrl);
    setLoading(false);
  };

  if (!path) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o) loadUrl(); }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <ImageIcon className="w-3 h-3" />
          Ver
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Foto da tatuagem</DialogTitle>
        </DialogHeader>
        {loading && <p className="text-sm text-muted-foreground">Carregando…</p>}
        {url && (
          <img
            src={url}
            alt="Foto da tatuagem enviada pelo cliente"
            className="w-full h-auto rounded-md border border-border"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
