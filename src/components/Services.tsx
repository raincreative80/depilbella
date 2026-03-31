import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Sparkles } from 'lucide-react';
import { Service } from '@/lib/data';
import { Language } from '@/lib/i18n';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ServicesProps {
  services: Service[];
  translations: any;
  language: Language;
}

export const Services = ({ services, translations, language }: ServicesProps) => {
  const { services: servicesT } = translations;

  const categoryColors: Record<string, string> = {
    laser: 'bg-secondary text-secondary-foreground',
    depilation: 'bg-primary text-primary-foreground',
    aesthetic: 'bg-accent text-accent-foreground',
    facial: 'bg-muted text-muted-foreground',
  };

  return (
    <section id="services" className="py-24 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Tratamentos Premium</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground">
            {servicesT.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {servicesT.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="group hover:shadow-hover transition-smooth border-border bg-card hover:scale-[1.02]"
              style={{
                animationDelay: `${index * 50}ms`,
                opacity: 0,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge className={categoryColors[service.category]}>
                    {service.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{service.duration} {servicesT.duration}</span>
                  </div>
                </div>
                <CardTitle className="text-xl font-serif group-hover:text-primary transition-smooth">
                  {service.name[language]}
                </CardTitle>
                <CardDescription className="text-sm">
                  {service.description[language]}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {service.priceType === 'fixed' && service.price
                    ? `${service.price.toLocaleString()} MT`
                    : servicesT.priceOnConsultation}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
