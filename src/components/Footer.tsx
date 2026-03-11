import { MapPin, Phone, Clock, Zap } from 'lucide-react';

interface FooterProps {
  translations: any;
}

export const Footer = ({ translations }: FooterProps) => {
  const { footer } = translations;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="glow-line" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-display font-bold tracking-widest uppercase text-gradient-neon">PelomenosMZ</h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-sans">
              {footer.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-display font-semibold uppercase tracking-widest text-primary">Contacto</h4>
            <div className="space-y-3 text-sm text-white/50 font-sans">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary/60" />
                <span>+258 84 XXX XXXX</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary/60" />
                <span>Maputo, Moçambique</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-display font-semibold uppercase tracking-widest text-primary">Horário</h4>
            <div className="space-y-2 text-sm text-white/50 font-sans">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1 text-primary/60" />
                <div>
                  <p className="font-medium text-white/70">Segunda - Sábado</p>
                  <p>08h30 - 19h00</p>
                  <p className="text-xs mt-1 text-white/30">Encerrado aos Domingos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glow-line mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30 font-sans">
          <p>
            © {currentYear} PelomenosMZ. {footer.rights}.
          </p>
          <div className="flex gap-6">
            <a href="/admin" className="hover:text-primary transition-smooth uppercase tracking-wider text-xs">
              {footer.admin}
            </a>
            <button className="hover:text-primary transition-smooth uppercase tracking-wider text-xs">
              {footer.privacy}
            </button>
            <button className="hover:text-primary transition-smooth uppercase tracking-wider text-xs">
              {footer.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
