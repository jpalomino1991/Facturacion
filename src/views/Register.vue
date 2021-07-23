<template>
  <v-container class="grey lighten-5 mb-6">
    <v-row justify="center">
      <v-col md="6">
        <v-card
          class="pa-2"
        >
          <v-card-text>
            <p class="text-h4 text-center text--primary">
              Crear Cuenta
            </p>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="razonSocial"
                label="Razón Social/Nombre"
                placeholder="Electro Sur Este/Juan Perez"
                required
                prepend-icon="mdi-account"
              ></v-text-field>
              <v-select
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Item"
                required
              ></v-select>
              <v-text-field
                v-model="numeroDocumento"
                label="Número Documento"
                placeholder="54389234"
                required
                prepend-icon="mdi-account"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Correo"
                placeholder="tucorreo@gmail.com"
                required
                prepend-icon="mdi-account"
              ></v-text-field>
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
            </v-form>
          </v-card-text>
          <v-card-actions >
            <v-container>
              <v-row justify="center">
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                  :loading="loading"
                >
                  <v-icon
                    left
                    dark
                  >
                    mdi-magnify
                  </v-icon>
                  Crear
                </v-btn>

                <v-btn
                  color="error"
                  class="mr-4"
                  @click="reset"
                >
                  Limpiar
                </v-btn>
                <home />
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
    name: 'Register',
    components: {
      Home,
    },
    data: () => ({
      valid: true,
      name: '',
      mostrar: false,
      mostrar2: false,
      email: '',
      password: '',
      repassword: '',
      select: 'RUC',
      items: [
        'RUC',
        'DNI',
      ],
      rules: {
          required: value => !!value || 'Ingrese contraseña.',
          min: v => v.length >= 6 || 'Min 6 caracteres',
        },
      emailRules: [
        v => !!v || 'Ingrese un correo',
        v => /.+@.+\..+/.test(v) || 'Ingrese correo válido',
      ],
    }),
    computed: {
      passwordConfirmationRule() {
        return () => (this.password === this.repassword) || 'Contraseñas no coinciden'
      }
    },
    methods: {
      async validate () {
        if(this.$refs.form.validate())
        {
          this.loading = true
          this.valid = false
          try{
            let resp = await axios.post("cuenta/Register", { 
              "razonSocial": this.razonSocial,
              "numeroDocumento": this.numeroDocumento,
              "email": this.email,
              "password": this.password,
              "confirmPassword": this.repassword
            });
            if(resp.status == 200)
              this.$router.push({ name: 'Recibo' });
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
