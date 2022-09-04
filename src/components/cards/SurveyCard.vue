<template>
  <router-link :to="`/${organization.id}/${branch.id}/survey/${id}`" >
    <div class="card hover:bg-blue-200 my-3 px-5 py-6 flex justify-space-between">
      <div class="surveyTitle">{{ title }}</div>
      <div class="flex justify-end space-x-4">
        <v-icon :color="arrowColor">mdi-chevron-right</v-icon>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">

import {mapState} from "vuex";

export default {
  name: "SurveyCard",
  props: {
    title: {type: String, required: true},
    id: {type: Number, required: true},
    isHomePage: {type: Boolean, default: false},
  },
  data() {
    return {
      arrowColor: '#3675EE',
    }
  },
  computed: {
    ...mapState(['organization', 'branch']),
  },
}
</script>

<style scoped>
.card {
  background: #FFFFFF;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
}

.surveyTitle {
  font-family: 'Nunito';
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #222B45;

}
</style>
