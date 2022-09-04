<template>
  <div class="home w-full h-full relative mx-auto" style="width: 100%;">
    <div class="mainCompanyName">
      <h1>{{ branch.name }}</h1>
    </div>

    <div class="mx-5 my-8">
      <div class="flex justify-space-between">
        <h2 class="secondary-title mb-4">{{ sale.title }}</h2>
      </div>

      <div class="imgContainer my-4">
        <img
            :src="`${mainBackUrl}${sale.img}`"
            :alt="sale.title">
      </div>

      <div class="imgCaption mb-5">{{ $dayjs(sale.date).format('DD.MM.YYYY') }}</div>

      <div v-html="sale.description" />

    </div>
  </div>
</template>

<script lang="ts">
import {mapActions, mapState} from 'vuex';

export default {
  name: "SalesPage",
  data() {
    return {
      buttonColor: '#3675EE',
      saleId: undefined,
    }
  },
  computed: {
    ...mapState(['organization', 'branch', 'sales']),
    sale() {
      return this.sales.filter(sale => sale.id == this.saleId)[0]
    },
    mainBackUrl() {
      return process.env.VUE_APP_IMG_URL
    },
  },
  created() {
    this.saleId = this.$route.params.saleId
  },
  methods: {
    ...mapActions([
      'GET_ORGANIZATION_INFO',
    ])
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

.imgContainer {
  border-radius: 12px;
  width: 100%;
  height: auto;
  background: #F5F5F8;
  overflow: hidden;
}

.imgCaption {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #8F9BB3;
}
</style>
