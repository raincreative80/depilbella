import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Phone, Clock } from 'lucide-react';
import { Location } from '@/lib/data';

interface LocationsProps {
  locations: Location[];
  translations: any;
}

export const Locations = ({ locations, translations }: LocationsProps) => {
  const { locations: locationsT } = translations;

  return (
    <section id="locations" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground">
            {locationsT.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {locationsT.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {locations.map((location, index) => (
            <Card
              key={location.id}
              className="group hover:shadow-hover transition-smooth border-border bg-card"
              style={{
                animationDelay: `${index * 100}ms`,
                opacity: 0,
                animation: 'fadeInScale 0.6s ease-out forwards',
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center shadow-soft group-hover:shadow-hover transition-smooth">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl font-serif group-hover:text-primary transition-smooth">
                  {location.name}
                </CardTitle>
                <CardDescription className="text-sm flex items-start gap-2 mt-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{location.address}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
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
                  className="w-full group/btn"
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
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};
