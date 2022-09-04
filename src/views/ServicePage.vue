<template>
  <div class="home w-full h-full relative mx-auto" style="width: 100%;">
    <div class="mainCompanyName">
      <h1>{{ branch.name }}</h1>
    </div>

    <div class="mx-5 my-8">
      <div class="flex justify-space-between">
        <h2 v-if="!!service" class="secondary-title mb-4">{{ service.title }}</h2>
      </div>

      <div class="priceCaption mb-5">{{ parseFloat(service.price).toLocaleString("kz-KZ") }} ₸</div>

      <div v-html="service.description" class="serviceDescription my-10" />

    </div>
  </div>
</template>

<script lang="ts">
import {mapState} from "vuex";

export default {
  name: "ServicePage",
  data() {
    return {
      buttonColor: '#3675EE',
      serviceId: undefined,
    }
  },
  mounted() {
    this.serviceId = this.$route.params.serviceId
  },
  computed: {
    ...mapState(['organization', 'branch', 'services']),
    service() {
      return this.services.filter(service => service.id == this.serviceId)[0]
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

.priceCaption {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 16px;
  color: #8F9BB3;
}

.serviceDescription {



}
</style>
