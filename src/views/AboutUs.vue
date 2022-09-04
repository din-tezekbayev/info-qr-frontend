<template>
  <div class="home w-full h-full relative mx-auto" style="width: 100%;">
    <div class="mainCompanyName">
      <h1>{{ branch.name }}</h1>
    </div>

    <div class="mx-5 my-8" v-html="organization.about_us" />
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AboutUs",
  data() {
    return {
      html: undefined,
    }
  },
  computed: {
    ...mapState(['organization', 'branch']),
  },
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
</style>
