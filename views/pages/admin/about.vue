<template>
  <div id="new-post-page">
    <v-card class="paper-block">
      <v-card-title>
        编辑关于页面
      </v-card-title>
      <v-card-text class='pt-0'>
        <markdownEditor 
          :rows="19"
          v-model="content"
          :token="token"
          imgUploadUrl="http://up.qiniu.com"
          imgBaseUrl="http://oph4exrt7.bkt.clouddn.com/"></markdownEditor>
      </v-card-text>
      <v-divider />
      <v-card-row actions >
        <v-btn class="mr-3" default dark large @click.native="resetPost">重置</v-btn>
        <v-btn  error light large :disabled="content===''" @click.native="submitAbout()">保存</v-btn>
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
      content: '',
      msg: '',
      alert: false,
      token: ''
    }),
    components: {
      markdownEditor
    },
    mounted () {
      this.getAboutInfo()
      this.getQiNiuToken()
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
        this.content = ''
      },
      getAboutInfo () {
        this.$awtGet(`/api/admin/about`).then((res) => {
          if (res.data.success) {
            this.content = res.data.content
          }
        })
      },
      submitAbout () {
        this.$awtPost(`/api/admin/about`, {content: this.content}).then((res) => {
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
    padding: 1rem;
    height: 100%;

    .dialog__container {
      display: block;
    }
  }
</style>
