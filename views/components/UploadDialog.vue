<template>
  <v-dialog v-model="show" width="60%">
    <v-card>
      <v-card-title>上传图片</v-card-title>
      <v-card-row>
        <div class="upload-block" @click="showImgChoose">
          <div v-if="displayPreview" class="upload-preview">
            <img :src="imgPreview" alt="UploadPreview">
          </div>
          <div v-if="!displayPreview" class="upload-button">
            <v-icon class="upload-icon">file_upload</v-icon>
          </div>
          <input ref="imgUploader" v-show='false' class="img-uploader" type="file" id="file-input" name="image" accept="image/*" @change="loadImg">
        </div>
      </v-card-row>
      <v-divider></v-divider>
      <v-card-row actions>
        <v-spacer></v-spacer>
        <v-btn flat v-on:click.native="show = false" class="error--text">取消</v-btn>
        <v-btn flat v-on:click.native="uploadImg" :disabled="Object.keys(img) === []" class="primary--text">确认</v-btn>
      </v-card-row>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'UploadDialog',
    data: () => ({
      show: this.display,
      img: {},
      imgPreview: '',
      displayPreview: false
    }),
    props: {
      display: {
        type: Boolean,
        default: false
      },
      token: [String, Number],
      policy: [String, Number],
      imgUploadUrl: String
    },
    watch: {
      show (newVal, oldVal) {
        if (newVal === false) {
          this.img = {}
          this.imgPreview = ''
          this.displayPreview = false
          this.$emit('displayOff')
        }
      },
      display (newVal, oldVal) {
        if (newVal === true) {
          this.show = true
        }
      }
    },
    methods: {
      showImgChoose () {
        this.$refs.imgUploader.click()
      },
      loadImg (e) {
        this.buildFileReader(e.target.files[0])
      },
      buildFileReader (file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = (e) => {
          this.imgPreview = e.target.result
          let data = e.target.result.split(',')[1]
          data = window.atob(data)
          let ia = new Uint8Array(data.length)
          for (var i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i)
          }
          const blob = new Blob([ia], {type: 'image/png'})
          this.img = blob
          this.displayPreview = true
          console.log(this.img)
        }
      },
      uploadImg () {
        let fd = new FormData()
        fd.append('file', this.img)
        fd.append('policy', this.policy)
        fd.append('signature', this.token)
        this.$http.post(this.imgUploadUrl, fd).then((res) => {
          if (res.data.code === 200) {
            this.show = false
            this.$store.commit('noticeChange', { msg: '上传成功' })
            this.$store.commit('noticeOn')
          } else {
            this.$store.commit('noticeChange', { msg: '上传失败' })
            this.$store.commit('noticeOn')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload-block {
    height: 400px;
    width: 100%;
    padding: 0 1rem 1rem 1rem;

    .upload-button {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      border: 0.5rem rgba(0, 0, 0, 0.5) dashed;
      text-align: center;
      cursor: pointer;

      .upload-icon {
        font-size: 10rem;
        margin-top: 10%;
      }
    }

    .upload-preview {
      height: 100%;
      text-align: center;
      background-color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-height: 100%;
        max-width: 100%;
        vertical-align: bottom;
        display: block;
      }
    }
  }
</style>
