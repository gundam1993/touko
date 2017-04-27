<template>
  <v-container fluid class="post-editor">
    <v-row>
      <v-col xs6 class="title-block">
        <v-text-field class="title-input" v-model="post.title" label="标题" single-line required></v-text-field>
      </v-col>      
    </v-row>

    <markdown-editor v-model="post.content" :configs="configs" ref="markdownEditor"></markdown-editor>
    <div class="buttom-block">
      <v-btn @click.native="submit" error>提交</v-btn>
      <v-btn @click.native="clean" secondary>重置</v-btn>
    </div>
    <v-snackbar :timeout="timeout" v-model="snackbar" right>
      {{snackbar_text}}
      <v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    name: 'PostEditor',
    data: () => ({
      configs: {
        status: false, // 禁用底部状态栏
        renderingConfig: {
          codeSyntaxHighlighting: true, // 开启代码高亮
          highlightingTheme: 'dracula' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
        }
      },
      snackbar: false,
      snackbar_text: '',
      timeout: 3000,
      editor: {}
    }),
    props: {
      post: Object,
      submitUrl: String
    },
    methods: {
      clean () {
        this.post.content = ''
        this.post.title = ''
      },
      submit () {
        if (this.post.title !== '' && this.post.content !== '') {
          this.$awtPost(this.submitUrl, this.post).then((res) => {
            this.snackbar_text = res.data.desc
            this.snackbar = true
            if (res.data.success) {
              this.$router.push(`/post/${res.data.id}`)
            }
          })
        } else {
          this.snackbar_text = '请完成文章后再发表'
          this.snackbar = true
        }
      }
    }
  }
</script>

<style scoped>
  .post-editor {
    padding: 1rem;
  }
  .title-block {
    padding-left: 1rem;
  }
  .title-input {
    width: 80%;
    margin: 0;
  }
  .buttom-block {
    margin: 1rem;
    text-align: center;
  }
</style>
