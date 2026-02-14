// LoveLink Types - No-Login Valentine's Experience

export type PartnerTitle = 'Partner' | 'Wife' | 'Husband' | 'Girlfriend' | 'Boyfriend' | 'Fiancé' | 'Fiancée' | 'Custom';
export type Tone = 'Sweet' | 'Funny' | 'Poetic' | 'Deep' | 'Spicy';
export type CardType = 
  | 'Memory Lane' 
  | 'This or That' 
  | 'Love Quiz' 
  | 'Gratitude' 
  | 'Promise Card' 
  | 'Future Map' 
  | 'Secret Reveal' 
  | 'Playlist Link' 
  | 'Photo Link';
export type ExpiryOption = '7 days' | '30 days' | 'never';
export type RibbonColor = 'coral' | 'cream' | 'soft-pink' | 'deep-rose' | 'gold' | 'silver' | 'burgundy' | 'navy';
export type WrapStyle = 'kraft' | 'white' | 'blush' | 'none' | 'velvet-red' | 'lace' | 'brown-paper' | 'cellophane';
export type PotStyle = 'none' | 'terracotta' | 'white-ceramic' | 'glass-vase' | 'basket' | 'rustic-wood';
export type StemColor = 'green' | 'dark-green' | 'light-green' | 'brown' | 'gray';
export type FlowerType = 'rose' | 'tulip' | 'daisy' | 'sunflower' | 'lily' | 'orchid' | 'peony' | 'lavender' | 'carnation';

export interface SelectedFlower {
  id: string;
  type: FlowerType;
  color: string;
  stemColor: StemColor;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  stemLength?: number;
}

export interface Bouquet {
  flowers: SelectedFlower[];
  ribbonColor: RibbonColor;
  wrapStyle: WrapStyle;
  potStyle: PotStyle;
  tagLine: string;
  ribbonName: string;
  stemColor: StemColor;
  bunchTightness: number;
}

export interface Card {
  id: string;
  type: CardType;
  order: number;
  questions?: Question[];
  content?: string;
}

export interface Question {
  id: string;
  question: string;
  options?: string[];
}

export interface Plans {
  thisYear: string;
  nextYear: string;
  manifestation: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
}

export interface LoveLinkData {
  slug: string;
  senderName: string;
  receiverName: string;
  partnerTitle: PartnerTitle;
  customTitle?: string;
  senderNote: string;
  senderBouquet: Bouquet;
  cards: CardType[];
  plans: Plans;
  musicUrl?: string;
  hasPin: boolean;
  viewCount: number;
  createdAt: string;
}

export interface WizardData {
  step: number;
  senderName: string;
  receiverName: string;
  partnerTitle: PartnerTitle;
  customTitle: string;
  tone: Tone;
  senderNote: string;
  selectedCards: CardType[];
  bouquet: Bouquet;
  plans: Plans;
  links: LinkItem[];
  musicUrl: string;
  pin: string;
  expiry: ExpiryOption;
  openDate?: Date;
}

// Flower color options
export const FLOWER_COLORS: Record<FlowerType, string[]> = {
  rose: ['#D56A6A', '#FFB6C1', '#FFFFFF', '#FF0000', '#FFA07A', '#DC143C', '#FF69B4', '#800020'],
  tulip: ['#E8B4B4', '#FF6347', '#FFD700', '#9370DB', '#FFFFFF', '#FF69B4', '#FFA500', '#FF1493'],
  daisy: ['#FFF8E7', '#FFFACD', '#F0E68C', '#FFFFFF', '#FFE4E1', '#FFFFE0'],
  sunflower: ['#FFD93D', '#FFA500', '#FF8C00', '#FFD700', '#F0E68C', '#DAA520'],
  lily: ['#F8E8E8', '#FFB6C1', '#FFA07A', '#FFFFFF', '#FFF0F5', '#FFDAB9', '#E6E6FA'],
  orchid: ['#E6E6FA', '#DDA0DD', '#FF69B4', '#FFFFFF', '#DA70D6', '#EE82EE', '#D8BFD8'],
  peony: ['#F4C2C2', '#FFB6C1', '#FFFFFF', '#FF1493', '#FFC0CB', '#FFE4E1', '#DB7093'],
  lavender: ['#9B7CB6', '#9370DB', '#8A2BE2', '#BA55D3', '#DDA0DD', '#E6E6FA'],
  carnation: ['#FFB6C1', '#FF69B4', '#FF1493', '#FFFFFF', '#FF6347', '#F08080', '#DC143C']
};

// Flower display names
export const FLOWER_NAMES: Record<FlowerType, string> = {
  rose: 'Rose',
  tulip: 'Tulip',
  daisy: 'Daisy',
  sunflower: 'Sunflower',
  lily: 'Lily',
  orchid: 'Orchid',
  peony: 'Peony',
  lavender: 'Lavender',
  carnation: 'Carnation'
};

// Stem color options
export const STEM_COLORS: { value: StemColor; label: string; color: string }[] = [
  { value: 'green', label: 'Green', color: '#4A7C59' },
  { value: 'dark-green', label: 'Dark Green', color: '#2D5016' },
  { value: 'light-green', label: 'Light Green', color: '#7CB87C' },
  { value: 'brown', label: 'Brown', color: '#8B7355' },
  { value: 'gray', label: 'Gray', color: '#808080' }
];

