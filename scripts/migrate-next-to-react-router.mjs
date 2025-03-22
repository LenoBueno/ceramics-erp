// Script para migrar importações do Next.js para React Router
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual do script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para percorrer diretórios recursivamente
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
};

// Função para atualizar as importações em um arquivo
function updateImports(filePath) {
  // Ignorar node_modules e diretórios ocultos
  if (filePath.includes('node_modules') || filePath.includes('.git')) {
    return;
  }

  // Apenas processar arquivos TypeScript/JavaScript/JSX/TSX
  if (!filePath.match(/\.(js|jsx|ts|tsx)$/)) {
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Substituir importações do Next.js Link
    if (content.includes("import Link from \"next/link\"")) {
      content = content.replace(
        "import Link from \"next/link\"", 
        "import { Link } from \"react-router-dom\""
      );
      modified = true;
    }

    // Substituir importações do Next.js useRouter
    if (content.includes("import { useRouter } from \"next/navigation\"")) {
      content = content.replace(
        "import { useRouter } from \"next/navigation\"", 
        "import { useNavigate, useParams, useLocation } from \"react-router-dom\""
      );
      modified = true;
    }

    // Substituir atributos href do Link do Next.js para to do React Router
    if (content.includes("<Link href=")) {
      content = content.replace(/<Link href=(["'])(.*?)(["'])/g, '<Link to=$1$2$3');
      modified = true;
    }

    // Substituir uso do useRouter para useNavigate
    if (content.includes("const router = useRouter()")) {
      content = content.replace(
        "const router = useRouter()", 
        "const navigate = useNavigate()\n  const params = useParams()\n  const location = useLocation()"
      );
      modified = true;
    }

    // Substituir router.push para navigate
    if (content.includes("router.push(")) {
      content = content.replace(/router\.push\(([^)]+)\)/g, 'navigate($1)');
      modified = true;
    }

    // Salvar o arquivo se foi modificado
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Atualizado: ${filePath}`);
    }
  } catch (error) {
    console.error(`Erro ao processar ${filePath}:`, error);
  }
}

// Diretório raiz do projeto
const rootDir = path.resolve(__dirname, '..');

// Iniciar a migração
console.log('Iniciando migração de Next.js para React Router...');
walkDir(rootDir, updateImports);
console.log('Migração concluída!');