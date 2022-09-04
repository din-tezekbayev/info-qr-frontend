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


      <div class="flex justify-space-between">
        <h2 class="secondary-title">Оценка <span class="text-red-600">*</span></h2>
      </div>
      <div class="flex justify-center my-2">
        <v-rating
            color="primary"
            empty-icon="mdi-star"
            full-icon="mdi-star"
            half-icon="mdi-star-half-full"
            v-model="rating"
            hover
            :size="50"
            :length="5"
        ></v-rating>
      </div>

      <div class="flex justify-space-between">
        <h2 class="secondary-title mb-2">Комментарии <span class="text-red-600">*</span></h2>
      </div>

      <div>
        <v-textarea
            solo
            name="feedBackText"
            height="20vh"
            placeholder="Комментарий"
            style="border-radius: 12px; box-shadow: none;"
            v-model="comment"
        ></v-textarea>
      </div>

      <div class="flex justify-center">
        <v-btn class="buttonSend" @click="sendFeedback">
          Оставить отзыв
        </v-btn>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import {mapActions, mapState} from 'vuex';

export default {
  name: "RateDoctorPage",
  components: {},
  data() {
    return {
      buttonColor: '#3675EE',
      doctorId: undefined,
      rating: 3,
      comment: undefined,

      doctorName: undefined,
      doctorImg: undefined,
      doctorSpeciality: undefined,
      doctorFeedbackCount: 0,
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
      this.doctorFeedbackCount = this.doctor.feedbacks_count
      this.doctorExperience = this.doctor.experience
      this.doctorWorkHours = this.doctor.work_hours
      this.doctorDescription = this.doctor.description
    }
  },
  methods: {
    ...mapActions(['ADD_FEEDBACK_TO_DOCTOR']),
    async sendFeedback() {
      const payload = {
        data: {
          comment: this.comment,
          rating: this.rating,
        },
        doctorId: this.doctorId,
      }

      const addFeedback = new Promise(async (resolve, reject) => {
        const success = await this.ADD_FEEDBACK_TO_DOCTOR(payload)

        success ? resolve('Success!') : reject('Fail!')
      })

      addFeedback.then(() => {
        window.location.href = `/${this.organization.id}/${this.branch.id}/doctor/${this.doctorId}/`
      }).catch((e) => {
        alert('Ошибка, попробуйте еще, перезагрузив страницу!')
      })
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
