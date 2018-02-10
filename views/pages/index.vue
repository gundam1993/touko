<template>
  <div class="index">
    <PostList :posts="posts"></PostList>
  </div>
</template>

<script>
  import PostList from '../components/PostList'
  import axios from 'axios'
  export default {
    layout: 'homepage',
    head: {
      title: 'Tommy.H'
    },
    components: {
      PostList
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
