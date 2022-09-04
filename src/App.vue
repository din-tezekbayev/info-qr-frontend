<template>
  <v-app id="app">
    <v-app-bar app dense flat :height="70" class="app-bar">
      <div class="app-bar-text">
        <div
            v-if="!compactSpeedDial"
            class="mobileElemContainer"
        >
          <v-icon @click.stop="compactSpeedDial = !compactSpeedDial">mdi-menu</v-icon>
        </div>
        <div
            v-if="compactSpeedDial"
            class="mobileElemContainer"
        >
          <v-icon @click.stop="compactSpeedDial = !compactSpeedDial">mdi-close</v-icon>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="h-full" fluid>
        <router-view></router-view>
      </v-container>
      <MobileMenu
          :compact-menu-open="compactSpeedDial"
          @compact-speed-deal="compactSpeedDial = !compactSpeedDial"
      />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapState} from 'vuex';
import MobileMenu from '@/components/modules/MobileMenu.vue';

export default Vue.extend({
  name: 'App',
  components: {
    MobileMenu,
  },
  data() {
    return {
      logo: require('@/assets/logoSVG.png'),
      compactSpeedDial: false,
      cssVariables: { vh: '0' }
    };
  },
  computed: {
    ...mapState(['organization', 'branch']),
  },
  created() {
  },
  mounted() {
    if (!this.organization || !this.branch.length) {
      console.log('im in')
      const payload = {
        organizationId: this.$route.params.organizationId,
        branchId: this.$route.params.branchId,
      }
      this.GET_ORGANIZATION_INFO(payload)
    }
  },
  beforeDestroy() {
  },
  methods: {
    ...mapActions([
      'GET_ORGANIZATION_INFO',
    ])
  },
});
</script>

<style>

html, body {
  font-family: 'Nunito';
}

#app {
  font-family: 'Nunito';
  background-color: #F8F9FB !important;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */

}

/*.appBar {*/
/*  background-color: #F8F9FB !important;*/
/*  width: 100% !important;*/
/*}*/
.app-bar {
  background-color: #F8F9FB !important;
}

.app-bar-text {
  @apply w-full text-xl text-gray-darker text-center font-medium;
}

.logoInfoQR {
  width: 200px;
  height: auto;
  padding-top: 5px;
  padding-left: 5px;
}

.logoInfoQR img {
  width: 100%;
  height: 100%;
}

.mobileElemContainer {
  position: absolute;
  z-index: 10;
  top: 20px;
  right: 20px;
  transition: ease-in-out 1s;
}

.container {
  padding: 0;
}

ul, ol {
  list-style: auto !important;
}
</style>
