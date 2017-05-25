<template>
  <div id="post_picture" class="masonry">
    <v-card class="title-block item">
      <v-card-title>
        插图管理
        <v-subheader v-text="`已用空间: ${(this.usage / 1024 / 1024).toFixed(3)}M`"></v-subheader>
      </v-card-title>
    </v-card>
    <v-card class="item"v-for="(file, index) in fileList" :key="index">
      <v-card-row class="title-picture">
        <img :src="`http://touko-blog-img.b0.upaiyun.com/${file.name}!preview`" alt="">
      </v-card-row>
      <v-divider></v-divider>
      <v-card-row actions>
        <v-btn class="blue--text text--lighten-2" icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn class="red--text text--lighten-2" icon>
          <v-icon>delete_forever</v-icon>
        </v-btn>
      </v-card-row>
    </v-card>
    <v-dialog v-model="modal" title="Alert Dialog">
        <v-card>
          <v-card-text>
            <h2 class="title">确认要删除文章吗？</h2>
          </v-card-text>
          <v-card-row actions>
            <v-spacer></v-spacer>
            <v-btn flat v-on:click.native="modal = false" class="primary--text">取消</v-btn>
            <v-btn flat v-on:click.native="deletePost()" class="primary--text">确认</v-btn>
          </v-card-row>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Photography',
    layout: 'admin',
    head: () => ({
      title: '插图管理'
    }),
    data: () => ({
      modal: false,
      usage: 0,
      fileList: []
    }),
    mounted: function () {
      this.getImgUsage()
      this.getImgInfo()
    },
    methods: {
      getImgUsage () {
        this.$http.get('/api/photo/spaceUsage/image').then((res) => {
          if (res.data.success) {
            this.usage = res.data.usage
          }
        })
      },
      getImgInfo () {
        this.$http.get('/api/photo/list/image').then((res) => {
          console.log(res.data)
          if (res.data.success) {
            let fileListRaw = res.data.fileList
            let arr = fileListRaw.split('\n')
            console.log(arr)
            let len = arr.length
            for (let i = 0; i < len; i++) {
              let file = arr[i].split('\t')
              this.fileList.push({
                name: file[0],
                type: file[1],
                size: file[2],
                updatedAt: file[3]
              })
            }
            console.log(this.fileList)
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  #post_picture {
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
    img {
      width: 100%;
      vertical-align: bottom;
    }
  }
</style>
