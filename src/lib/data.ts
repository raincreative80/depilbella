export interface Service {
  id: string;
  name: { pt: string; en: string };
  description: { pt: string; en: string };
  price?: number;
  priceType: 'fixed' | 'consultation';
  duration: number;
  category: 'depilation' | 'laser' | 'aesthetic' | 'facial';
}

export interface Location {
  id: string;
  name: string;
  address: string;
  whatsapp: string;
  mapsUrl: string;
  coordinates: { lat: number; lng: number };
}

export const services: Service[] = [
  {
    id: 'hollywood',
    name: { pt: 'Hollywood', en: 'Hollywood' },
    description: { pt: 'Depilação completa e profissional', en: 'Complete professional hair removal' },
    price: 2500,
    priceType: 'fixed',
    duration: 47,
    category: 'laser',
  },
  {
    id: 'wart-removal',
    name: { pt: 'Remoção de Verrugas', en: 'Wart Removal' },
    description: { pt: 'Tratamento seguro e eficaz', en: 'Safe and effective treatment' },
    priceType: 'consultation',
    duration: 30,
    category: 'aesthetic',
  },
  {
    id: 'tattoo-removal',
    name: { pt: 'Remoção de Tatuagem', en: 'Tattoo Removal' },
    description: { pt: 'Tecnologia avançada a laser', en: 'Advanced laser technology' },
    priceType: 'consultation',
    duration: 45,
    category: 'laser',
  },
  {
    id: 'wax-armpits',
    name: { pt: 'Axilas - Depilação a Cera', en: 'Armpits - Waxing' },
    description: { pt: 'Depilação suave e duradoura', en: 'Smooth and lasting hair removal' },
    price: 500,
    priceType: 'fixed',
    duration: 15,
    category: 'depilation',
  },
  {
    id: 'wax-bikini',
    name: { pt: 'Virilha Completa - Depilação a Cera', en: 'Full Bikini - Waxing' },
    description: { pt: 'Depilação completa da região', en: 'Complete area hair removal' },
    price: 700,
    priceType: 'fixed',
    duration: 30,
    category: 'depilation',
  },
  {
    id: 'wax-abdomen',
    name: { pt: 'Abdômen - Depilação a Cera', en: 'Abdomen - Waxing' },
    description: { pt: 'Pele lisa e macia', en: 'Smooth and soft skin' },
    price: 500,
    priceType: 'fixed',
    duration: 20,
    category: 'depilation',
  },
  {
    id: 'wax-chest',
    name: { pt: 'Peito - Depilação a Cera', en: 'Chest - Waxing' },
    description: { pt: 'Tratamento profissional', en: 'Professional treatment' },
    price: 400,
    priceType: 'fixed',
    duration: 25,
    category: 'depilation',
  },
  {
    id: 'wax-back',
    name: { pt: 'Costas - Depilação a Cera', en: 'Back - Waxing' },
    description: { pt: 'Depilação completa das costas', en: 'Complete back hair removal' },
    price: 500,
    priceType: 'fixed',
    duration: 30,
    category: 'depilation',
  },
  {
    id: 'wax-arms',
    name: { pt: 'Braços - Depilação a Cera', en: 'Arms - Waxing' },
    description: { pt: 'Braços completos', en: 'Full arms' },
    price: 750,
    priceType: 'fixed',
    duration: 35,
    category: 'depilation',
  },
  {
    id: 'wax-half-leg',
    name: { pt: 'Meia Perna - Depilação a Cera', en: 'Half Leg - Waxing' },
    description: { pt: 'Do joelho até o tornozelo', en: 'From knee to ankle' },
    price: 700,
    priceType: 'fixed',
    duration: 30,
    category: 'depilation',
  },
  {
    id: 'wax-full-leg',
    name: { pt: 'Perna Inteira - Depilação a Cera', en: 'Full Leg - Waxing' },
    description: { pt: 'Pernas completamente lisas', en: 'Completely smooth legs' },
    price: 1000,
    priceType: 'fixed',
    duration: 50,
    category: 'depilation',
  },
  {
    id: 'wax-chin',
    name: { pt: 'Queixo - Depilação a Cera', en: 'Chin - Waxing' },
    description: { pt: 'Remoção delicada de pelos faciais', en: 'Delicate facial hair removal' },
    price: 250,
    priceType: 'fixed',
    duration: 10,
    category: 'depilation',
  },
  {
    id: 'wax-upper-lip',
    name: { pt: 'Buço - Depilação a Cera', en: 'Upper Lip - Waxing' },
    description: { pt: 'Tratamento facial delicado', en: 'Delicate facial treatment' },
    price: 250,
    priceType: 'fixed',
    duration: 10,
    category: 'depilation',
  },
  {
    id: 'intimate-whitening',
    name: { pt: 'Clareamento Íntimo / Vajacial', en: 'Intimate Whitening / Vajacial' },
    description: { pt: 'Tratamento de clareamento e rejuvenescimento', en: 'Whitening and rejuvenation treatment' },
    priceType: 'consultation',
    duration: 60,
    category: 'aesthetic',
  },
  {
    id: 'vaginal-rejuvenation',
    name: { pt: 'Rejuvenescimento Vaginal', en: 'Vaginal Rejuvenation' },
    description: { pt: 'Tratamento avançado de rejuvenescimento', en: 'Advanced rejuvenation treatment' },
    priceType: 'consultation',
    duration: 60,
    category: 'aesthetic',
  },
  {
    id: 'facial-cleaning',
    name: { pt: 'Limpeza de Pele / Fototerapia', en: 'Facial Cleaning / Phototherapy' },
    description: { pt: 'Limpeza profunda com tecnologia', en: 'Deep cleaning with technology' },
    priceType: 'consultation',
    duration: 60,
    category: 'facial',
  },
  {
    id: 'lipocavitation',
    name: { pt: 'Lipocavitação', en: 'Lipocavitation' },
    description: { pt: 'Redução de gordura localizada', en: 'Localized fat reduction' },
    priceType: 'consultation',
    duration: 60,
    category: 'aesthetic',
  },
  {
    id: 'lipolaser',
    name: { pt: 'Lipolazer HD', en: 'Lipolaser HD' },
    description: { pt: 'Tecnologia de última geração', en: 'Latest generation technology' },
    priceType: 'consultation',
    duration: 60,
    category: 'aesthetic',
  },
  {
    id: 'acne-protocol',
    name: { pt: 'Protocolo para Acne', en: 'Acne Protocol' },
    description: { pt: 'Tratamento completo para acne', en: 'Complete acne treatment' },
    priceType: 'consultation',
    duration: 50,
    category: 'facial',
  },
];

export const locations: Location[] = [
  {
    id: 'malhangalene',
    name: 'Avenida Malhangalene',
    address: 'Av. Malhangalene, Maputo',
    whatsapp: '{{WHATSAPP_MALHANGALENE}}',
    mapsUrl: 'https://maps.google.com/?q=Avenida+Malhangalene+Maputo',
    coordinates: { lat: -25.9655, lng: 32.5832 },
  },
  {
    id: 'cmc',
    name: 'CMC, Próx. Ao Barição',
    address: 'CMC, Próximo ao Barição, Maputo',
    whatsapp: '{{WHATSAPP_CMC}}',
    mapsUrl: 'https://maps.google.com/?q=CMC+Baricao+Maputo',
    coordinates: { lat: -25.9530, lng: 32.5890 },
  },
  {
    id: 'matola',
    name: 'Matola, Cruzamento da Mozal',
    address: 'Matola, Cruzamento da Mozal, N4',
    whatsapp: '{{WHATSAPP_MATOLA}}',
    mapsUrl: 'https://maps.google.com/?q=Matola+Mozal+N4',
    coordinates: { lat: -25.9620, lng: 32.4589 },
  },
];
