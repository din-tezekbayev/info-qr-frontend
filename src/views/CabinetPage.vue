<template>
  <div class="home w-full h-full relative mx-auto" style="width: 100%;">
    <div class="mainCompanyName">
      <h1>{{ branch.name }}</h1>
    </div>

    <div class="mx-5 my-12">
      <div class="flex justify-space-between">
        <h2 class="secondary-title mb-4">Кабинет №{{ cabinetNumber }}</h2>
      </div>

      <div class="my-4">
        <DoctorCard
            v-for="(doc, i) in doctorsOfThisCabinet"
            :doctor-main="doc.speciality.title"
            :doctor-name="doc.name"
            :doctor-img="`${mainBackUrl}${doc.img}`"
            :id="doc.id"/>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import DoctorCard from "@/components/cards/DoctorCard.vue"
import {mapState} from 'vuex';

export default {
  name: "CabinetPage",
  components: { DoctorCard, },
  data() {
    return {
      filter: undefined,
      arrowColor: '#3675EE',
      cabinetNumber: undefined,
    }
  },
  computed: {
    ...mapState(['organization', 'branch', 'doctors', 'departments']),
    mainBackUrl() {
      return process.env.VUE_APP_IMG_URL
    },
    doctorsOfThisCabinet() {
      const docs = this.doctors

      return this.filter !== 0 ? docs.filter(doc => doc.cabinet_id == this.cabinetNumber) : docs
    }
  },
  mounted() {
    this.cabinetNumber = this.$route.params.cabinetId
  },
  watch: {},
  action: {},
}
</script>

<style scoped>
.home {
  overflow-y: scroll;
}

.mainCompanyName {
  margin: 30px 18px 10px;
}

.mainCompanyName h1 {
  font-family: Nunito;
  font-size: 28px;
  line-height: 38px;
  font-weight: 700;
  color: #121420;
}

.secondary-title {
  font-family: 'Nunito';
  font-size: 22px;
  line-height: 30px;
  font-weight: 700;
  color: #121420;
}
</style>
