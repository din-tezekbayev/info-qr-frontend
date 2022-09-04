<template>
  <router-link :to="`/${organization.id}/${branch.id}/${branchToForward}/${id}`" class="menuLink">
    <div class="card hover:bg-blue-200 my-3 px-3 py-6 flex justify-space-between">
      <div class="serviceTitle">
        {{ title }}
        <div
            v-if="!!price"
            class="servicePrice"
        >{{ parseFloat(price).toLocaleString("kz-KZ") }} ₸</div>
      </div>
      <div class="flex justify-end space-x-4">
        <span v-if="isNew === 1" class="newTag">new</span>
        <v-icon :color="arrowColor">mdi-chevron-right</v-icon>
      </div>
    </div>
  </router-link>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "ServiceCard",
  props: {
    title: {type: String, required: true},
    isHomePage: {type: Boolean, default: false},
    price: {type: String, required: false},
    isNew: {type: Number, default: 0},
    id: {type: Number, required: true}
  },
  data() {
    return {
      arrowColor: '#3675EE',
    }
  },
  computed: {
    ...mapState(['organization', 'branch', 'services']),
    branchToForward() {
      return this.isHomePage ? 'services' : 'service'
    },
  },
}
</script>

<style scoped>
.card {
  background: #FFFFFF;
  border-radius: 12px;
  position: relative;
}

.serviceTitle {
  font-font: 'Nunito';
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  color: #222B45;

}

.servicePrice {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #8F9BB3;
}

.newTag {
  width: 39px;
  height: 22px;
  position: absolute;
  top: 50%;
  right: 15%;
  transform: translateY(-50%);

  background: #FA4A0C;
  border-radius: 100px;

  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 13px;
  line-height: 20px;
  text-align: center;

  color: #FFFFFF;
}
</style>
