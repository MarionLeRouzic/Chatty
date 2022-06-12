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
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'

import mixinOtherDetails from '../mixins/mixin-other-user-details.js'

export default defineComponent({

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
    ...mapActions('storage', ['logoutUser'])
  }

})
</script>

<style lang="stylus">

  .q-toolbar
    .q-btn
      line-height: 1.2

</style>
