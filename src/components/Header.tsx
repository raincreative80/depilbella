import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Language } from '@/lib/i18n';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: any;
}

export const Header = ({ language, setLanguage, translations }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { nav } = translations;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold text-primary tracking-tight">
              PelomenosMZ
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              {nav.services}
            </button>
            <button
              onClick={() => scrollToSection('locations')}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              {nav.locations}
            </button>
            <button
              onClick={() => scrollToSection('booking')}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              {nav.booking}
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'pt' ? 'EN' : 'PT'}
            </Button>
            <Button variant="hero" size="lg" onClick={() => scrollToSection('booking')}>
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
        {mobileMenuOpen && (
          <div className="md:hidden py-6 space-y-4 border-t border-border">
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left py-3 text-foreground hover:text-primary transition-smooth font-medium"
            >
              {nav.services}
            </button>
            <button
              onClick={() => scrollToSection('locations')}
              className="block w-full text-left py-3 text-foreground hover:text-primary transition-smooth font-medium"
            >
              {nav.locations}
            </button>
            <button
              onClick={() => scrollToSection('booking')}
              className="block w-full text-left py-3 text-foreground hover:text-primary transition-smooth font-medium"
            >
              {nav.booking}
            </button>
            <div className="pt-4 flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === 'pt' ? 'English' : 'Português'}
              </Button>
              <Button variant="hero" className="flex-1" onClick={() => scrollToSection('booking')}>
                {nav.booking}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
