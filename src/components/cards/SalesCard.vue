<template>
  <router-link :to="`/${organization.id}/${branch.id}/sales/${id}`" class="menuLink">
    <div class="bannerCard">
      <img :src="imgSrc" :alt="title" />
      <div class="cardTitle">{{ title }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">

import {mapState} from 'vuex';

export default {
  name: "SalesCard",
  props: {
    imgSrc: {type: String, required: true},
    title: {type: String, required: true},
    id: {type: Number, required: true}
  },
  computed: {
    ...mapState(['organization','branch'])
  }
}
</script>

<style scoped>
.bannerCard {
  width: 271px;
  height: 170px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  display: inline-block;
  margin-right: 20px;
}

.bannerCard img {
  width: 100%;
  height: 100%;
}

.bannerCard .cardTitle {
  position: absolute;
  left: 10px;
  bottom: 15px;
  width: 213px;
  font-size: 18px;
  color: #fff;
  line-height: 21px;
  font-family: 'Roboto',sans-serif;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  padding: 3px 5px;
  background-color: #3675EE;
}
</style>
