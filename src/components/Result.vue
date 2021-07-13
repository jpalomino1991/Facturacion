<template>
  <v-card
    class="pa-2"
  >
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="bills"
        class="elevation-1"
        hide-default-footer
        no-data-text="No hay resultado(s)"
        :loading="loading"
        loading-text="Descargando ... Por favor espere"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Resultado(s)</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn 
              small class="mr-2"
              @click="downloadXML(item)"
              :loading="item.xml"
              :disabled="item.xml"
            >
                XML
            </v-btn>
            <v-btn 
              small class="mr-2"
              @click="downloadPDF(item)"
              :loading="item.pdf"
              :disabled="item.pdf"
            >
                PDF
            </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    name: "Result",
    props: ['bills'],
    data: () =>({
        loading: false,
        loading2: false,
        headers: [
            {
            text: 'Tipo Documento',
            align: 'start',
            value: 'nombreTipoComprobante',
            sortable: false
            },
            { text: 'Serie - Número', value: 'serieNumero', sortable: false },
            { text: 'Monto Total (S/.)', value: 'montoTotal', sortable: false },
            { text: 'Fecha de Emisión', value: 'fechaComprobante', sortable: false },
            { text: 'Estado Documento', value: 'nombreEstadoComprobante', sortable: false },
            { text: 'Estado SUNAT', value: 'nombreEstadoComprobanteSUNAT', sortable: false },
            { text: 'Descargar', value: 'actions', sortable: false },
        ],
        desserts: [],
    }),
    methods: {
        async downloadPDF(doc) {
          await this.download(doc,'pdf',2)
        },
        async downloadXML(doc) {
          await this.download(doc,'xml',1)
        },
        async download(doc, element, type) {
          this.$set(doc, element, true)
          let resp = await this.$parent.downloadFile(doc,type)
          if(resp !== '')
            this.$set(doc, element, false)
        }
    }
}
</script>

<style>

</style>