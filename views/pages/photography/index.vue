<template>
  <div class="index">
    <h1>photography</h1>
    <Photography></Photography>
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
      return axios.get(`${context.env.baseUrl}/api/posts`).then((res) => {
        if (res.data.success) {
          return {posts: res.data.posts}
        } else {
          return {posts: []}
        }
      })
    }
  }
</script>

<style>
</style>
