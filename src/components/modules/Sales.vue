<template>
  <div class="ml-5 my-8">
    <h2 class="secondary-title mb-4">{{ $t('home.salesTitle') }}</h2>

    <div class="slider">
      <div class="slider-container">
        <SalesCard
            v-for="(sale, i) in sales"
            :img-src="`${mainBackUrl}${sale.img}`"
            :title="sale.title"
            :id="sale.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SalesCard from "@/components/cards/SalesCard.vue"
import { mapState } from 'vuex';

export default {
  name: "Sales",
  components: { SalesCard, },
  data() {
    return {
      swiperRef: undefined,
    }
  },
  computed: {
    ...mapState(['sales']),
    mainBackUrl() {
      return process.env.VUE_APP_IMG_URL
    },
  },
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

.slider {
  overflow-x: scroll;
}

.slider::-webkit-scrollbar {
  display: none;
  width: 17px;
  background-color: transparent;
}

.slider-container {
  width: max-content;
}

</style>
