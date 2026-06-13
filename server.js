// server.js - Entry point untuk JSON Server + React build
import { createApp } from 'json-server/lib/app.js';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = join(__dirname, 'dist');
const dbFile = join(__dirname, 'db.json');

const adapter = new JSONFile(dbFile);
const db = new Low(adapter, {});
await db.read();

const server = createApp(db, { logger: false, static: [distPath] });

// CORS headers manual agar lebih eksplisit
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// SPA fallback untuk route React
server.get('*', (req, res) => {
  const indexHtml = join(distPath, 'index.html');
  if (fs.existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res.status(404).send('Not found');
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Aplikasi berjalan di port ${PORT}`);
});
