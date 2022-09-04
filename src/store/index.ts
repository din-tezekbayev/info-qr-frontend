import ApiService from '@/services/api.service';
import pusher from '@/services/pusher.service';
import tc from '@replygirl/tc';
import {constantCase} from 'change-case';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import equal from 'fast-deep-equal';
import Vue from 'vue';
import Vuex, {Store} from 'vuex';

import type {AuthState} from './modules/auth';
import auth from './modules/auth';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {StorageService} from '@/services/storage.service';

dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Almaty');

Vue.use(Vuex)

declare interface ApiError {
  name: string
  message: string
  errorCode: number | null
}

class ApiError extends Error {
  constructor(errorCode: number | null, message: string) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

const throwApiError = (e: any) => {
  console.error(e)
  throw new ApiError(
    e?.response?.status ?? null,
    e?.response?.data?.message
  )
}

export interface State {
  apiError: string;
  apiErrorCode: number;
  organization: any;
  branch: any;
  sales: any[];
  services: any[];
  serviceTypes: any[];
  doctors: any[];
  departments: any[];
  surveys: any[];
  currentSurvey: any;
}

export interface RootState extends State {
  auth: AuthState
}

const initState = (x: State) => x as RootState

export default new Store<RootState>({
  state: initState({
    apiError: '',
    apiErrorCode: 0,
    organization: {},
    branch: {},
    sales: [],
    services: [],
    serviceTypes: [],
    doctors: [],
    departments: [],
    surveys: [],
    currentSurvey: {},
  }),
  getters: {
  },
  mutations: {
    apiError(
      state,
      { errorCode, errorMessage }: { errorCode: number, errorMessage: string }
    ) {
      state.auth.authenticating = false
      state.apiErrorCode = errorCode
      state.apiError = errorMessage
    },
    setOrganization( state, { organization }: { organization: any[] }) {
      state.organization = organization;
    },
    setBranch( state, { branch }: { branch: any[] }) {
      state.branch = branch;
    },
    setSales( state, { sales }: { sales: any[] }) {
      state.sales = sales;
    },
    setServices( state, { services }: { services: any[] }) {
      state.services = services;
    },
    setServiceTypes( state, { serviceTypes }: { serviceTypes: any[] }) {
      state.serviceTypes = serviceTypes;
    },
    setDoctors( state, { doctors }: { doctors: any[] }) {
      state.doctors = doctors;
    },
    setSurveys( state, { surveys }: { surveys: any[] }) {
      state.surveys = surveys;
    },
    setCurrentSurvey( state, { survey }: { survey: any }) {
      state.currentSurvey = survey;
    },
    updateDoctorInfo( state, { doctor }: { doctor: any }) {
      const otherDocs = state.doctors.filter((doc) => doc.id !== doctor.id);
      console.log('updateDoctorInfo -> ', 'otherDocs ', otherDocs);
      state.doctors = [
        ...otherDocs,
        doctor,
      ];
    },
    setDepartments( state, { departments }: { departments: any[] }) {
      state.departments = departments;
    },
  },
  actions: {
    async GET_ORGANIZATION_INFO({ commit, dispatch }, payload) {
      try {
        const {organizationId, branchId} = payload;
        const { data: { organization, branch, sales, serviceTypes, services, doctors, departments, surveys } } = await ApiService.customRequest({
          method: 'get',
          url: `home/organizationInfo/${organizationId}/${branchId}`,
        });
        commit('setOrganization', { organization });
        commit('setBranch', { branch });
        commit('setSales', { sales });
        commit('setServiceTypes', { serviceTypes });
        commit('setServices', { services });
        commit('setDepartments', { departments });
        commit('setDoctors', { doctors });
        commit('setSurveys', { surveys });
        return true;
      } catch (err) {
        throwApiError(err);
        return false;
      }
    },
    async ADD_FEEDBACK_TO_DOCTOR({ commit, dispatch }, payload) {
      try {
        const { data, doctorId } = payload;

        const { data: { message, doctor } } = await ApiService.customRequest({
          method: 'post',
          url: `home/doctor/newFeedback/${doctorId}`,
          data,
        });
        commit('updateDoctorInfo', { doctor });
        return true
      } catch (err) {
        throwApiError(err);
        return false;
      }
    },
    async ADD_FEEDBACK_TO_BRANCH({ commit, dispatch }, payload) {
      try {
        const { data, organizationId, branchId } = payload;

        const { data: { message } } = await ApiService.customRequest({
          method: 'post',
          url: `home/organization/feedback/${organizationId}/${branchId}`,
          data,
        });
        return true
      } catch (err) {
        throwApiError(err);
        return false;
      }
    },
    async GET_ORGANIZATION_SURVEY({ commit, dispatch }, payload) {
      try {
        const { organizationId, surveyId } = payload;

        const { data: { survey } } = await ApiService.customRequest({
          method: 'get',
          url: `home/organization/survey/${organizationId}/${surveyId}`,
        });
        commit('setCurrentSurvey', { survey });
        return true
      } catch (err) {
        throwApiError(err);
        return false;
      }
    },
  },
  modules: { auth },
});
