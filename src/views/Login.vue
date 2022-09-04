<template>
  <div id="login-page" class="relative mx-auto h-full w-full max-w-screen-md p-8 md:p-0">
    <div class="logo">
      <img :src="logo" />
    </div>
    <div class="pt-32 mx-auto max-w-sm">
    <v-form
      ref="form"
      class="elevation-6 p-4 rounded-md white"
      lazy-validation
    >
      <v-text-field
        v-model="email"
        autocomplete="false"
        class="mb-2"
        label="E-mail"
        required
        :rules="emailRules"
        @focus="errors = []"
      ></v-text-field>

      <v-text-field
        v-model="password"
        autocomplete="false"
        class="mb-4"
        label="Password"
        required
        :rules="passwordRules"
        type="password"
        @focus="errors = []"
      ></v-text-field>

      <v-btn
        :disabled="!email || !password"
        color="primary"
        @click="handleLogin"
      >
        Login
      </v-btn>

      <div
        v-if="errors"
        class="flex flex-col w-full pt-2 red--text text-overline"
      >
        <div
          class="mb-xs"
          v-for="(error, index) in errors"
          :key="index"
        >
          {{ error }}
        </div>
      </div>

    </v-form>
    </div>
    <v-dialog
      v-if="user && user.uuid"
      v-model="dialog"
      max-width="400"
      persistent
    >
      <div id="office-dialog">
        <v-select
          v-model="office"
          :items="user.offices.filter(o => o.name !== 'Zagreb Office')"
          hint="Please select a practice."
          item-text="name"
          item-value="id"
          label="Practice"
          persistent-hint
          return-object
          solo
          @change="handleSelectOffice"
          @focus="errors = []"
        ></v-select>
        <div
          v-if="errors"
          class="flex flex-col w-full pt-2 red--text text-overline"
        >
          <div
            class="mt-xs mb-xs"
            v-for="(error, index) in errors"
            :key="index"
          >
            {{ error }}
          </div>
        </div>
      </div>

    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      logo: require('@/assets/images/prestige-logo.png'),
      valid: false,
      email: '',
      password: '',
      emailRules: [
        (v: string) => !!v || 'E-mail is required',
        // (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v: string) => !!v || 'Password is required',
      ],
      validating: false,
      errors: [],
      dialog: true,
      office: null,
      invalidError: 'Invalid credentials. Please try again.',
      defaultError: 'Something went wrong. Please try again.'
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    authError(): never | any {
      return {
        error: !!this.$store.state.auth.authenticationError,
        msg: this.$store.state.auth.authenticationError,
        code: this.$store.state.auth.authenticationErrorCode
      }
    }
  },
  // Using events to sign in on enter b/c @submit not working on v-form
  mounted() { window.addEventListener('keyup', this.onWindowKeyUp) },
  beforeDestroy() { window.removeEventListener('keyup', this.onWindowKeyUp) },
  methods: {
    async handleSelectOffice(): Promise<void> {
      this.$store.commit('setOffice', { data: this.office.uuid });
      const success = await this.$store.dispatch(
        'LOAD_DASHBOARD',
        { uuid: this.office.uuid, user: this.user.uuid }
      );
      if (!success) {
        this.errors = [this.defaultError];
        return;
      }
      this.$router.push({
        // @ts-ignore
        path: this.$router.history.current.query.redirect || '/'
      });
    },
    async handleLogin(): Promise<void> {
      this.validating = true;
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        const data = { email: this.email, password: this.password };
        const loggedIn = await this.$store.dispatch('authenticate', data);
        if (!loggedIn) {
          this.validating = false;
          console.log({ error: this.authError });
          if (this.authError.code === 400) {
            this.errors = [this.invalidError];
          } else {
            this.errors = [this.defaultError];
          }
          this.$progress.done();
          return;
        }
        this.validating = false;
      }
    },
    // Using events to sign in on enter b/c @submit not working on v-form
    onWindowKeyUp({ key }: KeyboardEvent) {
      if (key === 'Enter') this.handleLogin()
    }
  }
});
</script>

<style scoped>
#office-dialog {
  padding: 0px 32px;
  padding-top: 80px;
  height: 200px;
  background-color: white;
}
.logo {
  position: absolute;
  top: 32px;
  width: 150px;
  height: 43px;
  flex-shrink: 0;
  overflow: hidden;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
</style>
