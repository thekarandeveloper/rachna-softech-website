import { CalendarCheck, FileText, HeartPulse, ListTodo, Wallet } from '@lucide/astro';

/**
 * The product portfolio: simple, useful apps for everyday life. Edit names,
 * descriptions and statuses here and the hero, products section, footer,
 * contact form and structured data all update.
 *
 * `key` selects the mini preview drawn on the product card (tasks, money,
 * health, notes, habits); any other key falls back to a generic preview.
 */

export type ProductStatus = 'Live' | 'Beta' | 'In development' | 'Coming soon';

export interface Product {
  key: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  features: string[];
  status: ProductStatus;
  /** Public product URL. Shown as "Open product" once the status is Live. */
  url: string;
  icon: typeof ListTodo;
  accent: { solid: string; soft: string; text: string };
  /** schema.org applicationCategory used in structured data. */
  schemaCategory: string;
}

export const products: Product[] = [
  {
    key: 'tasks',
    name: 'Rachna Tasks',
    tagline: 'To-do lists & daily planner',
    category: 'Productivity',
    description:
      'Plan your day, organise tasks into lists and never miss what matters, with smart reminders that fit your routine.',
    features: ['Smart lists & reminders', 'Recurring tasks', 'Sync across devices'],
    status: 'In development',
    url: '',
    icon: ListTodo,
    accent: { solid: 'bg-blue-600', soft: 'from-blue-50', text: 'text-blue-600' },
    schemaCategory: 'UtilitiesApplication',
  },
  {
    key: 'money',
    name: 'Rachna Money',
    tagline: 'Personal finance & expenses',
    category: 'Finance',
    description:
      'Track spending, set budgets and see where your money goes, with UPI-friendly expense tracking and simple monthly insights.',
    features: ['Expense tracking', 'Budgets & savings goals', 'Monthly insights'],
    status: 'In development',
    url: '',
    icon: Wallet,
    accent: { solid: 'bg-emerald-600', soft: 'from-emerald-50', text: 'text-emerald-600' },
    schemaCategory: 'FinanceApplication',
  },
  {
    key: 'health',
    name: 'Rachna Health',
    tagline: 'Health & wellness tracker',
    category: 'Health & wellness',
    description:
      'Track steps, sleep, water and medicines in one calm app, with gentle reminders and a clear weekly summary.',
    features: ['Steps, sleep & water', 'Medicine reminders', 'Weekly health summary'],
    status: 'Coming soon',
    url: '',
    icon: HeartPulse,
    accent: { solid: 'bg-rose-600', soft: 'from-rose-50', text: 'text-rose-600' },
    schemaCategory: 'HealthApplication',
  },
  {
    key: 'notes',
    name: 'Rachna Notes',
    tagline: 'Notes & daily journal',
    category: 'Productivity',
    description:
      'Capture ideas, keep a daily journal and find anything in seconds, with helpful AI summaries and privacy by default.',
    features: ['Notes & journal', 'Fast search', 'AI summaries'],
    status: 'Coming soon',
    url: '',
    icon: FileText,
    accent: { solid: 'bg-amber-500', soft: 'from-amber-50', text: 'text-amber-600' },
    schemaCategory: 'UtilitiesApplication',
  },
  {
    key: 'habits',
    name: 'Rachna Habits',
    tagline: 'Habit & routine tracker',
    category: 'Health & wellness',
    description:
      'Build better routines with streaks, gentle nudges and progress you can actually see, one small step at a time.',
    features: ['Streaks & goals', 'Gentle nudges', 'Progress charts'],
    status: 'Coming soon',
    url: '',
    icon: CalendarCheck,
    accent: { solid: 'bg-violet-600', soft: 'from-violet-50', text: 'text-violet-600' },
    schemaCategory: 'LifestyleApplication',
  },
];

export const productCategories = ['All', ...new Set(products.map((p) => p.category))];

export const statusStyles: Record<ProductStatus, string> = {
  Live: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Beta: 'border-blue-200 bg-blue-50 text-blue-700',
  'In development': 'border-amber-200 bg-amber-50 text-amber-700',
  'Coming soon': 'border-slate-200 bg-slate-50 text-slate-600',
};

export function productCta(product: Product) {
  if (product.status === 'Live' && product.url) {
    return { label: `Open ${product.name}`, href: product.url, external: true };
  }
  return { label: 'Get in touch', href: '/#contact', external: false };
}

export const productByKey = (key: string) => products.find((p) => p.key === key);

/** The product announced in the hero badge: the first Live, then Beta, then In development product. */
export function heroAnnouncement() {
  const pick = (status: ProductStatus) => products.find((p) => p.status === status);
  const featured = pick('Live') ?? pick('Beta') ?? pick('In development');
  if (!featured) return 'A software products company from India';
  if (featured.status === 'Live') return `${featured.name} is now live`;
  if (featured.status === 'Beta') return `${featured.name} is now in beta`;
  return `Now building ${featured.name}`;
}
