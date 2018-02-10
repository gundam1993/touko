<template>
  <div id="about">
    <PostDisplayer :content="html"></PostDisplayer>
  </div>
</template>

<script>
  import PostDisplayer from '../../components/PostDisplayer'
  import axios from 'axios'
  export default {
    name: 'About',
    layout: 'homepage',
    head: () => ({
      title: 'About — Tommy. H'
    }),
    components: {
      PostDisplayer
    },
    asyncData: (context) => {
      return axios.get(`${context.env.baseUrl}/api/about`).then((res) => {
        if (res.data.success) {
          return {html: res.data.html}
        } else {
          return {html: []}
        }
      })
    }

  }
</script>

<style lang='scss' scoped>
  #about {
    width: 100%;
  }
</style>
