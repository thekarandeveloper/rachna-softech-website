// Generates the favicon set, PWA icons and the Open Graph image from SVG sources.
// Usage: npm run icons   (optionally SITE_URL=https://yourdomain.com npm run icons)
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const out = (file) => fileURLToPath(new URL(`../public/${file}`, import.meta.url));
const domain = (process.env.SITE_URL ?? 'https://www.rachnalabs.com').replace(/^https?:\/\//, '').replace(/\/$/, '');

const R_PATH = 'M11 23.5V8.5h6a4.5 4.5 0 0 1 0 9h-6m5.2 0 5.3 6';

/** The Rachna Labs mark: an "R" monogram with a spark, on a violet tile. */
function mark({ size, rounded = true, scale = 1 }) {
  const dims = size ? `width="${size}" height="${size}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" ${dims} viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A78BFA"/><stop offset="1" stop-color="#7C3AED"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="${rounded ? 9 : 0}" fill="url(#g)"/>
  <g transform="translate(16 16) scale(${scale}) translate(-16 -16)">
    <path d="${R_PATH}" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="23.5" cy="8.5" r="2" fill="#EDE9FE"/>
  </g>
</svg>`;
}

const png = (svg) => sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

/** Packs PNG buffers into a multi-size .ico file. */
function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + 16 * images.length;
  images.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...images.map((img) => img.buf)]);
}

const font = `font-family="'Plus Jakarta Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"`;

// App tiles (tasks, money, health, notes, habits) in each app's accent colour, plus a "more coming" tile.
const habitDots = [0, 1, 2]
  .flatMap((row) => [0, 1, 2].map((col) => `<circle cx="${30 + col * 14}" cy="${30 + row * 14}" r="5" fill="#fff" fill-opacity="${(row + col) % 3 === 2 ? 0.4 : 1}"/>`))
  .join('');
const glyphs = [
  '<rect x="22" y="24" width="14" height="14" rx="4" fill="#fff"/><path d="M42 31h24" stroke="#fff" stroke-width="5" stroke-linecap="round"/><rect x="23" y="49" width="12" height="12" rx="4" stroke="#fff" stroke-width="3.5" fill="none"/><path d="M42 55h18" stroke="#fff" stroke-width="5" stroke-linecap="round"/>',
  '<rect x="20" y="30" width="48" height="32" rx="8" stroke="#fff" stroke-width="5" fill="none"/><path d="M27 30l23-9 5 9" stroke="#fff" stroke-width="5" stroke-linejoin="round" fill="none"/><circle cx="57" cy="46" r="4" fill="#fff"/>',
  '<path d="M18 46h13l6-13 9 26 6-13h18" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  '<rect x="28" y="22" width="32" height="44" rx="5" stroke="#fff" stroke-width="5" fill="none"/><path d="M36 36h16M36 48h10" stroke="#fff" stroke-width="5" stroke-linecap="round"/>',
  habitDots,
  '<path d="M44 30v28M30 44h28" stroke="#fff" stroke-width="6" stroke-linecap="round"/>',
];
const tileColors = ['#7C3AED', '#059669', '#E11D48', '#0284C7', '#F59E0B', '#1B1A22'];
const productTiles = glyphs
  .map((glyph, i) => {
    const x = (i % 3) * 110;
    const y = Math.floor(i / 3) * 110;
    return `<g transform="translate(${x} ${y})"><rect width="88" height="88" rx="22" fill="${tileColors[i]}"/>${glyph}</g>`;
  })
  .join('');

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#1B1A22" fill-opacity="0.08"/>
    </pattern>
    <radialGradient id="glow" cx="0.82" cy="0.18" r="0.6">
      <stop offset="0" stop-color="#A78BFA" stop-opacity="0.20"/>
      <stop offset="1" stop-color="#A78BFA" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="#A78BFA"/><stop offset="1" stop-color="#7C3AED"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#FBFAFF"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g transform="translate(80 70)">${mark({ size: 60 }).replace('<svg', '<svg x="0" y="0"')}</g>
  <text x="156" y="111" ${font} font-size="30" font-weight="700" fill="#1B1A22">Rachna <tspan fill="#A1A1AA" font-weight="500">Labs</tspan></text>

  <text x="80" y="290" ${font} font-size="62" font-weight="800" letter-spacing="-1.5" fill="#1B1A22">We build tools that</text>
  <text x="80" y="366" ${font} font-size="62" font-weight="800" letter-spacing="-1.5" fill="#7C3AED">make life simpler.</text>
  <text x="80" y="430" ${font} font-size="25" fill="#71717A">Apps for tasks, money, health &amp; more · Made in India</text>

  <rect x="80" y="500" width="${domain.length * 13 + 70}" height="54" rx="27" fill="#FFFFFF" stroke="#E7E5EC" stroke-width="2"/>
  <circle cx="110" cy="527" r="7" fill="#10B981"/>
  <text x="128" y="535" ${font} font-size="22" font-weight="600" fill="#3F3F46">${domain}</text>

  <g transform="translate(820 190)">
    <rect x="-24" y="-24" width="356" height="246" rx="28" fill="#FFFFFF" stroke="#E7E5EC" stroke-width="2"/>
    ${productTiles}
  </g>
</svg>`;

const [ico16, ico32, ico48] = await Promise.all([16, 32, 48].map((size) => png(mark({ size }))));

await Promise.all([
  writeFile(out('favicon.svg'), mark({})),
  writeFile(out('favicon.ico'), toIco([{ size: 16, buf: ico16 }, { size: 32, buf: ico32 }, { size: 48, buf: ico48 }])),
  png(mark({ size: 180, rounded: false, scale: 0.82 })).then((b) => writeFile(out('apple-touch-icon.png'), b)),
  png(mark({ size: 192 })).then((b) => writeFile(out('icon-192.png'), b)),
  png(mark({ size: 512 })).then((b) => writeFile(out('icon-512.png'), b)),
  png(mark({ size: 512, rounded: false, scale: 0.7 })).then((b) => writeFile(out('icon-maskable-512.png'), b)),
  png(ogSvg).then((b) => writeFile(out('og-image.png'), b)),
]);

console.log('Generated favicon.svg, favicon.ico, apple-touch-icon.png, icon-192/512.png, icon-maskable-512.png, og-image.png');
