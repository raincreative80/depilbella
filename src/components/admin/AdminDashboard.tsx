import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, Users, Clock, CheckCircle2, XCircle } from 'lucide-react';
import type { AuthUser } from '@/lib/auth';
import { services, locations } from '@/lib/data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { format, subDays, eachDayOfInterval, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AppointmentRow {
  id: string;
  service_id: string;
  location_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  created_at: string;
}

interface Props {
  user: AuthUser | null;
  locationId: string; // 'all' or specific
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'hsl(var(--muted-foreground))',
  confirmed: 'hsl(var(--primary))',
  completed: 'hsl(142 76% 36%)',
  cancelled: 'hsl(var(--destructive))',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendentes',
  confirmed: 'Confirmados',
  completed: 'Concluídos',
  cancelled: 'Cancelados',
};

export const AdminDashboard = ({ locationId }: Props) => {
  const [rows, setRows] = useState<AppointmentRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel('dashboard-appointments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, () => fetchData())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('id, service_id, location_id, appointment_date, appointment_time, status, created_at')
        .order('appointment_date', { ascending: false });
      if (error) throw error;
      setRows((data || []) as AppointmentRow[]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = useMemo(
    () => (locationId === 'all' ? rows : rows.filter((r) => r.location_id === locationId)),
    [rows, locationId]
  );

  const today = new Date().toISOString().split('T')[0];

  const stats = useMemo(() => {
    const total = filtered.length;
    const pending = filtered.filter((r) => r.status === 'pending').length;
    const confirmed = filtered.filter((r) => r.status === 'confirmed').length;
    const completed = filtered.filter((r) => r.status === 'completed').length;
    const cancelled = filtered.filter((r) => r.status === 'cancelled').length;
    const todays = filtered.filter((r) => r.appointment_date === today).length;
    return { total, pending, confirmed, completed, cancelled, todays };
  }, [filtered, today]);

  // Top services
  const topServices = useMemo(() => {
    const counts = new Map<string, number>();
    filtered.forEach((r) => counts.set(r.service_id, (counts.get(r.service_id) || 0) + 1));
    return Array.from(counts.entries())
      .map(([id, count]) => ({
        name: services.find((s) => s.id === id)?.name.pt || id,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [filtered]);

  // Appointments over last 30 days
  const trend = useMemo(() => {
    const end = new Date();
    const start = subDays(end, 29);
    const days = eachDayOfInterval({ start, end });
    return days.map((d) => {
      const iso = format(d, 'yyyy-MM-dd');
      const count = filtered.filter((r) => r.appointment_date === iso).length;
      return { date: format(d, 'dd/MM', { locale: ptBR }), count };
    });
  }, [filtered]);

  // Status distribution
  const statusData = useMemo(
    () =>
      (['pending', 'confirmed', 'completed', 'cancelled'] as const)
        .map((s) => ({ name: STATUS_LABELS[s], value: stats[s === 'pending' ? 'pending' : s === 'confirmed' ? 'confirmed' : s === 'completed' ? 'completed' : 'cancelled'], key: s }))
        .filter((s) => s.value > 0),
    [stats]
  );

  // Per-location breakdown (only when viewing all)
  const perLocation = useMemo(() => {
    if (locationId !== 'all') return [];
    return locations.map((loc) => ({
      name: loc.name.split(',')[0],
      count: rows.filter((r) => r.location_id === loc.id).length,
    }));
  }, [rows, locationId]);

  if (isLoading) {
    return <div className="text-muted-foreground">Carregando estatísticas...</div>;
  }

  const currentLocationName =
    locationId === 'all' ? 'Todas as localizações' : locations.find((l) => l.id === locationId)?.name;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-semibold">{currentLocationName}</h2>
        <p className="text-sm text-muted-foreground">Visão geral dos agendamentos</p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <KpiCard title="Total" value={stats.total} icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
        <KpiCard title="Hoje" value={stats.todays} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        <KpiCard title="Pendentes" value={stats.pending} icon={<Clock className="h-4 w-4 text-muted-foreground" />} />
        <KpiCard title="Confirmados" value={stats.confirmed} icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} />
        <KpiCard title="Concluídos" value={stats.completed} icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />} />
        <KpiCard title="Cancelados" value={stats.cancelled} icon={<XCircle className="h-4 w-4 text-muted-foreground" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Atendimentos — últimos 30 dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top services */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Serviços mais escolhidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {topServices.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sem dados</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topServices} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis type="category" dataKey="name" width={140} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Status distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribuição por status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {statusData.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sem dados</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={90} label>
                      {statusData.map((entry) => (
                        <Cell key={entry.key} fill={STATUS_COLORS[entry.key]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Per location or per-hour */}
        {locationId === 'all' ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Agendamentos por localização</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={perLocation}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Horários mais procurados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={buildHourData(filtered)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

function buildHourData(rows: AppointmentRow[]) {
  const counts = new Map<string, number>();
  rows.forEach((r) => {
    const h = (r.appointment_time || '').slice(0, 2);
    if (!h) return;
    counts.set(h + ':00', (counts.get(h + ':00') || 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([hour, count]) => ({ hour, count }))
    .sort((a, b) => a.hour.localeCompare(b.hour));
}
