import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import AssetsPage from '@/pages/Assets';
import DashboardPage from '@/pages/Dashboard';
import GeneratePage from '@/pages/Generate';
import QueuePage from '@/pages/Queue';
import ResearchPage from '@/pages/Research';
import SettingsPage from '@/pages/Settings';

export default function App(): JSX.Element {
  return (
    <div className="flex h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Sidebar />
      <main className="flex-1">
        <TopBar />
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/settings" replace />} />
        </Routes>
      </main>
    </div>
  );
}
