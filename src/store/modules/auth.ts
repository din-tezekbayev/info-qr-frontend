import { Module } from 'vuex'

import router from '../../router'
import ApiService from '../../services/api.service'
import { AuthenticationError, UserService } from '../../services/auth.service'
import { StorageService } from '../../services/storage.service'

import type { AxiosResponse } from 'axios'

import type { RootState } from '..'
import dayjs from 'dayjs';

export interface AuthState {
  authenticating: boolean
  accessToken: string
  authenticationErrorCode: number
  authenticationError: string
  office: string
  user: any | null,
  dashboard: any | null;
  userPermissions: string[] | null;
}

export const auth: Module<AuthState, RootState> = {
  namespaced: false,
  state: {
    authenticating: false,
    accessToken: StorageService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    office: '',
    user: null,
    dashboard: null,
    userPermissions: [],
  },
  getters: {
    loggedIn: ({ accessToken, office }) => accessToken && office,
    userPermissions: ({ userPermissions }) => userPermissions,
    userRole: ({ user }) => user?.role,
  },
  mutations: {
    authRequest(state) {
      state.authenticating = true
      state.authenticationError = ''
      state.authenticationErrorCode = 0
    },
    authSuccess(state, { token, user, permissions }: { token: string, user: any, permissions: any[] }) {
      state.accessToken = token
      state.user = user
      state.authenticating = false
    },
    setPermissions(state, { permissions }: { permissions: any[] }) {
      const permissionObj = [];

      if (permissions.length > 0) {
        permissions.map( (perm) => permissionObj.push(perm.name));
      }

      state.userPermissions = permissionObj;
    },
    removePermissions(state) {
      state.userPermissions = [];
    },
    authError(state, { errorCode, errorMessage }) {
      state.authenticationErrorCode = errorCode
      state.authenticationError = errorMessage
      state.authenticating = false
    },
    logoutSuccess(state) {
      state.accessToken = ''
      state.user = Object.assign({}, { uuid: null })
      state.office = ''
    },
    setOffice(state, { data }) {
      state.office = data
      StorageService.saveOfficeId(data)
    },
    setUser(state, { data }) { state.user = data; },
  },
  actions: {
    async authenticate(
      { commit, dispatch },
      { email, password }: { email: string, password: string }
    ) {
      commit('authRequest')
      try {
        const { token, user, permissions } = await UserService.login(email, password);
        commit('authSuccess', { token, user });
        commit('setPermissions', { permissions });
        return true
      } catch (e) {
        dispatch('onError', e)
        console.log('HERE R PROBLEM', e)
        return false
      }
    },
    async authLogout({ commit }) {
      await UserService.logout()
      commit('logoutSuccess')
      commit('removePermissions')
      router.push('/login')
    },
    async LOAD_DASHBOARD(
      { state: { office, user }, commit, dispatch },
      payload?
    ) {
      try {
        const uuid = payload?.uuid ?? office
        const { data } = await ApiService.customRequest({
          method: 'get',
          url: `dashboard/${uuid}`,
          params: { user: user.uuid }
        })
        commit('setDashboard', { data })
        return true
      } catch (e) {
        dispatch('onError', e)
        return false
      }
    },
    async LOAD_USER({ commit, dispatch }, { userId }) {
      try {
        const { data: { user: data, permissions } } =
          await ApiService.get<{ user: any, permissions: any }>(`users/${userId}`);
        commit('setUser', { data });
        commit('setPermissions', { permissions });
        return true;
      } catch (e) {
        dispatch('onError', e);
        return false;
      }
    },
    ableUserTo({getters}, action: string) {
      return getters.userRole === 'Administrator' ? true : getters.userPermissions.includes(action);
    },
    onError({ commit }, e: unknown) {
      if (e instanceof AuthenticationError) {
        const { errorCode, message: errorMessage } = e
        commit('authError', { errorCode, errorMessage })
      }
    }
  },
}

export default auth
