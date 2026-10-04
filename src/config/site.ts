/**
 * Company details used across the website, SEO tags, structured data and legal pages.
 *
 * Empty strings are hidden automatically. Fill them in (LLPIN, registered office,
 * phone, GSTIN, social links) and they appear everywhere they are relevant.
 *
 * The public domain lives in `astro.config.mjs` (`site`), so canonical URLs,
 * the sitemap and robots.txt always agree. Products live in `src/data/products.ts`.
 */

export interface Partner {
  name: string;
  role: string;
  linkedin: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  entityType: string;
  tagline: string;
  title: string;
  description: string;
  keywords: string[];
  locale: string;
  lang: string;
  themeColor: string;
  email: string;
  phone: string;
  llpin: string;
  gstin: string;
  foundingYear: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  partners: Partner[];
  grievanceOfficer: { name: string; designation: string; email: string };
  socials: { linkedin: string; x: string; github: string; instagram: string };
  /** Google Search Console HTML-tag verification token (optional). */
  googleSiteVerification: string;

  /** Optional form backend URL (e.g. Formspree, Web3Forms). When empty, the contact form opens the visitor's email app. */
  contactFormEndpoint: string;
  legalLastUpdated: string;
}

export const site: SiteConfig = {
  name: 'Rachna Labs',
  legalName: 'Rachna Softech LLP',
  entityType: 'Limited Liability Partnership',
  tagline: 'Simple, useful apps that make everyday life easier.',
  title: 'Rachna Labs | Apps & Software Products from India',
  description:
    'Rachna Labs is an Indian software company building simple, useful apps for everyday life, from to-do lists and personal finance to health and habits.',
  keywords: [
    'Rachna Labs',
    'Rachna Softech',
    'Rachna Softech LLP',
    'Indian software company',
    'software products company India',
    'to-do list app',
    'personal finance app India',
    'expense tracker app',
    'health tracker app',
    'habit tracker app',
  ],
  locale: 'en_IN',
  lang: 'en-IN',
  themeColor: '#7C3AED',

  email: 'hello@rachnalabs.com',
  phone: '',
  llpin: '',
  gstin: '',
  foundingYear: '',
  address: {
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'India',
  },

  partners: [
    { name: 'Karan Kumar', role: 'Designated Partner', linkedin: '' },
    { name: 'Dhirendra Kumar Singh', role: 'Designated Partner', linkedin: '' },
  ],

  grievanceOfficer: {
    name: 'Karan Kumar',
    designation: 'Designated Partner',
    email: 'hello@rachnalabs.com',
  },

  socials: {
    linkedin: '',
    x: '',
    github: '',
    instagram: '',
  },

  googleSiteVerification: '',

  contactFormEndpoint: '',

  legalLastUpdated: '13 September 2026',
};

const a = site.address;

export const hasAddress = Boolean(a.street || a.city);

export const fullAddress = [a.street, a.city, [a.region, a.postalCode].filter(Boolean).join(' '), a.country]
  .filter(Boolean)
  .join(', ');

export const socialLinks = (
  [
    ['LinkedIn', site.socials.linkedin],
    ['X', site.socials.x],
    ['GitHub', site.socials.github],
    ['Instagram', site.socials.instagram],
  ] as const
)
  .filter(([, href]) => href)
  .map(([label, href]) => ({ label, href }));

export const nav = [
  { label: 'Products', href: '/#products' },
  { label: 'Platform', href: '/#platform' },
  { label: 'How we build', href: '/#process' },
  { label: 'Company', href: '/#about' },
  { label: 'FAQ', href: '/#faq' },
];

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms of Use', href: '/terms/' },
  { label: 'Cookie Policy', href: '/cookie-policy/' },
  { label: 'Refund & Cancellation', href: '/refund-policy/' },
];
