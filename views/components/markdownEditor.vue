<template>
  <div id="markdown-editor" :class="fullscreen ? 'fullscreen' : ''"  @keyup.esc="fullscreen = false">
    <div class="textarea-container">
      <textarea class="pt-1" 
                :class="column ? 'two-column' : ''" 
                name="main-content" 
                ref="mainContent"
                :placeholder="placeholder" 
                id="main-content" 
                v-model='content' 
                :rows="rows" 
                @input="handleInput"
                @paste="handlePaste"></textarea>
      <div class="preview-block" :class="column ? 'two-column' : ''" v-if="preview" v-html="mark(content)">
      </div>
    </div>
    <div class="buttom-block">
      <v-btn icon="icon" class="red--text" @click.native="showPreview">
        <v-icon>remove_red_eye</v-icon>
      </v-btn>
      <v-btn icon="icon" class="red--text" @click.native='setColumn'>
        <v-icon>view_column</v-icon>
      </v-btn>
      <v-btn icon="icon" class="red--text" @click.native='setFullscreen'>
        <v-icon v-if="!fullscreen">fullscreen</v-icon>
        <v-icon v-else>fullscreen_exit</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    data: () => ({
      content: this.value || '',
      mark: {},
      preview: false,
      column: false,
      fullscreen: false
    }),
    props: {
      rows: {
        type: Number,
        default: 10
      },
      placeholder: {
        type: String,
        default: '有什么想说的吗？'
      },
      imgUpload: {
        type: Boolean,
        default: true
      },
      imgUploadUrl: String,
      value: [String, Number]
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
      handleInput (event) {
        let value = event.target.value
        this.$emit('input', value)
      },
      handlePaste (event) {
        let file = event.clipboardData.files[event.clipboardData.files.length - 1]
        if (file && /^image/.test(file.type)) {
          event.preventDefault()
          console.log(file)
          this.buildFileReader(file)
        }
      },
      showPreview () {
        this.preview = !this.preview
        this.column = false
      },
      setColumn () {
        this.preview = !this.column
        this.column = !this.column
      },
      setFullscreen () {
        this.fullscreen = !this.fullscreen
      },
      buildFileReader (file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = (e) => {
          this.uploadImg(e.target.result)
        }
      },
      uploadImg (img) {
        this.$awtPost('/api/admin/upload_img', {img: img}).then((res) => {
          if (res.data.success) {
            this.pasteImg(res.data.src)
          }
        })
      },
      pasteImg (src) {
        let start = this.$refs.mainContent.selectionStart
        let end = this.$refs.mainContent.selectionEnd
        let insert = `![](${src})`
        let content = this.content.substring(0, start) + insert + this.content.substring(end, this.content.length)
        this.content = content
        // 修改内容赋值时不可以直接赋给绑定的变量，否则之后光标位置调整的步骤会失效
        this.$refs.mainContent.value = content
        this.$refs.mainContent.focus()
        this.$refs.mainContent.setSelectionRange(start + 2, start + 2)
        // 手动触发input事件，让外层绑定的变量更新
        this.$emit('input', content)
      }
    }
  }
</script>

<style lang='scss' scoped>
  #markdown-editor {
    width: 100%;
    position: relative;

    .textarea-container {
      width: 100%;
      height: 100%;
      position: relative;

      textarea {
        width: 100%;
        outline: none;
        resize: none;
        padding: 0 1rem;
        background-color: #fff;
        margin-top: 0.5rem;
      }

      textarea.two-column {
        width: 50%;
      }

      .preview-block {
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #eee;
        z-index: 100;
        box-sizing: border-box;
        padding: 1rem;
        overflow: auto;
      }

      .preview-block.two-column {
        left: 50%;
        right: 0;
      }
    }
    .buttom-block {
      text-align: left;
      background-color: #FFF;
    }
  }
  #markdown-editor.fullscreen {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;

    textarea {
      margin-top: 0;
      height: 94%;
    }
    .preview-block {
      height: 94%;
    }
    .buttom-block {
      position: absolute;
      height: 6%;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }
</style>
