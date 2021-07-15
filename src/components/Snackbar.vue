<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    color="red"
  >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
  </v-snackbar>
</template>

<script>
export default {
    name: "Snackbar",
    data: () => ({
        timeout: 3000,
    }),
    props: ['text','snackbar'],
}
</script>

<style>

</style>