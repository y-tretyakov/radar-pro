/**
 * @radar-pro/connectors — external data source connectors.
 * Phase 0.1: placeholder only.
 */

export const CONNECTORS_PACKAGE_VERSION = '0.1.0' as const;

export function getPackageName(): string {
  return '@radar-pro/connectors';
}

/** Future connector capability id. */
export type ConnectorId = string;

export interface ConnectorPlaceholder {
  id: ConnectorId;
  name: string;
}
