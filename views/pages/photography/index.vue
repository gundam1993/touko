<template>
  <div class="index">
    <Photography :photos="photos"></Photography>
  </div>
</template>

<script>
  import axios from 'axios'
  import Photography from '~components/Photography'
  export default {
    layout: 'homepage',
    head: {
      title: 'Tommy.H'
    },
    components: {
      Photography
    },
    asyncData: (context) => {
      return axios.get(`${context.env.baseUrl}/api/photo/list/photo`).then((res) => {
        if (res.data.success) {
          return {photos: res.data.fileList}
        } else {
          return {photos: []}
        }
      })
    }
  }
</script>

<style>
</style>
