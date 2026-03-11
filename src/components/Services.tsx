import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap } from 'lucide-react';
import { Service } from '@/lib/data';
import { Language } from '@/lib/i18n';
import { motion } from 'framer-motion';

interface ServicesProps {
  services: Service[];
  translations: any;
  language: Language;
}

export const Services = ({ services, translations, language }: ServicesProps) => {
  const { services: servicesT } = translations;

  const categoryColors: Record<string, string> = {
    laser: 'bg-primary/20 text-primary border border-primary/30',
    depilation: 'bg-secondary/20 text-secondary border border-secondary/30',
    aesthetic: 'bg-accent text-accent-foreground border border-border',
    facial: 'bg-muted text-muted-foreground border border-border',
  };

  return (
    <section id="services" className="py-24 bg-background cyber-grid relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Tratamentos Premium</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">
            <span className="text-gradient-neon">{servicesT.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground font-sans">
            {servicesT.subtitle}
          </p>
          <div className="mx-auto w-24 glow-line" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Card className="group hover:shadow-neon transition-smooth border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/40 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={categoryColors[service.category]} variant="outline">
                      {service.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs font-mono">{service.duration} {servicesT.duration}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-display group-hover:text-primary transition-smooth tracking-wide">
                    {service.name[language]}
                  </CardTitle>
                  <CardDescription className="text-sm font-sans">
                    {service.description[language]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-display font-bold text-primary">
                    {service.priceType === 'fixed' && service.price
                      ? `${service.price.toLocaleString()} MT`
                      : servicesT.priceOnConsultation}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
