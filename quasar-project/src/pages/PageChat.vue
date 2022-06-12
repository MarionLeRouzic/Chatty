<template>
  <q-page ref="pageChat" class="flex column">
    <q-banner
      v-if="!otherUserDetails.online"
      class="banner-info text-center">
      {{ otherUserDetails.name }} is offline.
    </q-banner>
    <div class="q-pa-md column col justify-end page-chat">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width">
          <q-input bg-color="white" outlined rounded v-model="newMessage" label="Message" dense>
            <template v-slot:after>
              <q-btn round dense flat type="submit" @click="sendMessage" color="white" icon="send" />
            </template>
          </q-input>
        </q-form>

      </q-toolbar>
    </q-footer>
  </q-page>

</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import mixinOtherDetails from '../mixins/mixin-other-user-details.js'

  export default {
    mixins: [mixinOtherDetails],
    data () {
      return {
        newMessage: ''
      }
    },
    computed: {
      ...mapState('storage', ['messages', 'userDetails']),
    },
    methods: {
      ...mapActions('storage', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
      sendMessage() {
        this.firebaseSendMessage({
          message: {
            text: this.newMessage,
            from: 'me'
          },
          otherUserId: this.$route.params.otherUserId
        })
        this.clearMessage()
      },
      clearMessage() {
        this.newMessage = ''
      }
    },
    mounted() {
      this.firebaseGetMessages(this.$route.params.otherUserId)
    },
    unmounted() {
      this.firebaseStopGettingMessages()
    }
  }
</script>

<style lang="stylus">
  .page-chat
    content ''
    left 0
    right 0
    top 0
    bottom 0
    z-index 0
    opacity 0.8
    background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #FDBF89 10px ), repeating-linear-gradient( #FF9AA255, #FBE9CA );

  .banner-info
    background #FBE9CA
</style>
