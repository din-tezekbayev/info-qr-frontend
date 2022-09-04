<template>
  <div class="home w-full h-full relative mx-auto" style="width: 100%;">
    <div class="mainCompanyName">
      <h1>{{ branch.name }}</h1>
    </div>

    <div class="mx-5 my-8">
      <div class="flex justify-space-between">
        <h2 class="secondary-title mb-4">{{ $t('feedBackPageCompany.title')}}</h2>
      </div>

      <p>{{ $t('feedBackPageCompany.description')}}</p>

      <div>
        <v-textarea
            solo
            name="feedBackText"
            v-model="comment"
            height="40vh"
            style="border-radius: 12px; box-shadow: none;"
        ></v-textarea>
      </div>

      <div class="flex justify-center">
        <v-btn class="buttonSend" @click="sendFeedback">
          {{ $t('feedBackPageCompany.send')}}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Feedback",
  data() {
    return {
      buttonColor: '#3675EE',
      comment: undefined,
    }
  },
  computed: {
    ...mapState(['organization', 'branch']),
  },
  methods: {
    ...mapActions(['ADD_FEEDBACK_TO_BRANCH']),
    async sendFeedback() {
      const payload = {
        data: {
          comment: this.comment,
        },
        organizationId: this.organization.id,
        branchId: this.branch.id,
      }

      const addFeedback = new Promise(async (resolve, reject) => {
        const success = await this.ADD_FEEDBACK_TO_BRANCH(payload)

        success ? resolve('Success!') : reject('Fail!')
      })

      addFeedback.then(() => {
        window.location.href = `/${this.organization.id}/${this.branch.id}/home/`
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
  font-size: 22px;
  line-height: 30px;
  font-weight: 700;
  color: #121420;
}

.buttonSend {
  width: 70% !important;
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