// Pot style options
export const POT_STYLES: { value: PotStyle; label: string; color: string }[] = [
  { value: 'none', label: 'No Pot', color: 'transparent' },
  { value: 'terracotta', label: 'Terracotta', color: '#D2691E' },
  { value: 'white-ceramic', label: 'White Ceramic', color: '#F5F5F5' },
  { value: 'glass-vase', label: 'Glass Vase', color: '#E0F7FA' },
  { value: 'basket', label: 'Wicker Basket', color: '#D2B48C' },
  { value: 'rustic-wood', label: 'Rustic Wood', color: '#8B4513' }
];

// Ribbon color options
export const RIBBON_COLORS: { value: RibbonColor; label: string; color: string }[] = [
  { value: 'coral', label: 'Coral', color: '#D56A6A' },
  { value: 'cream', label: 'Cream', color: '#F5E6D3' },
  { value: 'soft-pink', label: 'Soft Pink', color: '#F4C2C2' },
  { value: 'deep-rose', label: 'Deep Rose', color: '#B85C5C' },
  { value: 'gold', label: 'Gold', color: '#FFD93D' },
  { value: 'silver', label: 'Silver', color: '#C0C0C0' },
  { value: 'burgundy', label: 'Burgundy', color: '#800020' },
  { value: 'navy', label: 'Navy', color: '#000080' }
];

// Wrap style options
export const WRAP_STYLES: { value: WrapStyle; label: string; color: string }[] = [
  { value: 'kraft', label: 'Kraft Paper', color: '#C4A77D' },
  { value: 'white', label: 'White', color: '#FAFAFA' },
  { value: 'blush', label: 'Blush', color: '#F8E8E8' },
  { value: 'velvet-red', label: 'Velvet Red', color: '#8B0000' },
  { value: 'lace', label: 'Lace', color: '#FFF0F5' },
  { value: 'brown-paper', label: 'Brown Paper', color: '#8B7355' },
  { value: 'cellophane', label: 'Cellophane', color: '#E8F5E9' },
  { value: 'none', label: 'No Wrap', color: 'transparent' }
];

export const DEFAULT_WIZARD_DATA: WizardData = {
  step: 1,
  senderName: '',
  receiverName: '',
  partnerTitle: 'Partner',
  customTitle: '',
  tone: 'Sweet',
  senderNote: '',
  selectedCards: ['Memory Lane', 'This or That', 'Love Quiz'],
  bouquet: {
    flowers: [
      { id: '1', type: 'rose', color: '#D56A6A', stemColor: 'green', x: 35, y: 35, rotation: -15, scale: 1, stemLength: 80 },
      { id: '2', type: 'tulip', color: '#E8B4B4', stemColor: 'green', x: 50, y: 30, rotation: 0, scale: 1.1, stemLength: 90 },
      { id: '3', type: 'daisy', color: '#FFF8E7', stemColor: 'green', x: 65, y: 35, rotation: 15, scale: 1, stemLength: 85 },
      { id: '4', type: 'rose', color: '#FFB6C1', stemColor: 'green', x: 42, y: 50, rotation: -10, scale: 0.9, stemLength: 75 },
      { id: '5', type: 'lily', color: '#F8E8E8', stemColor: 'green', x: 58, y: 48, rotation: 10, scale: 1, stemLength: 95 },
    ],
    ribbonColor: 'coral',
    wrapStyle: 'kraft',
    potStyle: 'none',
    tagLine: 'To my favorite human',
    ribbonName: '',
    stemColor: 'green',
    bunchTightness: 0.7
  },
  plans: {
    thisYear: '',
    nextYear: '',
    manifestation: ''
  },
  links: [],
  musicUrl: '',
  pin: '',
  expiry: '30 days'
};

export const CARD_TEMPLATES: Record<CardType, { icon: string; description: string; defaultQuestions?: string[] }> = {
  'Memory Lane': {
    icon: '📸',
    description: 'Reminisce about your favorite moments together',
    defaultQuestions: ['What was your first impression of me?', 'What is your favorite memory of us?']
  },
  'This or That': {
    icon: '⚖️',
    description: 'Fun choices to learn more about each other',
    defaultQuestions: ['Beach or mountains?', 'Coffee or tea?', 'Early bird or night owl?']
  },
  'Love Quiz': {
    icon: '💝',
    description: 'Test how well you know each other',
    defaultQuestions: ['What is my favorite color?', 'What food do I love most?', 'What is my dream vacation?']
  },
  'Gratitude': {
    icon: '🙏',
    description: 'Share three things you are grateful for',
    defaultQuestions: ['What are three things you appreciate about us?']
  },
  'Promise Card': {
    icon: '🤝',
    description: 'Make a meaningful promise to each other',
    defaultQuestions: ['What is one promise you want to make to me?']
  },
  'Future Map': {
    icon: '🗺️',
    description: 'Dream about your future together',
    defaultQuestions: ['Where do you see us in 5 years?', 'What adventure should we plan next?']
  },
  'Secret Reveal': {
    icon: '🔐',
    description: 'Share a secret that unlocks after they answer',
    defaultQuestions: ['I have a secret to tell you...']
  },
  'Playlist Link': {
    icon: '🎵',
    description: 'Share a song or playlist that reminds you of them',
    defaultQuestions: ['What song reminds you of us?']
  },
  'Photo Link': {
    icon: '🖼️',
    description: 'Share a photo with a special meaning',
    defaultQuestions: ['Share a photo that captures our love']
  }
};

// App stats
export interface AppStats {
  totalLinksCreated: number;
  totalLinksShared: number;
  totalViews: number;
  activeLinks: number;
}
