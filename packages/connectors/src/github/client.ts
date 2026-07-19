import { Octokit } from 'octokit';
import type {
  GitHubRepoResponse,
  GitHubUserResponse,
  GitHubOrgResponse,
  GitHubIssueResponse,
  GitHubPRResponse,
  GitHubReleaseResponse,
  GitHubContributorResponse,
  GitHubSearchResponse,
  RateLimitInfo,
} from './types.js';

export interface GitHubClientConfig {
  token: string;
  baseUrl?: string;
  userAgent?: string;
}

type OwnerResult = GitHubUserResponse | GitHubOrgResponse;

export class GitHubClient {
  private octokit: Octokit;

  constructor(config: GitHubClientConfig) {
    this.octokit = new Octokit({
      auth: config.token,
      baseUrl: config.baseUrl,
      userAgent: config.userAgent,
    });
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepoResponse> {
    const response = await this.octokit.request('GET /repos/{owner}/{repo}', { owner, repo });
    return response.data as GitHubRepoResponse;
  }

  async getOwner(login: string): Promise<OwnerResult> {
    const response = await this.octokit.request('GET /users/{username}', { username: login });
    return response.data as OwnerResult;
  }

  async getRepositoryIssues(
    owner: string,
    repo: string,
    options?: { state?: 'open' | 'closed' | 'all'; perPage?: number; page?: number },
  ): Promise<GitHubIssueResponse[]> {
    const data = await this.octokit.paginate('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo,
      state: options?.state ?? 'open',
      per_page: options?.perPage ?? 100,
      page: options?.page,
    });
    return data as GitHubIssueResponse[];
  }

  async getRepositoryPullRequests(
    owner: string,
    repo: string,
    options?: { state?: 'open' | 'closed' | 'all'; perPage?: number; page?: number },
  ): Promise<GitHubPRResponse[]> {
    const data = await this.octokit.paginate('GET /repos/{owner}/{repo}/pulls', {
      owner,
      repo,
      state: options?.state ?? 'open',
      per_page: options?.perPage ?? 100,
      page: options?.page,
    });
    return data as unknown as GitHubPRResponse[];
  }

  async getRepositoryReleases(
    owner: string,
    repo: string,
    options?: { perPage?: number; page?: number },
  ): Promise<GitHubReleaseResponse[]> {
    const data = await this.octokit.paginate('GET /repos/{owner}/{repo}/releases', {
      owner,
      repo,
      per_page: options?.perPage ?? 100,
      page: options?.page,
    });
    return data as GitHubReleaseResponse[];
  }

  async getRepositoryContributors(
    owner: string,
    repo: string,
  ): Promise<GitHubContributorResponse[]> {
    const data = await this.octokit.paginate('GET /repos/{owner}/{repo}/contributors', {
      owner,
      repo,
    });
    return data as GitHubContributorResponse[];
  }

  async searchRepositories(
    query: string,
    options?: { sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated'; order?: 'asc' | 'desc'; perPage?: number; page?: number },
  ): Promise<GitHubSearchResponse> {
    const response = await this.octokit.request('GET /search/repositories', {
      q: query,
      sort: options?.sort,
      order: options?.order,
      per_page: options?.perPage ?? 30,
      page: options?.page,
    });
    return response.data as GitHubSearchResponse;
  }

  async getRateLimit(): Promise<RateLimitInfo> {
    const response = await this.octokit.request('GET /rate_limit');
    return response.data as unknown as RateLimitInfo;
  }
}
