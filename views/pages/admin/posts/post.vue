<template>
  <div id="post-preview-page">
    <div id="preview-block">
      <v-card class="paper-block">
        <v-card-row>
          <div class="createdAt">
            {{dateTransform(this.post.createdAt)}}
          </div>
        </v-card-row>
        <v-card-title>
          <h3>{{this.post.title}}</h3>
        </v-card-title>
        <v-card-row>
          <div class="main-content" v-html="mainContent">
          </div>
        </v-card-row>
      </v-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import marked from 'marked'
  export default {
    name: 'PostPreviewtPage',
    layout: 'admin',
    head () {
      return {
        title: this.post.title
      }
    },
    data: () => ({
      post: {
        title: '',
        content: '',
        createdAt: '',
        pv: '',
        id: ''
      }
    }),
    computed: {
      mainContent () {
        return marked(this.post.content)
      }
    },
    created: function () {
      this.getPost()
    },
    methods: {
      getPost () {
        let id = this.$route.params.postId
        axios.get(`/api/post/${id}`).then((res) => {
          if (res.data.success) {
            this.post = res.data.post
          }
        })
      },
      dateTransform (date) {
        return moment(date).format('MMMM Do YYYY')
      }
    }
  }
</script>

<style lang='scss' scoped>
  #post-preview-page {
    padding: 1rem;
    height: 100%;
    
    .paper-block {
      margin: auto;
      padding: 1rem;
      @media screen and (min-width: 768px) {
        padding: 1rem 2rem;
      }
      @media screen and (min-width: 960px) {
        padding: 2rem 4rem;
      }
      @media screen and (min-width: 1200px) {
        padding: 3rem 6rem;
        max-width: 1100px;
      }

    }

    .createdAt {
      color: #979797;
      font-weight: bold;
      font-size: 1.3rem;
    }

    .main-content  {
      padding: 0 16px;
      width: 100%;
    }
    
  }
  h2 {
    text-align: center;
  }
  .info_title:hover {
    text-decoration: underline;
  }

</style>
