import { Button, Card } from '@radar-pro/ui';
import { useQueryState, parseAsString } from 'nuqs';
import { useDashboardStore } from '../stores/dashboardStore.js';
import { usePreferencesStore } from '../stores/preferencesStore.js';
import { useUiStore } from '../stores/uiStore.js';

/**
 * Phase 0.3 dashboard stub — demonstrates Zustand client state + nuqs URL state.
 * No server data / GitHub API calls.
 */
export function DashboardPage() {
  const theme = useUiStore((s) => s.theme);
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const cycleTheme = useUiStore((s) => s.cycleTheme);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  const layoutMode = useDashboardStore((s) => s.layoutMode);
  const filterDraft = useDashboardStore((s) => s.filterDraft);
  const setLayoutMode = useDashboardStore((s) => s.setLayoutMode);
  const setFilterDraft = useDashboardStore((s) => s.setFilterDraft);
  const clearFilterDraft = useDashboardStore((s) => s.clearFilterDraft);

  const density = usePreferencesStore((s) => s.density);
  const language = usePreferencesStore((s) => s.language);
  const setDensity = usePreferencesStore((s) => s.setDensity);

  // URL state demo (shareable filters later); draft stays in Zustand until applied.
  const [urlFilter, setUrlFilter] = useQueryState('q', parseAsString.withDefault(''));

  return (
    <div className="rp-page">
      <header className="rp-page__header">
        <h1 className="rp-page__title">Radar Pro</h1>
        <p className="rp-page__subtitle">
          Frontend foundations (v0.1.2) — client state via Zustand, server state via TanStack
          Query, URL state via nuqs.
        </p>
      </header>

      <section className="rp-page__toolbar" aria-label="Client controls">
        <Button onClick={cycleTheme}>Theme: {theme}</Button>
        <Button variant="secondary" onClick={toggleSidebar}>
          Sidebar: {sidebarOpen ? 'open' : 'collapsed'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => setLayoutMode(layoutMode === 'grid' ? 'list' : 'grid')}
        >
          Layout: {layoutMode}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setDensity(density === 'comfortable' ? 'compact' : 'comfortable')}
        >
          Density: {density}
        </Button>
      </section>

      <section className="rp-page__toolbar" aria-label="Filter draft">
        <label className="rp-field">
          <span>Local filter draft</span>
          <input
            className="rp-input"
            value={filterDraft}
            onChange={(e) => setFilterDraft(e.target.value)}
            placeholder="Type a draft filter…"
          />
        </label>
        <Button
          variant="secondary"
          onClick={() => {
            void setUrlFilter(filterDraft || null);
          }}
        >
          Apply to URL
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            clearFilterDraft();
            void setUrlFilter(null);
          }}
        >
          Clear
        </Button>
        <span className="rp-hint">
          URL <code>q</code>: {urlFilter || '(empty)'} · lang: {language}
        </span>
      </section>

      <div className={`rp-cards rp-cards--${layoutMode}`}>
        <Card title="Trending repositories">
          <p>Coming in Phase 1 — no GitHub API calls in this skeleton.</p>
        </Card>
        <Card title="Signals">
          <p>Placeholder — signals & insights arrive later.</p>
        </Card>
        <Card title="Client state status">
          <ul className="rp-status-list">
            <li>
              <strong>uiStore</strong>: theme={theme}, sidebar={sidebarOpen ? 'open' : 'closed'}
            </li>
            <li>
              <strong>dashboardStore</strong>: layout={layoutMode}, draft=&quot;{filterDraft}&quot;
            </li>
            <li>
              <strong>preferencesStore</strong>: density={density}, language={language}
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
