<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn v-if="$route.fullPath.includes('/chat')"
               to="/" icon="arrow_back" flat dense label="Back" />
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
        <q-btn v-if="!userDetails.userId"
               to="/auth" class="absolute-right q-pr-sm" icon="account_circle" flat dense no-caps label="Login" />
        <q-btn v-else
               @click="logoutUser"
               class="absolute-right q-pr-sm" icon="account_circle" flat dense no-caps >
          Logout<br>
          {{ userDetails.name }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated >
      <div
        v-if="showAppInstallBanner"
        class="banner-container bg-primary">
        <div class="constrain">
          <q-banner
            inline-actions
            dense
            class="bg-primary text-white">
            <strong>Install Chatty?</strong>
            <template v-slot:action>
              <q-btn
                flat
                @click="installApp"
                label="Yes"
                class="q-px-sm"
                dense />
              <q-btn
                flat
                @click="showAppInstallBanner = false"
                label="Later"
                class="q-px-sm"
                dense />
              <q-btn
                flat
                @click="neverShowAppInstallBanner"
                label="Never"
                class="q-px-sm"
                dense />
            </template>
          </q-banner>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'

import mixinOtherDetails from '../mixins/mixin-other-user-details.js'

let deferredPrompt
export default defineComponent({

  data () {
    return {
      showAppInstallBanner: false
    }
  },
  mixins: [mixinOtherDetails],
  computed: {
    ...mapState('storage', ['userDetails']),
    title() {
      let currentPath = this.$route.fullPath
      if (currentPath === '/') return 'Chatty'
      else if (currentPath.includes('/chat')) return this.otherUserDetails.name
      else if (currentPath === '/auth') return 'Chatty'
    }
  },
  methods: {
    ...mapActions('storage', ['logoutUser']),
    installApp() {
      this.showAppInstallBanner = false
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('accepted')
        } else {
          console.log('rejected')
        }
      })
    },
    neverShowAppInstallBanner() {
      this.showAppInstallBanner = false
      this.$q.localStorage.set('neverShowAppInstallBanner', true)
    }
  },
  mounted() {

    let neverShowAppInstallBanner = this.$q.localStorage.getItem('neverShowAppInstallBanner')

    if (!neverShowAppInstallBanner) {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        this.showAppInstallBanner = true
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      this.showAppInstallBanner = true
    });
  }

})
</script>

<style lang="stylus">

  .q-toolbar
    .q-btn
      line-height: 1.2

</style>
