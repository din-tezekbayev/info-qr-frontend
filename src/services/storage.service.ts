const USER_KEY = 'prestige_uuid';
const TOKEN_KEY = 'prestige_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const OFFICE_KEY = 'prestige_office';

/**
 * Manage how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instance.
 **/
const StorageService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken: string): void {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getUserId(): string | null {
    return localStorage.getItem(USER_KEY);
  },

  saveUserId(id: string): void {
    localStorage.setItem(USER_KEY, id);
  },

  removeUserId(): void {
    localStorage.removeItem(USER_KEY);
  },

  getOfficeId(): string | null {
    return localStorage.getItem(OFFICE_KEY);
  },

  saveOfficeId(id: string): void {
    localStorage.setItem(OFFICE_KEY, id);
  },

  removeOfficeId(): void {
    localStorage.removeItem(OFFICE_KEY);
  }
};

export { StorageService };
