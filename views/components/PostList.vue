<template>
  <div id="post-list">
    <div class="post" v-for="post in posts">
      <nuxt-link :to="`/post/${post.id}`">
        <h2 class="post-title">{{post.title}}</h2>
        <span class="post-date">{{getDate(post.createdAt)}}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PostList',
    props: {
      posts: {
        type: Array,
        required: true
      }
    },
    methods: {
      getDate (str) {
        let date = new Date(str)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      }
    }
  }
</script>

<style lang='scss' >
#post-list {
  .post {
    a {
      color: #777;
      text-decoration: none;
      height: 1rem;
      line-height: 1rem;
      
      &:hover h2 {
        color: #555;
      }

      h2 {
        font-size: 1.1rem;
        font-weight: normal;
        display: inline-block;
      }
      .post-date {
        font-size: 0.7rem;
        margin-left: 0.2rem;
        color: #aaa;
      }
    }
  }
}
</style>
