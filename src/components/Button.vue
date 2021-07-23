<template>
  <v-btn
      class="mx-2"
      dark
      small
      color="primary"
      :to="route"
    >
        {{ text }}
    </v-btn>
</template>

<script>
export default {
    name: "Button",
    props: ['route','text'],
}
</script>

<style>

</style>