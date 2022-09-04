<template>
  <div class="mx-5 my-12">
    <div class="flex justify-space-between">
      <h2 class="secondary-title mb-4">{{ $t('home.servicesTitle') }}</h2>
      <div
          v-if="isHomePage"
          class="showMoreButton"
      >
        <router-link :to="`/${organization.id}/${branch.id}/services/0`" class="menuLink">{{ $t('home.more') }}</router-link>
      </div>
    </div>

    <div class="my-4">
      <ServiceCard
          v-for="(serviceType, i) in serviceTypes"
          :key="`serviceType-${i}`"
          :id="serviceType.id"
          :title="serviceType.title"
          :is-home-page="isHomePage"
          :is-new="serviceType.isNew" />
    </div>

  </div>
</template>

<script lang="ts">
import ServiceCard from "@/components/cards/ServiceCard.vue"
import {mapState} from 'vuex';

export default {
  name: "Services",
  components: { ServiceCard, },
  props: {
    isHomePage: {type: Boolean, default: false}
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['organization', 'branch', 'serviceTypes'])
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

.showMoreButton {
  color: #3675EE;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: -0.0075em;
}
</style>
