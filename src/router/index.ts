import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import AboutUs from '@/views/AboutUs.vue';
import Feedback from '@/views/Feedback.vue';
import ContactUs from '@/views/ContactUs.vue';
import Login from '@/views/Login.vue';
import { StorageService } from '@/services/storage.service';
import SalesPage from '@/views/SalesPage.vue';
import ServicesPage from '@/views/ServicesPage.vue';
import ServicePage from '@/views/ServicePage.vue';
import DoctorsPage from '@/views/DoctorsPage.vue';
import CabinetPage from '@/views/CabinetPage.vue';
import DoctorPage from '@/views/DoctorPage.vue';
import RateDoctorPage from '@/views/RateDoctorPage.vue';
import SurveyPage from '@/views/SurveyPage.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/:organizationId/:branchId/home',
    name: 'home',
    component: Home,
    meta: {
      public: true,
    },
  },
  {
    path: '/:organizationId/:branchId/about-us',
    name: 'aboutUs',
    component: AboutUs,
    meta: {
      public: true,
    },
  },
  {
    path: '/:organizationId/:branchId/feed-back',
    name: 'feedBack',
    component: Feedback,
    meta: {
      public: true,
    },
  },
  {
    path: '/:organizationId/:branchId/contact-us',
    name: 'contactUs',
    component: ContactUs,
    meta: {
      public: true,
    },
  },
  {
    path: '/:organizationId/:branchId/sales/:saleId',
    name: 'salePage',
    component: SalesPage,
    meta: {
      public: true,
    },
  },
  {
    path: '/:organizationId/:branchId/services/:filterId',
    name: 'servicesPage',
    component: ServicesPage,
    meta: {
      public: true,
    },
  },
  {
    path: '/:organizationId/:branchId/service/:serviceId',
    name: 'servicePage',
    component: ServicePage,
    meta: {
      public: true,
    },
  },
  {
    path: '/:organizationId/:branchId/doctors/:filterId',
    name: 'doctorsPage',
    component: DoctorsPage,
    meta: {
      public: true,
    },
  },
  {
    path: '/:organizationId/:branchId/cabinet/:cabinetId',
    name: 'cabinetPage',
    component: CabinetPage,
    meta: {
      public: true,
    },
  },
  {
    path: '/:organizationId/:branchId/doctor/:doctorId',
    name: 'doctorPage',
    component: DoctorPage,
    meta: {
      public: true,
    },
  },
  {
    path: '/:organizationId/:branchId/doctor/:doctorId/rate',
    name: 'rateDoctorPage',
    component: RateDoctorPage,
    meta: {
      public: true,
    },
  },
  {
    path: '/:organizationId/:branchId/survey/:surveyId',
    name: 'surveyPage',
    component: SurveyPage,
    meta: {
      public: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // const isPublic = to.matched.some((record) => record.meta.public);
  // const onlyWhenLoggedOut = to.matched.some(
  //   (record) => record.meta.onlyWhenLoggedOut,
  // );
  // const loggedIn = !!StorageService.getToken() && !!StorageService.getOfficeId();

  // if (!isPublic && !loggedIn) {
  //   return next({
  //     path: '/login',
  //     query: { redirect: to.fullPath },
  //   });
  // }
  //
  // if (loggedIn && onlyWhenLoggedOut) {
  //   return next('/');
  // }

  next();
});

export default router;
