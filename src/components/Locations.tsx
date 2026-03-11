import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Phone, Clock } from 'lucide-react';
import { Location } from '@/lib/data';
import { motion } from 'framer-motion';

interface LocationsProps {
  locations: Location[];
  translations: any;
}

export const Locations = ({ locations, translations }: LocationsProps) => {
  const { locations: locationsT } = translations;

  return (
    <section id="locations" className="py-24 bg-card/50 relative">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-display font-bold">
            <span className="text-gradient-neon">{locationsT.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground font-sans">
            {locationsT.subtitle}
          </p>
          <div className="mx-auto w-24 glow-line" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group hover:shadow-neon transition-smooth border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/40">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:shadow-neon transition-smooth">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-display group-hover:text-primary transition-smooth tracking-wide">
                    {location.name}
                  </CardTitle>
                  <CardDescription className="text-sm flex items-start gap-2 mt-2 font-sans">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{location.address}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm font-sans">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <div>
                        <p className="font-medium text-foreground">{locationsT.hours}</p>
                        <p className="text-xs">{locationsT.hoursText}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span className="font-mono text-xs">{location.whatsapp}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full group/btn border-primary/30 hover:border-primary hover:shadow-neon uppercase tracking-wider text-xs"
                    asChild
                  >
                    <a
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      {locationsT.viewOnMap}
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-smooth" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
