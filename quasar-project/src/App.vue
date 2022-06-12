<template>
  <router-view />
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions('storage', ['handleAuthStateChanged'])
    },
    mounted() {
      this.handleAuthStateChanged()
    }
  }
</script>
