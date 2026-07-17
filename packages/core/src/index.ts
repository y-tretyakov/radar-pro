export const CORE_PACKAGE_VERSION = '0.2.0' as const;

export function getPackageName(): string {
  return '@radar-pro/core';
}

export type EntityId = string & { readonly __brand?: 'EntityId' };

export interface PlaceholderEntity {
  id: EntityId;
  name: string;
}

export type {
  NormalizedRepository,
  NormalizedOwner,
  NormalizedIssue,
  NormalizedPullRequest,
  NormalizedRelease,
  NormalizedContributor,
  GitHubRepoResponse,
  GitHubUserResponse,
  GitHubOrgResponse,
  GitHubIssueResponse,
  GitHubPRResponse,
  GitHubReleaseResponse,
  GitHubContributorResponse,
  GitHubSearchResponse,
  RateLimitInfo,
} from './github.js';
