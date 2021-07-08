<template>
  <v-container class="grey lighten-5 mb-6">
    <v-row justify="center">
      <v-col md="6">
        <v-card
          class="pa-2"
        >
          <v-card-text>
            <p class="text-h4 text-center text--primary">
              Consulta Anonima
            </p>
            <div class="text-center">Señor Contribuyente , a través de esta consulta, Usted podrá verificar si una Factura Electrónica, una Boleta Electrónica, sus Notas Electrónicas relacionadas o una Guía de Remisión Electrónica se encuentran registradas o informadas a la SUNAT.</div>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="serie"
                      :counter="4"
                      :rules="serieRules"
                      label="Serie"
                      placeholder="F001/B001"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="numero"
                      :counter="3"
                      :rules="numeroRules"
                      label="Número"
                      placeholder="269"
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="monto"
                      label="Monto"
                      :rules="montoRules"
                      placeholder="265.78"
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="date"
                      persistent
                      width="280px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Fecha de emisión"
                          prepend-icon="mdi-calendar"
                          readonly
                          :rules="dateRules"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        scrollable
                        locale="es-es"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="modal = false"
                        >
                          Salir
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(date)"
                        >
                          Seleccionar
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
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
                  @click="consultar"
                >
                  <v-icon
                    left
                    dark
                  >
                    mdi-magnify
                  </v-icon>
                  Consultar
                </v-btn>

                <v-btn
                  color="error"
                  class="mr-4"
                  @click="reset"
                >
                  Limpiar
                </v-btn>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Anonymus',

    data: () => ({
      valid: true,
      serie: '',
      numero: '',
      modal: false,
      date: '',
      dateRules: [
        v => !!v || 'Ingrese la fecha de emisión',
      ],
      serieRules: [
        v => !!v || 'Ingrese la serie',
        v => (v && v.length <= 4) || 'Serie debe ser de 4 caracteres',
      ],
      numeroRules: [
        v => !!v || 'Ingrese el número',
        v => (v && v.length <= 3) || 'Número debe ser de 3 dígitos',
      ],
      monto: '',
      montoRules: [
        v => !!v || 'Ingrese el monto',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      async consultar() {
        if(this.$refs.form.validate())
        {
          try{
            let resp = await axios.post("https://localhost:44366/consulta/AccesoAnonimo", { 
              "serie": this.serie,
              "numero": this.numero,
              "monto": this.monto,
              "fecha": this.date });
             console.log(resp); 
          }
          catch(error){
            console.log(error.response);
          }
        }
      }
    },
    created() {
    },
  }
</script>
