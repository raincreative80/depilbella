import { MapPin, Phone, Clock } from 'lucide-react';

interface FooterProps {
  translations: any;
}

export const Footer = ({ translations }: FooterProps) => {
  const { footer } = translations;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gradient-hero text-primary-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold">Depil Bella</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {footer.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contacto</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+258 84 XXX XXXX</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Maputo, Moçambique</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Horário</h4>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1" />
                <div>
                  <p className="font-medium text-primary-foreground">Segunda - Sábado</p>
                  <p>08h30 - 19h00</p>
                  <p className="text-xs mt-1">Encerrado aos Domingos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
            <p>
              © {currentYear} Depil Bella. {footer.rights}.
            </p>
            <div className="flex gap-6">
              <a href="/admin" className="hover:text-primary-foreground transition-smooth">
                {footer.admin}
              </a>
              <button className="hover:text-primary-foreground transition-smooth">
                {footer.privacy}
              </button>
              <button className="hover:text-primary-foreground transition-smooth">
                {footer.terms}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
