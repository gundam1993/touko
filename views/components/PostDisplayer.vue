<template>
  <div id="post-displayer">
    <article class="post-view" v-html="content"></article>
  </div>
</template>

<script>
  export default {
    name: 'PostDisplayer',
    data: () => ({
      marked: {}
    }),
    props: {
      content: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import url('~assets/css/post.css');
</style>
