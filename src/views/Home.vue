<template>
  <div class="home w-full h-full relative mx-auto" style="width: 100%;">
    <div class="mainCompanyName">
      <h1>{{ branch.name }}</h1>
    </div>
    <Sales />

    <Services :isHomePage="true" />
    <Doctors :isHomePage="true" />
    <Surveys />

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import Sales from "@/components/modules/Sales.vue"
import Services from "@/components/modules/Services.vue"
import Doctors from "@/components/modules/Doctors.vue"
import Surveys from "@/components/modules/Surveys.vue"

export default Vue.extend({
  name: 'Home',
  components: {
    Sales,
    Services,
    Doctors,
    Surveys,
  },
  data() {
    return {
      direction: 'top',
      errorState: false,
      errorStateText: 'Something went wrong. Please try again.',
      fab: false,
      filter: null,
      filtered: false,
      showAnalytics: false,
      showNotes: false,
      showProfileSettings: false,
      showSettings: false,
      successState: false,
      successStateText: '',
      viewBoard: false,
      viewAnalytics: false,
      configureBoard: false,
    }
  },
  computed: {
    ...mapState(['organization', 'branch']),
  },
  watch: {
  },
  created() {
  },
  beforeDestroy() {
  },
  methods: {

  }
})
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
</style>
