<template>
  <div id="post-list">
    <div class="post" v-for="post in posts">
      <h1 class="post-title">{{post.title}}</h1>
      <div class="post-content" v-html="getContent(post.content)"></div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    name: 'PostList',
    data: () => ({
      mark: {}
    }),
    props: {
      posts: {
        type: Array,
        required: true
      }
    },
    created () {
      this.mark = marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
          return require('highlight.js').highlightAuto(code).value
        }
      })
    },
    methods: {
      getContent (content) {
        return marked(content)
      }
    }
  }
</script>

<style lang='scss' >
@import url("~assets/css/highlight.min.css");
#post-list {
  .post-title {
    font-size: 5rem;
  }
  .post-content {
    padding-left: 3rem;
    h1 {
      font-size: 4rem;
      font-weight: bold;
    }

    h2 {
      font-size: 3rem;
      font-weight: bold;
    }

    p {
      font-size: 20px;
      margin-bottom: 0;
      line-height: 30px;
    }

    pre {
      width: 100%;

      code {
        width: 100%;
        padding: 1rem;
      }
    }
  }
  
  .post {
    margin: 1rem 0;
    border-bottom: 1px dashed #ccc;
  }
}
</style>
