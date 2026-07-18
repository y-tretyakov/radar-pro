export interface GitHubRepoResponse {
  id: number;
  full_name: string;
  name: string;
  owner: {
    id: number;
    login: string;
    type: 'User' | 'Organization';
    avatar_url: string;
    html_url: string;
  };
  description: string | null;
  private: boolean;
  fork: boolean;
  default_branch: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  archived: boolean;
}

export interface GitHubUserResponse {
  id: number;
  login: string;
  type: 'User';
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubOrgResponse {
  id: number;
  login: string;
  type: 'Organization';
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubIssueResponse {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  pull_request?: { url: string };
  user: { login: string; id: number };
  labels: { name: string; color: string }[];
  body: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
}

export interface GitHubPRResponse {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  merged: boolean;
  mergeable: boolean | null;
  user: { login: string; id: number };
  body: string | null;
  additions: number;
  deletions: number;
  changed_files: number;
  created_at: string;
  updated_at: string;
  merged_at: string | null;
  closed_at: string | null;
}

export interface GitHubReleaseResponse {
  id: number;
  tag_name: string;
  name: string | null;
  prerelease: boolean;
  published_at: string;
  created_at: string;
  body: string | null;
}

export interface GitHubContributorResponse {
  login: string;
  id: number;
  contributions: number;
  type: 'User' | 'Anonymous';
}

export interface GitHubSearchResponse {
  total_count: number;
  items: GitHubRepoResponse[];
}

export interface RateLimitInfo {
  core: { limit: number; remaining: number; reset: number };
  search: { limit: number; remaining: number; reset: number };
  graphql: { limit: number; remaining: number; reset: number };
}

export interface NormalizedRepository {
  id: string;
  provider: string;
  provider_id: string;
  owner_id: string;
  full_name: string;
  name: string;
  description: string | null;
  default_branch: string | null;
  is_fork: boolean;
  is_archived: boolean;
  stars: number;
  forks: number;
  watchers: number;
  open_issues: number;
  language: string | null;
  topics: string[];
  pushed_at: number | null;
  provider_created_at: number | null;
  raw: Record<string, unknown> | null;
  dataset_id: string;
  timestamp: number;
}

export interface NormalizedOwner {
  id: string;
  provider: string;
  provider_id: string;
  login: string;
  type: 'user' | 'organization';
  avatar_url: string | null;
  html_url: string | null;
  raw: Record<string, unknown> | null;
  timestamp: number;
}

export interface NormalizedIssue {
  id: string;
  provider: string;
  provider_id: number;
  repository_id: string;
  number: number;
  title: string;
  state: 'open' | 'closed';
  is_pull_request: boolean;
  author_login: string;
  labels: string[];
  body: string | null;
  created_at: number;
  updated_at: number;
  closed_at: number | null;
  raw: Record<string, unknown> | null;
  dataset_id: string;
  timestamp: number;
}

export interface NormalizedPullRequest {
  id: string;
  provider: string;
  provider_id: number;
  repository_id: string;
  number: number;
  title: string;
  state: 'open' | 'closed';
  merged: boolean;
  author_login: string;
  body: string | null;
  additions: number;
  deletions: number;
  changed_files: number;
  created_at: number;
  updated_at: number;
  merged_at: number | null;
  closed_at: number | null;
  raw: Record<string, unknown> | null;
  dataset_id: string;
  timestamp: number;
}

export interface NormalizedRelease {
  id: string;
  provider: string;
  provider_id: number;
  repository_id: string;
  tag_name: string;
  name: string | null;
  is_prerelease: boolean;
  published_at: number;
  body: string | null;
  dataset_id: string;
  timestamp: number;
}

export interface NormalizedContributor {
  id: string;
  provider: string;
  repository_id: string;
  contributor_login: string;
  total_commits: number;
  dataset_id: string;
  timestamp: number;
}
