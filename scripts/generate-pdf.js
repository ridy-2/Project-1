import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportPath = process.env.REPORT_PATH || path.join(__dirname, '..', 'report', 'report.html');
const reportUrl = reportPath.startsWith('http') ? reportPath : `file://${reportPath}`;

try {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(reportUrl, { waitUntil: 'networkidle0' });
  const outPath = path.join(__dirname, '..', 'report', 'output.pdf');
  await page.pdf({ path: outPath, format: 'A4', printBackground: true });
  await browser.close();
  console.log('PDF saved to', outPath);
} catch (err) {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
}
