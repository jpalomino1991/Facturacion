<template>
  <div>
    <Anonymus />
    <Result :bills="comprobantes" v-if="comprobantes.length > 0"/>
  </div>
</template>

<script>
import Anonymus from '../components/Anonymus.vue'
import Result from '../components/Result.vue'
import { EventBus } from '../event-bus'
import axios from 'axios'

  export default {
    name: 'ConsultaAnonima',
    data: () => ({
      comprobantes: [],
    }),
    components: {
      Anonymus,
      Result,
    },
    methods: {
      async consultar(serie,numero,monto,fecha) {
        try{
          let resp = await axios.post("consulta/AccesoAnonimo", { 
            "serie": serie,
            "numero": numero,
            "monto": monto,
            "fecha": fecha });
            if(resp.status == 200)
            {
              this.comprobantes = resp.data;
            }
            return resp.status;
        }
        catch(error){
          EventBus.$emit('error', error)
        }
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
          return resp;
        }
        catch(err)
        {
          EventBus.$emit('error', err)
        }
      },
      reset() {
        this.comprobantes = []
      }
    }
  }
</script>
