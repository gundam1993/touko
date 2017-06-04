<template>
  <div id="post-displayer">
    <section class="post-view" v-html="marked(content)"></section>
  </div>
</template>

<script>
  import marked from 'marked'
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
    },
    created () {
      this.marked = marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        langPrefix: 'hljs ',
        highlight: function (code) {
          return require('highlight.js').highlightAuto(code).value
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import url('~assets/css/post.css');
</style>
