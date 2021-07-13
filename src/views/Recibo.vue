<template>
    <result :bills="comprobantes" />
</template>

<script>
import store from '../store'
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
            let resp = await axios.get(`consulta/GetBills?numeroDocumento=${store.state.user.credentials.numeroDocumento}`)
            if(resp.status == 200)
            {
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
                return err;
            }
        }
    }
})
</script>
