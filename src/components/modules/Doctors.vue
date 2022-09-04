<template>
  <div class="mx-5 my-12">
    <div class="flex justify-space-between">
      <h2 class="secondary-title mb-4">{{ $t('home.doctorsTitle') }}</h2>
      <div
          v-if="isHomePage"
          class="showMoreButton"
      >

        <router-link :to="`/${organization.id}/${branch.id}/doctors/0`" class="menuLink">
          {{ $t('home.more') }}
        </router-link>
      </div>
    </div>

    <div class="my-4">
      <DoctorCard
          v-for="(doc, i) in doctorsToView"
          :doctor-main="doc.speciality.title"
          :doctor-name="doc.name"
          :doctor-img="`${mainBackUrl}${doc.img}`"
          :id="doc.id"/>
    </div>

  </div>
</template>

<script lang="ts">
import DoctorCard from "@/components/cards/DoctorCard.vue"
import {mapState} from 'vuex';

export default {
  name: "Doctors",
  components: { DoctorCard, },
  props: {
    isHomePage: {type: Boolean, default: false}
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['organization', 'branch', 'doctors']),

    mainBackUrl() {
      return process.env.VUE_APP_IMG_URL
    },
    doctorsToView() {
      // return first 5 elems for home page
      return this.doctors.slice(0, 5)
    }
  },
  watch: {},
  action: {},
}
</script>

<style scoped>
.secondary-title {
  font-family: 'Nunito';
  font-size: 22px;
  line-height: 30px;
  font-weight: 700;
  color: #121420;
}

.showMoreButton {
  font-family: 'Nunito';
  color: #3675EE;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: -0.0075em;

}
</style>
