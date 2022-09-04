<template>
  <div class="home w-full h-full relative mx-auto" style="width: 100%;">
    <div class="mainCompanyName">
      <h1>{{ branch.name }}</h1>
    </div>

    <div class="mx-5 my-8">
      <div class="flex justify-space-between">
        <h2 class="secondary-title mb-4">Адрес</h2>
      </div>

      <p>
        {{ branch.address }}
      </p>

    </div>

    <WorkHours :work-hours="branch.workHours"  />

    <div class="mx-5 my-8">
      <div class="flex justify-space-between">
        <h2 class="secondary-title mb-4">Телефоны</h2>
      </div>

      <v-btn
          v-for="(phone,i) in phones"
          :key="`phones-${i}`"
          :href="`tel:${phone}`"
          block
          class="phoneButton bg-white flex justify-center py-3 my-3"
      >
        <v-icon :color="iconColor">mdi-phone</v-icon>
        <span class="mx-3" >{{ phone }}</span>
      </v-btn>

    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";
import WorkHours from "@/components/basic/WorkHours"

export default {
  name: "ContactUs",
  components: { WorkHours },
  data() {
    return {
      iconColor: '#3675EE',
    }
  },
  computed: {
    ...mapState(['organization', 'branch']),
    phones() {
      return JSON.parse(this.branch.phones)
    },
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

.secondary-title {
  font-family: 'Nunito';
  font-size: 22px;
  line-height: 30px;
  font-weight: 700;
  color: #121420;
}

.phoneButton {
  max-height: 500px !important;
  height: 70px !important;

  background: #FFFFFF;
  border-radius: 12px;

  font-family: 'Nunito';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #3675EE;
}
</style>
