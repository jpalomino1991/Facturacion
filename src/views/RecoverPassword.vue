<template>
  <v-container class="grey lighten-5 mb-6">
    <v-row justify="center">
      <v-col md="6">
        <v-card
          class="pa-2"
        >
          <v-card-text>
            <p class="text-h4 text-center text--primary">
              Recuperar Contraseña
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
                      v-model="password"
                      :append-icon="mostrar ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="mostrar ? 'text' : 'password'"
                      label="Contraseña"
                      required
                      @click:append="mostrar = !mostrar"
                      counter
                      prepend-icon="mdi-lock"                        
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                        v-model="repassword"
                        :append-icon="mostrar2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min, passwordConfirmationRule]"
                        :type="mostrar2 ? 'text' : 'password'"
                        label="Confirmar Contraseña"
                        required
                        @click:append="mostrar2 = !mostrar2"
                        counter
                        prepend-icon="mdi-lock"                        
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
                  @click="recover"
                  :loading="loading"
                >
                  <v-icon
                    left
                    dark
                  >
                    mdi-content-save
                  </v-icon>
                  Guardar
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
    name: "RecoverPassword",
    components: {
      Home,
    },
    data: () => ({
      valid: true,
      loading: false,
      mostrar: false,
      mostrar2: false,
      token: '',
      email: '',
      password: '',
      repassword: '',
      rules: {
          required: value => !!value || 'Ingrese contraseña.',
          min: v => v.length >= 6 || 'Min 6 caracteres',
        },
    }),
    mounted() {
        this.token = this.$route.params.token
        this.email = this.$route.params.email
    },
    computed: {
      passwordConfirmationRule() {
        return () => (this.password === this.repassword) || 'Contraseñas no coinciden'
      }
    },
    methods: {
      async recover () {
        if(this.$refs.form.validate())
        {
          this.loading = true
          this.valid = false
          try{
            let resp = await axios.post("cuenta/RecuperarContrasena", { 
              "email": this.email,
              "token": this.token,
              "password": this.password,
              "confirmPassword": this.repassword
            });
            if(resp.status == 200)
              this.$router.push({ name: 'RecoverPasswordOk' });
            this.loading = false
            this.valid = true
          }
          catch(error){
            EventBus.$emit('error', error)
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