import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { ThemeProvider } from '../context/ThemeContext'
import AppShell from '../components/layout/AppShell'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../pages/Login/LoginPage'
import DashboardPage from '../pages/Dashboard/DashboardPage'
import EntradasPage from '../pages/Entradas/EntradasPage'
import SaidasPage from '../pages/Saidas/SaidasPage'
import PatrimonioPage from '../pages/Patrimonio/PatrimonioPage'
import OrcamentoPage from '../pages/Orcamento/OrcamentoPage'
import ModelosPage from '../pages/Modelos/ModelosPage'
import NotFoundPage from '../pages/NotFound/NotFoundPage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppShell />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/entradas" element={<EntradasPage />} />
                <Route path="/saidas" element={<SaidasPage />} />
                <Route path="/patrimonio" element={<PatrimonioPage />} />
                <Route path="/orcamento" element={<OrcamentoPage />} />
                <Route path="/modelos" element={<ModelosPage />} />
              </Route>
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
