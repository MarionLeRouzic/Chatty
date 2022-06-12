export default {
  computed: {
    otherUserDetails() {
      if (this.$store.state.storage.users[this.$route.params.otherUserId]) {
          return this.$store.state.storage.users[this.$route.params.otherUserId]
      }
      return {}
    }
  }
}
