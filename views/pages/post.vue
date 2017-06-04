<template>
  <div id="post">
    <PostDisplayer :content="post.content"></PostDisplayer>
  </div>
</template>

<script>
  import axios from 'axios'
  import PostDisplayer from '~components/PostDisplayer'
  export default {
    name: 'Post',
    layout: 'homepage',
    head: {
      title: 'Tommy.H'
    },
    components: {
      PostDisplayer
    },
    asyncData: (context) => {
      let postId = context.route.params.postId
      return axios.get(`${context.env.baseUrl}/api/post/${postId}`).then((res) => {
        if (res.data.success) {
          return {post: res.data.post}
        } else {
          return { post: {
            id: '',
            context: '',
            title: ''
          }}
        }
      })
    }
  }
</script>

<style>
  
</style>
