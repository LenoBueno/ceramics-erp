import { RouteObject } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

// Importações das páginas
import ProducaoPage from '../app/producao/page';
import VendasPage from '../app/vendas/page';
import ProdutosPage from '../app/produtos/page';
import EstoquePage from '../app/estoque/page';
import FinanceiroPage from '../app/financeiro/page';
import ClientesPage from '../app/clientes/page';
import FornecedoresPage from '../app/fornecedores/page';
import ConfiguracoesPage from '../app/configuracoes/page';
import RelatoriosPage from '../app/relatorios/page';
import ComprasPage from '../app/compras/page';

// Definição das rotas
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/producao/*',
    element: <ProducaoPage />
  },
  {
    path: '/vendas/*',
    element: <VendasPage />
  },
  {
    path: '/produtos/*',
    element: <ProdutosPage />
  },
  {
    path: '/estoque/*',
    element: <EstoquePage />
  },
  {
    path: '/financeiro/*',
    element: <FinanceiroPage />
  },
  {
    path: '/clientes/*',
    element: <ClientesPage />
  },
  {
    path: '/fornecedores/*',
    element: <FornecedoresPage />
  },
  {
    path: '/configuracoes/*',
    element: <ConfiguracoesPage />
  },
  {
    path: '/relatorios/*',
    element: <RelatoriosPage />
  },
  {
    path: '/compras/*',
    element: <ComprasPage />
  }
];