<template>
  <div>
    <anonymus />
    <result :bills="comprobantes"/>
  </div>
</template>

<script>
import Anonymus from '../components/Anonymus.vue'
import Result from '../components/Result.vue'
import axios from 'axios'

  export default {
    name: 'ConsultaAnonima',
    data: () => ({
      comprobantes: [],
    }),
    components: {
      Anonymus,
      Result
    },
    methods: {
      async consultar(serie,numero,monto,fecha) {
        try{
          let resp = await axios.post("consulta/AccesoAnonimo", { 
            "serie": serie,
            "numero": numero,
            "monto": monto,
            "fecha": fecha });
            console.log(resp);
            if(resp.status == 200)
            {
              this.comprobantes = resp.data;
            }
            return resp.status;
        }
        catch(error){
          console.log(error.response);
          return error.response;
        }
      }
    }
  }
</script>
