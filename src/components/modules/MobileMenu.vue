<template>
  <v-navigation-drawer
      v-model="menuOpen"
      absolute
      right
      temporary
      class="menuElem"
  >
    <div class="menuContainer">
      <div class="text-center langSwitcher space-x-2">
        <span @click="$i18n.locale = 'ru-RU'" :class="[{ 'underline underline-offset-8': currentLocalLan === 'ru-RU' }]">RU</span>
        <span>|</span>
        <span @click="$i18n.locale = 'kz-KZ'" :class="[{ 'underline underline-offset-8': currentLocalLan === 'kz-KZ' }]">KZ</span>
      </div>

      <v-list
          nav
          dense
      >
        <v-list-item-group
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title class="text-center">
              <router-link :to="`/${organization.id}/${branch.id}/home`" class="menuLink">{{ $t('menu.home') }}</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="text-center">
              <router-link :to="`/${organization.id}/${branch.id}/about-us`" class="menuLink">{{ $t('menu.aboutUs') }}</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="text-center">
              <router-link :to="`/${organization.id}/${branch.id}/feed-back`" class="menuLink">{{ $t('menu.feedBack') }}</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="text-center">
              <router-link :to="`/${organization.id}/${branch.id}/contact-us`" class="menuLink">{{ $t('menu.contactUs') }}</router-link>
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
      <div class="bottomMenuSection flex flex-column justify-space-around">
        <div class="socialSection flex my-6 mx-3 justify-center space-x-4">

          <v-btn
              v-for="(social, i) in socials"
              icon
              :key="`socials-${i}`"
              :href="social.link"
              target="_blank"
          >
            <v-icon
                :color="iconColor">mdi-{{ social.name }}</v-icon>
          </v-btn>
        </div>
        <div class="developetBySection">
          {{ $t('menu.developedBy') }}
          <br>
          <a href="https://ai-group.kz">Alma Innovation Group</a>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import {boolean} from 'boolean';
import {mapActions, mapState} from 'vuex';

export default Vue.extend({
  name: "MobileMenu",
  props: {
    compactMenuOpen: { type: Boolean, default: false },
  },
  async mounted() {
  },
  data(){
    return {
      menuOpen: false,
      iconColor: '#3675EE',
    }
  },
  computed: {
    ...mapState(['organization', 'branch']),
    currentLocalLan() {
      return this.$i18n.locale
    },
    socials() {
      return [
        {name:'facebook', link:'https://fb.com'},
        {name:'instagram', link:'https://instagram.com'},
        {name:'whatsapp', link:'https://wa.me'},
      ]
    },
  },
  watch: {
    compactMenuOpen() {
      this.menuOpen = this.compactMenuOpen
    },
    menuOpen() {
      if (this.menuOpen !== this.compactMenuOpen) {
        this.$emit('compact-speed-deal')
      }
    },
  },
  methods: {
    ...mapActions([]),
  },
})
</script>

<style scoped>
.menuElem {
  position: fixed;
  height: 100vh;
  top:0;
  right: 0;
}

.menuContainer {
  position: relative;
  width: 100%;
  height: 100%;
}

.langSwitcher {
  padding-top: 60px;
  padding-bottom: 40px;
  font-weight: 400 !important;
  font-size: 22px !important;
  line-height: 30px !important;
}

.menuLink {
  color: #3675EE;
  font-weight: 600;
  font-size: 18px;
}

.bottomMenuSection {
  position: absolute;
  bottom: 100px;
  left: 50%;
  width: 100%;
  height: 50px;
  text-align: center;
  transform: translate(-50%, -50%);
}

.developedBySection {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.developedBySection a {
  color: #3675EE;
  display: block !important;
}
</style>
