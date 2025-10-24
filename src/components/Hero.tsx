import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-spa.jpg';

interface HeroProps {
  translations: any;
  onBookClick: () => void;
  onLearnMoreClick: () => void;
}

export const Hero = ({ translations, onBookClick, onLearnMoreClick }: HeroProps) => {
  const { hero } = translations;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="PelomenosMZ Spa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/90 backdrop-blur-sm border border-border">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-foreground">SPA Profissional em Maputo</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground leading-tight tracking-tight">
            {hero.title}
          </h1>

          <p className="text-xl sm:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto">
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={onBookClick}
              className="w-full sm:w-auto min-w-[200px] text-base font-semibold"
            >
              {hero.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onLearnMoreClick}
              className="w-full sm:w-auto min-w-[200px] border-2 border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              {hero.learnMore}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-primary-foreground/50" />
        </div>
      </div>
    </section>
  );
};
