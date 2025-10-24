import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Locations } from '@/components/Locations';
import { BookingForm } from '@/components/BookingForm';
import { Footer } from '@/components/Footer';
import { getTranslation, Language } from '@/lib/i18n';
import { services, locations } from '@/lib/data';

const Index = () => {
  const [language, setLanguage] = useState<Language>('pt');
  const translations = getTranslation(language);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header
        language={language}
        setLanguage={setLanguage}
        translations={translations}
      />
      
      <main>
        <Hero
          translations={translations}
          onBookClick={() => scrollToSection('booking')}
          onLearnMoreClick={() => scrollToSection('services')}
        />
        
        <Services
          services={services}
          translations={translations}
          language={language}
        />
        
        <Locations
          locations={locations}
          translations={translations}
        />
        
        <BookingForm
          services={services}
          locations={locations}
          translations={translations}
          language={language}
        />
      </main>
      
      <Footer translations={translations} />
    </div>
  );
};

export default Index;
