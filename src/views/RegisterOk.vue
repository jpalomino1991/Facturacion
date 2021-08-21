<template>
  <Confirmation title="Gracias" body="Su cuenta ha sido activada, puede iniciar sesión."/>
</template>

<script>
import Confirmation from '../components/Confirmation.vue'
import axios from 'axios'

export default {
    name: "RegisterOk",
    components: { Confirmation },
    async mounted(){
        this.token = this.$route.params.token
        this.email = this.$route.params.email
        console.log(this.email,this.token)
        try
        {
            let resp = await axios.get(`cuenta/ConfirmarCorreo?token=${this.token}&email=${this.email}`)
            if(resp.status != 200)
                this.$router.push({ name: 'Recibo' })
        }
        catch(err)
        {
            console.error(err)
            this.$router.push({ name: 'Recibo' })
        }
    },
    data() {
        return {
            token: '',
            email: '',
        };
    }
}
</script>

<style>

</style>