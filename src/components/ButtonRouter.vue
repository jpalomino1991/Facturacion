<template>
    <div>
        <div class="d-block pa-2"></div>
        <v-container class="grey lighten-5 mb-4">
            <v-row justify="center">
                <Button :route="route1" :text="text1" />
                <Button :route="route2" :text="text2" />
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Button from './Button.vue'

export default {
    name: 'ButtonRouter',
    components: {
        Button,
    },
    props: ['route1','text1','route2','text2'],
}
</script>

<style>

</style>