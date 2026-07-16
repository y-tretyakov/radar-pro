import { Card } from '@radar-pro/ui';
import { Link } from 'react-router-dom';

/** Stub list route for `/repositories`. */
export function RepositoriesPage() {
  return (
    <div className="rp-page">
      <header className="rp-page__header">
        <h1 className="rp-page__title">Repositories</h1>
        <p className="rp-page__subtitle">List view stub — data wiring in Phase 1.</p>
      </header>
      <Card title="Repository list">
        <p>No server fetch yet. Example detail link:</p>
        <p>
          <Link className="rp-inline-link" to="/repositories/demo">
            /repositories/demo
          </Link>
        </p>
      </Card>
    </div>
  );
}
