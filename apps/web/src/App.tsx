import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { RepositoriesPage } from './pages/RepositoriesPage.js';
import { RepositoryDetailPage } from './pages/RepositoryDetailPage.js';
import { AppProviders } from './providers/AppProviders.js';

export function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="repositories" element={<RepositoriesPage />} />
            <Route path="repositories/:id" element={<RepositoryDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
}
