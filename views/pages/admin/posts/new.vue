<template>
  <div id="new-post-page">
    <v-card class="paper-block">
      <v-card-title class="pb-1">
        <v-text-field
          label="标题"
          hide-details
          v-model="post.title"
        ></v-text-field>
      </v-card-title>
      <v-card-text class='pt-0'>
        <markdownEditor 
          :rows="19"
          v-model="post.content"
          :token="token"
          imgUploadUrl="http://up.qiniu.com"
          imgBaseUrl="http://oph4exrt7.bkt.clouddn.com/"></markdownEditor>
      </v-card-text>
      <v-divider />
      <v-card-row actions >
        <v-btn class="mr-3" default dark large @click.native="resetPost">重置</v-btn>
        <v-btn  error light large :disabled="post.title===''" @click.native="submitPost">发布</v-btn>
      </v-card-row>
    </v-card>
    <v-dialog v-model="alert">
      <v-card>
        <v-card-row>
          <v-card-text>{{msg}}</v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="red--text darken-1" flat="flat" @click.native="alert = false">确认</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import markdownEditor from '~components/markdownEditor'
  export default {
    name: 'NewPostPage',
    layout: 'admin',
    head: () => ({
      title: '发表文章'
    }),
    data: () => ({
      post: {
        title: '',
        content: ''
      },
      msg: '',
      alert: false,
      token: ''
    }),
    components: {
      markdownEditor
    },
    mounted () {
      this.getQiNiuToken()
    },
    beforeDestroy () {
      this.post.title = ''
      this.post.content = ''
    },
    methods: {
      getQiNiuToken () {
        this.$awtGet('/api/admin/get_qi_niu_token').then((res) => {
          if (res.data.success) {
            this.token = res.data.token
          }
        })
      },
      resetPost () {
        this.post.title = ''
        this.post.content = ''
      },
      submitPost () {
        this.$awtPost('/api/admin/posts/new', this.post).then((res) => {
          if (res.data.success) {
            this.$store.commit('noticeChange', { msg: '发布成功' })
            this.$store.commit('noticeOn')
            this.$router.push('/admin/posts')
          } else {
            this.msg = res.data.msg
            this.alert = true
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  #new-post-page {
    padding: 1rem;
    height: 100%;

    .dialog__container {
      display: block;
    }
  }
</style>
