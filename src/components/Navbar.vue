<template>
    <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

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

      <v-toolbar-title>Facturación Electrónica</v-toolbar-title>
      

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
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
            <v-list-item>
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
          <v-list-item to="/login">
            <v-list-item-title>Iniciar Sesión</v-list-item-title>
          </v-list-item>

          <v-list-item to="/register">
            <v-list-item-title>Registrar</v-list-item-title>
          </v-list-item>

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

export default {
  name: 'Navbar',

  data: () => ({
      drawer: false,
      group: null,
    }),

  watch: {
    group () {
      this.drawer = false
    },
  },
};
</script>
