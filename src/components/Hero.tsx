import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
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
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="PelomenosMZ Spa"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0 cyber-grid opacity-40" />
      </div>

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/30"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-widest">SPA Profissional em Maputo</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight tracking-tight">
            <span className="text-gradient-neon">{hero.title}</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/70 font-light max-w-2xl mx-auto font-sans">
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              onClick={onBookClick}
              className="w-full sm:w-auto min-w-[220px] text-sm font-bold uppercase tracking-widest shadow-neon"
            >
              {hero.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onLearnMoreClick}
              className="w-full sm:w-auto min-w-[220px] border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-primary/50 uppercase tracking-widest text-sm backdrop-blur-sm"
            >
              {hero.learnMore}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border border-primary/40 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 rounded-full bg-primary"
          />
        </div>
      </motion.div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 glow-line" />
    </section>
  );
};
