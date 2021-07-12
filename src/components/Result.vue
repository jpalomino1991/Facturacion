<template>
  <v-data-table
    :headers="headers"
    :items="bills"
    class="elevation-1"
    hide-default-footer
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
        <v-btn small class="mr-2" @click="downloadXML(item)">
            XML
        </v-btn>
        <v-btn small class="mr-2" @click="downloadPDF(item)">
            PDF
        </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'
export default {
    name: "Result",
    props: ['bills'],
    data: () =>({
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
            await this.downloadFile(doc,2)
        },
        async downloadXML(doc) {
            await this.downloadFile(doc,1)
        },
        async downloadFile(file, type) {
            try
            {
                let resp = await axios.get(`consulta/Download/?codigo=${file.codigoComprobante}&tipo=${type}`)
                if(resp.status == 200)
                {
                    const blob = new Blob([resp.data.itemImage], { type: `application/${type == 1 ? 'xml' : 'pdf'}` })
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(blob)
                    link.download = resp.data.nombreArchivo
                    link.click()
                    URL.revokeObjectURL(link.href)
                }
            }
            catch(err)
            {
                console.log(err);
            }
        }
    }
}
</script>

<style>

</style>