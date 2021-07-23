<template>
  <v-container class="grey lighten-5 mb-6">
    <v-row justify="center">
      <v-col md="6">
        <v-card
          class="pa-2"
        >
          <v-card-text>
            <p class="text-h4 text-center text--primary">
              {{ title }}
            </p>
            <v-spacer></v-spacer>
            <p class="text-center text--primary">
              {{ body }}
            </p>
          </v-card-text>
          <v-card-actions >
            <v-container>
              <v-row justify="center">
                <Home />
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Home from '../components/Home.vue'

export default {
    name: "Confirmation",
    components: { Home },
    props: ['title','body'],
}
</script>

<style>

</style>