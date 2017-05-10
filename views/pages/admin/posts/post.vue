<template>
  <div id="post-preview-page">
    <div id="preview-block">
      <v-card class="paper-block">
        <v-card-row>
          <div class="createdAt">
            {{this.post.createdAt}}
          </div>
        </v-card-row>
        <v-card-title>
          {{this.post.title}}
        </v-card-title>
        <v-card-row>
         
        </v-card-row>
      </v-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
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
    
  }
  h2 {
    text-align: center;
  }
  .info_title:hover {
    text-decoration: underline;
  }

</style>
