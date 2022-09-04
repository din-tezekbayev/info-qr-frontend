<template>
  <div class="home w-full h-full relative mx-auto" style="width: 100%;">

    <div class="mx-5 my-12">
      <div class="flex justify-space-between">
        <p class="text--secondary">Вопрос 1/5</p>
      </div>
      <div class="flex justify-space-between">
        <div class="mainCompanyName">
          <h1>{{ currentQuestion.question }}</h1>
        </div>
      </div>

      <div class="my-4">
        <SurveyCard
            v-for="(value, i) in currentQuestion.answers"
            :key="`currentQuestionAnswer-${i}`"
            :id="value.id" :title="value.title"
        />
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import {mapActions, mapState} from 'vuex';
import SurveyCard from "@/components/cards/SurveyCard.vue"

export default {
  name: "SurveyPage",
  components: { SurveyCard },
  data() {
    return {
      arrowColor: '#3675EE',
      loading: true,
      questionAnswers: [],
      currentQuestion: {},
      currentQuestionAnswers: [],
    }
  },
  computed: {
    ...mapState(['organization', 'branch', 'currentSurvey']),
  },
  async mounted() {
    const payload = {
      organizationId: this.$route.params.organizationId,
      surveyId: this.$route.params.surveyId,
    }

    const success = await this.GET_ORGANIZATION_SURVEY(payload)

    if (!success) {
      this.$eventBus.$emit('emit-error', { state: true, text: 'Какая та ошибка, обновите страницу и попробуйте еще раз!.' });
      this.$router.go(-1);
    }

  },
  methods: {
    ...mapActions(['GET_ORGANIZATION_SURVEY'])
  },
}
</script>

<style scoped>
.home {
  overflow-y: scroll;
}

.mainCompanyName {
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
