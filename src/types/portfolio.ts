export interface AccessibilityAudit {
  score: number;
  wcagLevel: 'AAA' | 'AA';
  contrastRatio: string;
  screenReaderTested: string[];
  keyboardNavScore: number;
  ariaComplianceRate: number;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Design Systems' | 'Assistive Tech' | 'Data Visualization' | 'Public Infrastructure';
  period: string;
  clientOrOrg: string;
  summary: string;
  thumbnail: string;
  featured: boolean;
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  solution: string;
  accessibilityFeatures: string[];
  technologies: string[];
  audit: AccessibilityAudit;
  liveUrl?: string;
  githubUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    organization: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  readingTimeMinutes: number;
  category: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  wcagReferences: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  keyOutcomes: string[];
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedYear: string;
  verificationId: string;
  description: string;
}

export type PageId = 'home' | 'projects' | 'about' | 'a11y-lab' | 'writing' | 'contact';

export interface AccessibilitySettings {
  theme: 'light' | 'dark' | 'high-contrast';
  fontSize: 'normal' | 'large' | 'x-large';
  hyperlegibleFont: boolean;
  enhancedFocus: boolean;
  reducedMotion: boolean;
  announcementsEnabled: boolean;
  readingRuler: boolean;
}
