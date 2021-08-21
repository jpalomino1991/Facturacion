<template>
  <v-container class="grey lighten-5 mb-6">
    <v-row justify="center">
      <v-col md="6">
        <v-card
          class="pa-2"
        >
          <v-card-text>
            <p class="text-h4 text-center text--primary">
              Olvido Contraseña
            </p>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="Correo"
                      placeholder="tucorreo@gmail.com"
                      required
                      prepend-icon="mdi-account"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions >
            <v-container>
              <v-row justify="center">
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="forget"
                  :loading="loading"
                >
                  <v-icon
                    left
                    dark
                  >
                    mdi-send
                  </v-icon>
                  Enviar
                </v-btn>

                <v-btn
                  color="error"
                  class="mr-4"
                  @click="reset"
                >
                  <v-icon
                    left
                    dark
                  >
                    mdi-broom
                  </v-icon>
                  Limpiar
                </v-btn>
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
import { EventBus } from '../event-bus'
import axios from 'axios'

export default {
    name: 'ForgetPassword',
    components: {
        Home,
    },
    data: () => ({
      valid: true,
      password: '',
      mostrar: false,
      loading: false,
      email: '',
      emailRules: [
        v => !!v || 'Ingrese un correo',
        v => /.+@.+\..+/.test(v) || 'Ingrese correo válido',
      ],
    }),

    methods: {
      async forget () {
        if(this.$refs.form.validate())
        {
          this.show = false
          this.loading = true
          this.valid = false
          try{
            let resp = await axios.get(`cuenta/OlvidoContrasena?email=${this.email}`);
            if(resp.status == 200)
            {
              this.$router.push({ name: 'ForgetPasswordOk' });
            }
            this.loading = false
            this.valid = true
          }
          catch(error){
            EventBus.$emit('error', error)
            this.show = true
            this.loading = false
            this.valid = true
          }
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
}
</script>

<style>

</style>