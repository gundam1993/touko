<template>
  <section id="post">
    <h1 class="post-title">{{post.title}}</h1>
    <PostDisplayer :content="post.content"></PostDisplayer>
    <div class="post-date">{{getDate(post.createdAt)}}</div>
  </section>
</template>

<script>
  import axios from 'axios'
  import PostDisplayer from '~components/PostDisplayer'
  export default {
    name: 'Post',
    layout: 'homepage',
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
    },
    mounted () {
      document.title = `${this.post.title} — Tommy. H`
    },
    methods: {
      getDate (str) {
        let date = new Date(str)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  #post {
    margin-bottom: 3rem;
    border-bottom: 1px dashed #ccc;

    .post-title {
      font-size: 28px;
      color: #555;
      margin-bottom: 2em;
    }

    .post-date {
      text-align: right;
      color: #5c5c5c;
      font-size: 16px;
      margin-bottom: 0.5rem;
    }
  }
</style>
