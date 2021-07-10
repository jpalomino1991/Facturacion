<template>
    <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://www.electroucayali.com.pe/Portal/images/logo-light-176x43v2.png"
        transition="scale-transition"
        width="150"
      />
      <v-toolbar-title >Facturación Electrónica</v-toolbar-title>
      
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      class="grey lighten-1"
      absolute
      bottom
      dark
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item class="d-flex justify-center mb-6">
            <div class="d-flex align-center">
              <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="https://www.electroucayali.com.pe/Portal/images/logo-light-176x43v2.png"
                transition="scale-transition"
                width="150"
              />
            </div>
          </v-list-item>
          <v-list-item class="d-flex justify-center mb-6">
            <v-avatar
              color="indigo"
              size="36"
            >
              <span class="white--text text-h5">Y</span>
            </v-avatar>
          </v-list-item>
          <div v-if="!user">
            <v-list-item to="/login">
              <v-list-item-title>Iniciar Sesión</v-list-item-title>
            </v-list-item>
            <v-list-item to="/register">
              <v-list-item-title>Registrar</v-list-item-title>
            </v-list-item>
          </div>
          <div v-else>
            <v-list-item to="/recibo">
              <v-list-item-title>Principal</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Cerrar Sesion</v-list-item-title>
            </v-list-item>
          </div>
          <v-list-item to="/">
            <v-list-item-title>Consulta Anónima</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import store from '../store'

export default {
  name: 'Navbar',

  data: () => ({
      drawer: false,
      group: null,
    }),
  computed: {
    user () {
      return store.state.user.credentials.razonSocial;
    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
};
</script>
