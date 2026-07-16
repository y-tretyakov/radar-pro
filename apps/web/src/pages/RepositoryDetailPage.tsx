import { Card } from '@radar-pro/ui';
import { Link, useParams } from 'react-router-dom';

/** Stub detail route for `/repositories/:id`. */
export function RepositoryDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="rp-page">
      <header className="rp-page__header">
        <h1 className="rp-page__title">Repository</h1>
        <p className="rp-page__subtitle">
          Detail stub for <code>{id ?? 'unknown'}</code>
        </p>
      </header>
      <Card title="Details">
        <p>Metrics, signals, and ranking will land in later phases.</p>
        <p>
          <Link className="rp-inline-link" to="/repositories">
            ← Back to repositories
          </Link>
        </p>
      </Card>
    </div>
  );
}
