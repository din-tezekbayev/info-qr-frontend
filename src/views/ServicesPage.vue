<template>
  <div class="home w-full h-full relative mx-auto" style="width: 100%;">
    <div class="mainCompanyName">
      <h1>{{ branch.name }}</h1>
    </div>

    <div class="mx-4 my-5">
      <div class="flex justify-space-between">
        <h2 class="secondary-title mb-4">{{ $t('home.servicesTitle') }}</h2>
      </div>

      <div class="my-4">
        <v-select
            :items="items"
            v-model="filter"
            flat
            :color="arrowColor"
            item-value="id"
            item-text="title"
            label="Фильтр"
            no-data-text="Нет параметров для фильтра"
            class="cardFilter"
            solo
        ></v-select>
      </div>

      <div class="my-4">
        <ServiceCard
            v-for="(service, i) in servicesValue"
            :key="`service-${i}`"
            :id="service.id"
            :title="service.title"
            :price="service.price"
            :is-new="service.isNew" />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import ServiceCard from '@/components/cards/ServiceCard.vue';
import {mapState} from 'vuex';

export default {
  name: "ServicesPage",
  components: { ServiceCard, },
  data() {
    return {
      filter: undefined,
      arrowColor: '#3675EE',
    }
  },
  computed: {
    ...mapState(['organization', 'branch', 'services', 'serviceTypes']),
    items() {
      return [
        {id: 0, title: this.$t('all')},
        ...this.serviceTypes
      ]
    },
    service() {

    },
    servicesValue() {
      return this.filter !== 0 ? this.services.filter(service => service.service_type_id === this.filter) : this.services
    }
  },
  mounted() {
    this.filter = parseInt(this.$route.params.filterId)
  },
  watch: {},
  action: {},
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

.cardFilter {
  border-radius: 12px;
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #222B45;
}
</style>
