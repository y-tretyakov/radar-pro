import { AppShell, Button } from '@radar-pro/ui';
import { NavLink, Outlet } from 'react-router-dom';
import { usePreferencesStore } from '../stores/preferencesStore.js';
import { useUiStore } from '../stores/uiStore.js';

const navClass = ({ isActive }: { isActive: boolean }) =>
  ['rp-nav-link', isActive ? 'rp-nav-link--active' : ''].filter(Boolean).join(' ');

export function RootLayout() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const theme = useUiStore((s) => s.theme);
  const cycleTheme = useUiStore((s) => s.cycleTheme);
  const density = usePreferencesStore((s) => s.density);
  const language = usePreferencesStore((s) => s.language);

  return (
    <AppShell
      sidebarOpen={sidebarOpen}
      className={`rp-density--${density}`}
      sidebar={
        <nav className="rp-nav" aria-label="Primary">
          <p className="rp-nav__brand">Radar Pro</p>
          <NavLink to="/" end className={navClass}>
            Dashboard
          </NavLink>
          <NavLink to="/repositories" className={navClass}>
            Repositories
          </NavLink>
          <p className="rp-nav__meta">
            {language.toUpperCase()} · {density}
          </p>
        </nav>
      }
      header={
        <div className="rp-header-bar">
          <Button variant="ghost" onClick={toggleSidebar} aria-expanded={sidebarOpen}>
            {sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          </Button>
          <Button variant="secondary" onClick={cycleTheme}>
            Theme: {theme}
          </Button>
        </div>
      }
    >
      <Outlet />
    </AppShell>
  );
}
