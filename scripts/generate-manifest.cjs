/**
 * Script que roda automaticamente antes do build.
 * Escaneia as pastas dentro de public/docs/ e gera um manifesto
 * para o site saber quais documentos existem em cada processo.
 *
 * A BP só precisa subir arquivos nas pastas — este script faz o resto.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'public', 'docs');
const OUTPUT = path.join(__dirname, '..', 'public', 'docs-manifest.json');

// Mapeamento: nome da pasta → título do processo no site
const FOLDER_MAP = {
  'Solicitacao-de-Vaga': 'Solicitação de Vaga',
  'Ferias': 'Férias',
  'Promocao': 'Promoção',
  'Desligamento': 'Desligamento',
  'Efetivacao': 'Efetivação',
  'Transferencia': 'Transferência',
  'Admissao': 'Admissão',
  'Alteracao-Contratual': 'Alteração Contratual',
};

// Arquivos a ignorar
const IGNORE = ['.gitkeep', '.DS_Store', 'config.json', 'Thumbs.db'];

const manifest = { documentos: [], links: [] };

// Escanear pastas de documentos
for (const [folder, processo] of Object.entries(FOLDER_MAP)) {
  const folderPath = path.join(DOCS_DIR, folder);
  if (!fs.existsSync(folderPath)) continue;

  const files = fs.readdirSync(folderPath).filter(f => !IGNORE.includes(f) && !f.startsWith('.'));

  for (const file of files) {
    manifest.documentos.push({
      nome: file.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
      arquivo: `docs/${folder}/${file}`,
      processo: processo,
    });
  }
}

// Ler links externos do config.json (Pandapé, etc.)
const configPath = path.join(DOCS_DIR, 'config.json');
if (fs.existsSync(configPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const links = config.filter(item => item.tipo === 'link');
    manifest.links = links.map(l => ({
      nome: l.nome,
      url: l.arquivo,
      processo: l.processo,
    }));
  } catch (e) {
    console.warn('Aviso: config.json com erro, links externos ignorados.');
  }
}

fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2));
console.log(`✅ Manifesto gerado: ${manifest.documentos.length} documento(s), ${manifest.links.length} link(s)`);
