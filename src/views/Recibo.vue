<template>
    <result :bills="comprobantes" />
</template>

<script>
import axios from 'axios'
import Result from '../components/Result.vue'

export default ({
    name: 'Recibo',
    data: () => ({
      comprobantes: [],
    }),
    components: {
      Result
    },
    created() {

    },
    async mounted() {
        try
        {
            let resp = await axios.get(`consulta/GetBills?numeroDocumento=${this.$store.state.user.credentials.numeroDocumento}`)
            if(resp.status == 200)
            {
                console.log(resp.data)
                this.comprobantes = resp.data
            }
        }
        catch(err)
        {
            console.log(err)
        }
    },
    methods: {
        async downloadFile(file, type) {
            try
            {
                let resp = await axios.get(`consulta/Download/?codigo=${file.codigoComprobante}&tipo=${type}`)
                if(resp.status == 200)
                {
                    var a = document.createElement("a");
                    a.href = `data:application/${type == 1 ? 'xml' : 'pdf'};base64,` + resp.data.itemImage;
                    a.download = resp.data.nombreArchivo
                    a.click();
                    URL.revokeObjectURL(a.href)
                }
                return resp;
            }
            catch(err)
            {
                return err;
            }
        }
    }
})
</script>
