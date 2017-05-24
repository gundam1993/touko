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
    asyncData: (context) => {
      return axios.get(`${context.env.baseUrl}/api/post/${context.route.params.postId}`).then((res) => {
        let post = {
          title: '',
          content: '',
          createdAt: '',
          pv: '',
          id: ''
        }
        post = res.data.post
        return {post: post}
      })
    },
    computed: {
      mainContent () {
        return marked(this.post.content)
      }
    },
    methods: {
      getPost () {
        let id = this.$route.params.postId
        this.$http.get(`/api/post/${id}`).then((res) => {
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
    height: 100%;
    
    .paper-block {
      margin: auto;
      padding: 1rem;
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
