<template>
  <q-page class="flex q-pa-md page-user">
    <q-list class="full-width" separator>
      <q-item v-for="(user, key) in users" :key="key" :to="'/chat/' + key" clickable v-ripple>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge text-color="black" :color="user.online ? 'light-green-5' : 'grey-4'">
            {{ user.online ? 'Online' : 'Offline'}}
          </q-badge>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>

  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('storage', ['users'])
    }
  }
</script>

<style lang="stylus">
  .page-user
    background radial-gradient(circle, #FFFEEE 0%, #FDBF89 100%)
</style>
