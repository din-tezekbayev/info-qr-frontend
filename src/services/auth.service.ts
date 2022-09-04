import ApiService from './api.service'
import { StorageService } from './storage.service'

declare interface AuthenticationError {
  name: string;
  message: string;
  errorCode: number | null;
}

class AuthenticationError extends Error {
  constructor(errorCode: number | null, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const UserService = {
  /**
   * Login the user and store the access token to StorageService.
   *
   * @returns access_token
   * @throws AuthenticationError
   **/
  login: async function(email: string, password: string) {
    const requestData = {
      method: 'post',
      url: '/auth/login',
      data: { email, password }
    };

    try {
      const { data } = await ApiService.customRequest(requestData);

      StorageService.saveToken(data.token);
      StorageService.saveRefreshToken(data.token);
      StorageService.saveUserId(data.user.uuid);

      ApiService.setHeaders();
      // ApiService.mount401Interceptor();
      return { token: data.token, user: data.user, permissions: data.permissions };
    } catch (error) {
      throw new AuthenticationError(
        error.response.status || null,
        error.response.data.message
      );
    }
  },

  /**
   * Refresh the access token.
   **/
  refreshToken: async function() {
    const refreshToken = StorageService.getRefreshToken();

    const requestData = {
      method: 'post',
      url: '/o/token/',
      data: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      },
      auth: {
        username: process.env.VUE_APP_CLIENT_ID,
        password: process.env.VUE_APP_CLIENT_SECRET
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);

      StorageService.saveToken(response.data.access_token);
      StorageService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeaders();

      return response.data.access_token;
    } catch (error) {
      throw new AuthenticationError(
        error.response.status,
        error.response.data.detail
      );
    }
  },

  /**
   * Logout the current user by removing the token from storage.
   *
   * Will also remove `Authorization Bearer <token>` header from future requests.
   **/
  async logout() {
    try {
      StorageService.removeToken();
      StorageService.removeUserId();
      StorageService.removeOfficeId();
      StorageService.removeRefreshToken();
      ApiService.removeHeaders();
      // ApiService.unmount401Interceptor();
    } catch (error) {
      throw new AuthenticationError(
        error.response.status,
        error.response.data.detail
      );
    }
    ApiService.setHeaders()
  }
};

export default UserService;

export { UserService, AuthenticationError };
