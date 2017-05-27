<template>
  <div id="photography" class="masonry">
    <v-card class="title-block item">
      <v-card-title>
        相册管理
        <v-subheader v-text="`已用空间: ${(this.usage / 1024 / 1024).toFixed(3)}M`"></v-subheader>
        <v-btn class="blue--text text--lighten-2" icon @click.native.stop="showUploadDia()">
          <v-icon>cloud_upload</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
    <v-card class="item"v-for="(file, index) in fileList" :key="index">
      <v-card-row class="title-picture">
        <img :src="`http://touko-blog-photo.b0.upaiyun.com/${file.name}!preview`" alt="">
        <div class="img-mark">
          <div class="img-info">
            <div class="img-name title">{{file.name}}</div>
            <div class="img-size">
              {{(file.size / 1024 > 1024) ? `${(file.size / 1024 / 1024).toFixed(3)}M` : `${(file.size / 1024).toFixed(2)}K`}}</div>
            <div class="img-date">{{getFormatDate(file.updatedAt)}}</div>
          </div>
        </div>
      </v-card-row>
      <v-divider></v-divider>
      <v-card-row actions>
        <v-btn class="blue--text text--lighten-2" icon @click.native.stop="showPreviewDia(index)">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn class="red--text text--lighten-2" icon @click.native.stop='showDeleteDia(index)'>
          <v-icon>delete_forever</v-icon>
        </v-btn>
      </v-card-row>
    </v-card>
    <v-dialog v-model="modal">
        <v-card>
          <v-card-title>确认要删除图片吗？</v-card-title>
          <v-card-text>
          </v-card-text>
          <v-card-row actions>
            <v-spacer></v-spacer>
            <v-btn flat v-on:click.native="modal = false" class="primary--text">取消</v-btn>
            <v-btn flat v-on:click.native="deleteImg()" class="primary--text">确认</v-btn>
          </v-card-row>
        </v-card>
    </v-dialog>
    <v-dialog v-model="preview" width="" id="preview-dialog">
      <div class="preview-block">
        <img v-if="preview" id="preview-img" :src="`http://touko-blog-photo.b0.upaiyun.com/${fileList[chosenIndex].name}`" alt="">
      </div>
    </v-dialog>
    <uploadDialog :display="upload" 
                  :token="token" 
                  :policy="policy" 
                  imgUploadUrl="http://v0.api.upyun.com/touko-blog-photo" 
                  @displayOff="upload = false"></uploadDialog>
  </div>
</template>

<script>
  import uploadDialog from '~components/uploadDialog'
  export default {
    name: 'Photography',
    layout: 'admin',
    head: () => ({
      title: '相册管理'
    }),
    data: () => ({
      modal: false,
      usage: 0,
      fileList: [],
      chosenIndex: 0,
      preview: false,
      upload: false,
      token: '',
      policy: ''
    }),
    components: {
      uploadDialog
    },
    mounted: function () {
      this.getImgUsage()
      this.getImgInfo()
      this.getPhotoToken()
    },
    methods: {
      getImgUsage () {
        this.$http.get('/api/photo/spaceUsage/photo').then((res) => {
          if (res.data.success) {
            this.usage = res.data.usage
          }
        })
      },
      getImgInfo () {
        this.$http.get('/api/photo/list/photo').then((res) => {
          if (res.data.success) {
            let fileListRaw = res.data.fileList
            let arr = fileListRaw.split('\n')
            let len = arr.length
            for (let i = 0; i < len; i++) {
              let file = arr[i].split('\t')
              if (file[0] === '') { continue }
              this.fileList.push({
                name: file[0],
                type: file[1],
                size: file[2],
                updatedAt: file[3]
              })
            }
          }
        })
      },
      getPhotoToken () {
        this.$http.get('/api/admin/get_img_token/photo').then((res) => {
          if (res.data.success) {
            this.token = res.data.token
            this.policy = res.data.policy
          }
        })
      },
      getFormatDate (sec) {
        let date = new Date(Date(sec))
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      },
      showPreviewDia (index) {
        this.chosenIndex = index
        this.preview = true
      },
      showDeleteDia (index) {
        this.chosenIndex = index
        this.modal = true
      },
      showUploadDia () {
        this.upload = true
      },
      deleteImg () {
        let image = this.fileList[this.chosenIndex].name
        this.$http.get(`/api/photo/delete/photo/${image}`).then((res) => {
          if (res.data.success) {
            this.fileList.splice(this.chosenIndex, 1)
            this.modal = false
            this.getImgUsage()
            this.$store.commit('noticeChange', { msg: '删除成功' })
            this.$store.commit('noticeOn')
          } else {
            this.$store.commit('noticeChange', { msg: '删除失败' })
            this.$store.commit('noticeOn')
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  #photography {
    height: 100%;
  }
  .masonry {
    column-gap: 1.5rem;
    column-count: 3;

    .item {
      display: inline-block;
      background: #fff;
      margin: 0 0 .5em;
      width: 100%;
    }
  }

  @media all and (max-width: 960px) {
    .masonry {
      column-count: 2;
    }
  }

  @media all and (max-width: 921.6px) {
    .masonry {
      column-count: 1;
    }
  }
  .title-picture {
    position: relative;

    img {
      width: 100%;
      vertical-align: bottom;
    }

    .img-mark {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5));

      .img-info {
        width: 100%;
        bottom: 0;
        position: absolute;
        color: white;
        padding: 0 1rem;
      }
    }
  }
  
  #preview-dialog {
    .dialog__content {
      .dialog {
      }
    }
  }
  .preview-block {
    height: 100%;
  }
  #preview-img {
    height: 100%;
    vertical-align: bottom;
  }
  
</style>
