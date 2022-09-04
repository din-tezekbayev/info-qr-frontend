<template>
  <div class="mx-5 my-12">
    <div class="flex justify-space-between">
      <h2 class="secondary-title mb-4">{{ $t('home.surveysTitle') }}</h2>
    </div>

    <div class="my-4">
      <SurveyCard
          v-for="(survey,i) in surveysValue"
          :id="survey.id" :title="survey.title" :is-home-page="true" />
    </div>

  </div>
</template>

<script lang="ts">
import SurveyCard from "@/components/cards/SurveyCard.vue"
import {mapState} from 'vuex';

export default {
  name: "Surveys",
  components: { SurveyCard, },
  props: {},
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['surveys']),
    surveysValue() {
      return this.surveys
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
</style>
