<template>
  <v-snackbar
    v-model="error"
    bottom
    absolute
    timeout="-1"
    color="red"
  >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="cerrar()"
        >
          Cerrar
        </v-btn>
      </template>
  </v-snackbar>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
    name: "Snackbar",
    props: ['text','error'],
    methods: {
      cerrar () {
        EventBus.$emit('close')
      }
    },
}
</script>

<style scoped>

</style>