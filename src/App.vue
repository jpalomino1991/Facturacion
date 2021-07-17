<template>
  <v-app>
    <Navbar/>
    <Snackbar :text="error" :error="show"/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Snackbar from './components/Snackbar.vue'
import { EventBus } from './event-bus'
import axios from 'axios'

export default {
  name: 'App',

  components: { Navbar, Snackbar },

  data: () => ({
    error: "",
    show: false
  }),

  mounted() {
    EventBus.$on('error', this.handleError)
    EventBus.$on('logout', this.logout)
    EventBus.$on('close', this.close)
  },

  methods: {
    async logout() {
      let resp = await axios.post("cuenta/Logout");
      if(resp.status == 200)
      {
        this.$store.commit("setAuthentication", [])
        this.$router.push({ name: 'Login' })
      }
    },
    close () {
      this.show = false
      this.error = ""
    },
    handleError(err) {
      if(err.response)
          this.error = err.response.data
        else
          this.error = "No hay respuesta del server"
      this.show = true
    }
  }
};
</script>
