<template>
  <q-page padding class="row justify-center items-center page-auth">
    <q-card class="shadow-24 card-auth">
      <div id="logo" class="row justify-center items-center">
        <img
          alt="logo"
          src="../assets/app-icon.png"
          width="150"
          height="150"
        >
      </div>

      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels class="tab-auth" v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register :tab="tab"/>
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab"/>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
  import { ref } from 'vue'

  export default {
    setup () {
      return {
        tab: ref('login')
      }
    },
    components: {
      'login-register' : require('components/LoginRegister.vue').default
    }
  }
</script>


<style lang="stylus">
  .page-auth
    background radial-gradient(circle, #FFFEEE 0%, #FDBF89 100%)

  .card-auth
    width 485px
    height 540px
    background radial-gradient(circle, #FBE9CA 0%, #FBE9CA 100%)

  .tab-auth
    background radial-gradient(circle, #FBE9CA 0%, #FBE9CA 100%)

</style>
