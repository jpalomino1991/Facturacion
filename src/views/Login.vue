<template>
  <v-container class="grey lighten-5 mb-6">
    <v-row justify="center">
      <v-col md="6">
        <v-card
          class="pa-2"
        >
          <v-card-text>
            <p class="text-h4 text-center text--primary">
              Iniciar Sesión
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
                  @click="login"
                  :loading="loading"
                >
                  <v-icon
                    left
                    dark
                  >
                    mdi-login
                  </v-icon>
                  Iniciar
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
    name: 'Login',
    components: {
        Home,
    },

    data: () => ({
      valid: true,
      password: '',
      mostrar: false,
      loading: false,
      email: '',
      rules: {
          required: value => !!value || 'Ingrese contraseña.',
          min: v => v.length >= 6 || 'Min 6 caracteres',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      emailRules: [
        v => !!v || 'Ingrese un correo',
        v => /.+@.+\..+/.test(v) || 'Ingrese correo válido',
      ],
    }),

    methods: {
      async login () {
        if(this.$refs.form.validate())
        {
          this.show = false
          this.loading = true
          this.valid = false
          try{
            let resp = await axios.post("cuenta/Login", { 
              "email": this.email,
              "password": this.password
            });
            if(resp.status == 200)
            {
              this.$store.commit("setAuthentication", { 
                id: resp.data.id,
                email: resp.data.email,
                numeroDocumento: resp.data.numeroDocumento,
                razonSocial: resp.data.razonSocial,
                })
              this.$router.push({ name: 'Recibo' });
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