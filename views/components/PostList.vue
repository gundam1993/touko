<template>
  <div class="post-list">
    <div class="post" v-for="post in posts">
      <h1>{{post.title}}</h1>
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
    }
  }
</script>

<style lang='scss' scoped>
  
</style>
