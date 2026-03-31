import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Send } from 'lucide-react';
import { Service, Location } from '@/lib/data';
import { Language } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface BookingFormProps {
  services: Service[];
  locations: Location[];
  translations: any;
  language: Language;
}

export const BookingForm = ({ services, locations, translations, language }: BookingFormProps) => {
  const { booking } = translations;
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    locationId: '',
    serviceId: '',
    date: '',
    time: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedLocation = locations.find(l => l.id === formData.locationId);
    const selectedService = services.find(s => s.id === formData.serviceId);
    
    if (!selectedLocation || !selectedService) return;

    try {
      // Save to database
      const { supabase } = await import('@/integrations/supabase/client');
      const { error } = await supabase.from('appointments').insert({
        client_name: formData.name,
        client_phone: formData.phone,
        service_id: formData.serviceId,
        location_id: formData.locationId,
        appointment_date: formData.date,
        appointment_time: formData.time,
        notes: formData.notes,
        status: 'pending',
      });

      if (error) throw error;

      // Format WhatsApp message
      const message = `Novo agendamento PelomenosMZ:%0A
Cliente: ${formData.name}%0A
Telefone: ${formData.phone}%0A
Serviço: ${selectedService.name[language]}%0A
Local: ${selectedLocation.name}%0A
Data/Hora: ${formData.date} às ${formData.time}%0A
Observações: ${formData.notes || 'Nenhuma'}`;

      // Open WhatsApp
      const whatsappNumber = selectedLocation.whatsapp.replace(/\D/g, '');
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

      toast({
        title: booking.success,
        description: 'Você será redirecionado para o WhatsApp.',
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        locationId: '',
        serviceId: '',
        date: '',
        time: '',
        notes: '',
      });
    } catch (error) {
      toast({
        title: 'Erro ao agendar',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="booking" className="py-24 gradient-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground">
              {booking.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {booking.subtitle}
            </p>
          </div>

          <Card className="shadow-hover border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calendar className="w-6 h-6 text-primary" />
                {booking.title}
              </CardTitle>
              <CardDescription>{booking.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{booking.name}</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="João Silva"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{booking.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+258 84 123 4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">{booking.location}</Label>
                  <Select
                    value={formData.locationId}
                    onValueChange={(value) => setFormData({ ...formData, locationId: value })}
                    required
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder={booking.selectLocation} />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">{booking.service}</Label>
                  <Select
                    value={formData.serviceId}
                    onValueChange={(value) => setFormData({ ...formData, serviceId: value })}
                    required
                  >
                    <SelectTrigger id="service">
                      <SelectValue placeholder={booking.selectService} />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name[language]} - {service.duration}min
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">{booking.date}</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">{booking.time}</Label>
                    <Input
                      id="time"
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      min="08:30"
                      max="19:00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">{booking.notes}</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Alguma observação especial..."
                    rows={3}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" variant="hero">
                  <Send className="w-5 h-5 mr-2" />
                  {booking.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
