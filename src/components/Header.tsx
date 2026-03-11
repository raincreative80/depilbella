import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Language } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: any;
}

export const Header = ({ language, setLanguage, translations }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { nav } = translations;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${scrolled ? 'glass shadow-neon' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-xl font-display font-bold tracking-widest uppercase text-gradient-neon">
              PelomenosMZ
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: nav.services, id: 'services' },
              { label: nav.locations, id: 'locations' },
              { label: nav.booking, id: 'booking' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-2 text-sm font-medium uppercase tracking-wider text-foreground/80 hover:text-primary transition-smooth group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] gradient-neon group-hover:w-3/4 transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="hover:shadow-neon"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="gap-2 uppercase tracking-wider text-xs"
            >
              <Globe className="w-4 h-4" />
              {language === 'pt' ? 'EN' : 'PT'}
            </Button>
            <Button
              variant="default"
              size="default"
              onClick={() => scrollToSection('booking')}
              className="shadow-neon uppercase tracking-wider text-xs font-semibold"
            >
              {nav.booking}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 space-y-2 border-t border-border/30">
                {[
                  { label: nav.services, id: 'services' },
                  { label: nav.locations, id: 'locations' },
                  { label: nav.booking, id: 'booking' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth font-medium uppercase tracking-wider text-sm"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 flex gap-3">
                  <Button variant="outline" size="icon" onClick={toggleTheme}>
                    {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 uppercase tracking-wider text-xs"
                    onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {language === 'pt' ? 'English' : 'Português'}
                  </Button>
                  <Button
                    variant="default"
                    className="flex-1 shadow-neon uppercase tracking-wider text-xs"
                    onClick={() => scrollToSection('booking')}
                  >
                    {nav.booking}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
