<template>
  <div class="home w-full h-full relative mx-auto" style="width: 100%;">
    <div class="mainCompanyName">
      <h1>{{ branch.name }}</h1>
    </div>

    <div class="mx-5 my-8">
      <div class="flex justify-space-between">
        <h2 class="secondary-title mb-4">{{ doctorName }}</h2>
      </div>

      <div class="imgContainer my-4">
        <img
            :src="`${doctorImg}`"
            :alt="doctorName">
      </div>

      <div class="imgCaption mb-5">{{ doctorSpeciality }}</div>

      <div class="flex justify-space-around my-4">
        <div class="iconContainer">
          <div class="icons"><img :src="userRateIcon" alt="userRateIcon" /></div>
          <span class="iconTitle text-center">
            {{ doctorFeedbackCount }}
            отзывы
          </span>
        </div>
        <div class="iconContainer">
          <div class="icons"><img :src="rateIcon" alt="rateIcon" /></div>
          <span class="iconTitle text-center">
            {{ doctorRating }}
            рейтинг
          </span>
        </div>
        <div class="iconContainer">
          <div class="icons"><img :src="workExpIcon" alt="workExpIcon" /></div>
          <span class="iconTitle text-center">
            {{ doctorExperience }} лет
            стаж
          </span>
        </div>
      </div>

      <div class="flex justify-center">
        <v-btn class="buttonSend" :href="`/${organization.id}/${branch.id}/doctor/${doctorId}/rate`">
          Оставить отзыв
        </v-btn>
      </div>

    </div>

    <WorkHours :work-hours="doctorWorkHours" />

    <div v-html="doctorDescription" class="mx-5 my-8" />
  </div>
</template>

<script lang="ts">
import {mapState} from "vuex";
import WorkHours from '@/components/basic/WorkHours.vue';

export default {
  name: "DoctorPage",
  components: {WorkHours},
  data() {
    return {
      buttonColor: '#3675EE',
      userRateIcon: require('@/assets/images/userRatesIcon.svg'),
      rateIcon: require('@/assets/images/rateIcon.svg'),
      workExpIcon: require('@/assets/images/workExpIcon.svg'),
      doctorId: undefined,

      doctorName: undefined,
      doctorImg: undefined,
      doctorSpeciality: undefined,
      doctorFeedbackCount: 0,
      doctorRating: 5,
      doctorExperience: 0,
      doctorWorkHours: undefined,
      doctorDescription: undefined,
    }
  },
  mounted() {
    this.doctorId = this.$route.params.doctorId
  },
  computed: {
    ...mapState(['organization', 'branch', 'doctors']),
    mainBackUrl() {
      return process.env.VUE_APP_IMG_URL
    },
    doctor() {
      return this.doctors.filter(doc => doc.id == this.doctorId)[0]
    },
  },
  watch: {
    doctor() {
      this.doctorName = this.doctor.name
      this.doctorImg = this.mainBackUrl + this.doctor.img
      this.doctorSpeciality = this.doctor.speciality.title
      this.doctorFeedbackCount = this.doctor.feedBackCount
      this.doctorRating = !!this.doctor.feedbacksAvgRating ? parseFloat(this.doctor.feedbacksAvgRating).toFixed(1) : parseFloat(5).toFixed(1)
      this.doctorExperience = this.doctor.experience
      this.doctorWorkHours = this.doctor.work_hours
      this.doctorDescription = this.doctor.description
    }
  }
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
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.0075em;

  color: #000000;
}

.imgContainer {
  border-radius: 12px;
  width: 100%;
  height: auto;
  background: #F5F5F8;
  overflow: hidden;
}

.imgCaption {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #8F9BB3;
}

.iconContainer {
  width: 45px;
}

.icons {
  width: 45px;
  height: 45px;
  border-radius: 50px;
  background: #EAF1FF;
  position: relative;
}

.icons img {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.iconContainer .iconTitle {
  margin: 0;
  display: block;
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  align-items: center;
  text-align: center !important;
  letter-spacing: -0.0075em;
  color: #000000;
}

.buttonSend {
  width: 90% !important;
  height: 48px !important;

  background: #3675EE !important;
  color: #ffffff;
  border-radius: 15px;

  font-family: Roboto;
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.0075em;
  text-align: center;

}
</style>
