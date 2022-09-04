<template>
  <router-link :to="`/${organization.id}/${branch.id}/doctor/${id}`" class="menuLink">
    <div class="card hover:bg-blue-200 my-3 px-2 py-2 flex justify-space-between content-center">
      <div class="doctorImg ml-1 mr-3">
        <img :src="doctorImg" :alt="doctorName">
      </div>
      <div class="doctorInfo my-auto">
        <div class="doctorName">{{ doctorName }}</div>
        <div class="doctorMain">{{ doctorMain }}</div>
      </div>
      <div class="flex justify-end space-x-4">
        <v-icon :color="arrowColor">mdi-chevron-right</v-icon>
      </div>
    </div>
  </router-link>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "DoctorCard",
  props: {
    doctorName: {type: String, required: true},
    doctorMain: {type: String, required: true},
    doctorImg: {type: String, default: 'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-512.png'},
    id: {type: Number, required: true}
  },
  data() {
    return {
      arrowColor: '#3675EE',
    }
  },
  computed: {
    ...mapState(['organization', 'branch']),
  },
}
</script>

<style scoped>
.card {
  background: #FFFFFF;
  border-radius: 12px;
}

.doctorImg {
  border-radius: 9px;
  overflow: hidden;
  width: 80px;
  height: 80px;
  position: relative;
}

.doctorImg img {
  height: 100%;
  width: auto;
  width: -moz-fit-content;
  max-width: 200%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.doctorInfo {
  width: 70%;
  font-family: 'Nunito';
}

.doctorName {
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #222B45;
  max-width: 100%;
}

.doctorMain {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #8F9BB3;
}
</style>
