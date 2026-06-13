import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'report', 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const origin = 'https://my-admin-app-production-edf7.up.railway.app';
const pages = [
  { path: '/login', file: 'login.png' },
  { path: '/dashboard', file: 'dashboard.png' },
  { path: '/dosen', file: 'dosen.png' },
  { path: '/matakuliah', file: 'matakuliah.png' },
  { path: '/admin', file: 'mahasiswa.png' },
  { path: '/kelas', file: 'kelas.png' },
  { path: '/users', file: 'users.png' }
];

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Set admin session on the app and reload to apply
  await page.goto(origin + '/login', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('userToken', 'mock-jwt-token-xyz123');
    localStorage.setItem('currentUser', JSON.stringify({ name: 'Administrator', email: 'admin@gmail.com', role: 'Admin', permissions: ['Read','Write','Delete','Manage Users'] }));
  });
  await page.goto(origin + '/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));

  for (const p of pages) {
    const outPath = path.join(outDir, p.file);
    try {
      if (p.path === '/login') {
        await page.goto(origin + '/login', { waitUntil: 'networkidle0' });
      } else {
        // navigate via SPA by clicking link if available
        const selector = `a[href="${p.path}"]`;
        const has = await page.$(selector);
        if (has) {
          await has.click();
        } else {
          // fallback to pushState navigation
          await page.evaluate((path) => { history.pushState({}, '', path); window.dispatchEvent(new Event('popstate')); }, p.path);
        }
        await new Promise((r) => setTimeout(r, 900));
      }
      await page.screenshot({ path: outPath, fullPage: true });
      console.log('Saved', outPath);
    } catch (err) {
      console.error('Failed', p.path, err.message);
    }
  }

  await browser.close();
})();
