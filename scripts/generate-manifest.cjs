/**
 * Script automático — escaneia public/docs/ e gera o manifesto.
 * A BP só precisa subir arquivos na pasta docs — este script faz o resto.
 *
 * config.json (opcional) dentro de public/docs/ pode conter:
 *   - Links externos (tipo: "link") → vão para manifest.links
 *   - Associações de arquivo a processo (tipo: "doc") → adicionam campo "processo" ao doc
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'public', 'docs');
const CONFIG = path.join(DOCS_DIR, 'config.json');
const OUTPUT = path.join(__dirname, '..', 'public', 'docs-manifest.json');

const IGNORE = ['.gitkeep', '.DS_Store', 'config.json', 'Thumbs.db'];

// Read config.json for links and processo associations
let configEntries = [];
try {
  configEntries = JSON.parse(fs.readFileSync(CONFIG, 'utf-8'));
} catch {
  configEntries = [];
}

// Separate external links from doc-processo associations
const links = configEntries
  .filter(e => e.tipo === 'link')
  .map(e => ({ nome: e.nome, url: e.arquivo, processo: e.processo || '' }));

// Build a map: filename → processo (for docs that belong to a specific process)
const processoMap = {};
configEntries
  .filter(e => e.tipo === 'doc')
  .forEach(e => { processoMap[e.arquivo] = e.processo; });

// Scan all files in docs/
const files = fs.readdirSync(DOCS_DIR).filter(f => {
  if (IGNORE.includes(f) || f.startsWith('.')) return false;
  const stat = fs.statSync(path.join(DOCS_DIR, f));
  return stat.isFile();
});

const documentos = [];
for (const file of files) {
  const nome = file.replace(/\.[^/.]+$/, '').replace(/-/g, ' ').replace(/_/g, ' ');
  const entry = {
    nome: nome,
    arquivo: `docs/${file}`,
  };
  // If config.json maps this file to a processo, add that field
  if (processoMap[file]) {
    entry.processo = processoMap[file];
  }
  documentos.push(entry);
}

const manifest = { documentos, links };

fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2));
console.log(`✅ Manifesto gerado: ${documentos.length} documento(s), ${links.length} link(s)`);
