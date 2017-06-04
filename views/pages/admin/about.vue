<template>
  <div id="new-post-page">
    <v-card class="paper-block">
      <v-card-title>
        编辑关于页面
      </v-card-title>
      <v-card-text class='pt-0'>
        <markdownEditor 
          :rows="19"
          v-model="about.content"
          :token="token"
          :policy="policy"
          imgUploadUrl="http://v0.api.upyun.com/touko-blog-img"
          imgBaseUrl="http://touko-blog-img.b0.upaiyun.com/"></markdownEditor>
      </v-card-text>
      <v-divider />
      <v-card-row actions >
        <v-btn class="mr-3" default dark large @click.native="resetPost">重置</v-btn>
        <v-btn  error light large :disabled="about.content===''" @click.native="submitAbout()">保存</v-btn>
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
    name: 'editAboutPage',
    layout: 'admin',
    head: () => ({
      title: '编辑关于页面'
    }),
    data: () => ({
      about: {
        content: ''
      },
      msg: '',
      alert: false,
      token: '',
      policy: ''
    }),
    components: {
      markdownEditor
    },
    mounted () {
      this.getAboutInfo()
      this.getImgToken()
    },
    methods: {
      getImgToken () {
        this.$http.get('/api/admin/get_img_token/image').then((res) => {
          if (res.data.success) {
            this.token = res.data.token
            this.policy = res.data.policy
          }
        })
      },
      resetPost () {
        this.about.content = ''
      },
      getAboutInfo () {
        this.$http.get(`/api/about`).then((res) => {
          if (res.data.success) {
            this.about = {content: res.data.content}
          }
        })
      },
      submitAbout () {
        this.$http.post(`/api/admin/about`, this.about).then((res) => {
          if (res.data.success) {
            this.$store.commit('noticeChange', { msg: '保存成功' })
            this.$store.commit('noticeOn')
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
    height: 100%;

    .dialog__container {
      display: block;
    }
  }
</style>
