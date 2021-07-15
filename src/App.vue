<template>
  <Navbar/>
</template>

<script>
import Navbar from './components/Navbar.vue'
import axios from 'axios'

export default {
  name: 'App',

  components: { Navbar },

  methods: {
    async logout() {
      let resp = await axios.post("cuenta/Logout");
      console.log(resp.data);
      if(resp.status == 200)
      {
        this.$store.commit("setAuthentication", [])
        this.$router.push({ name: 'Login' })
      }
    }
  }
};
</script>
