<template>
  <div id="post_picture" class="masonry">
    <v-card class="title-block item">
      <v-card-title>
        插图管理
      </v-card-title>
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
      title: '相册管理'
    }),
    data: () => ({
      modal: false
    }),
    mounted: function () {
      // this.getTableInfo(this.pageSize, 0, '')
    },
    methods: {
      getPhotographyInfo () {
        this.$http.get('/api/admin/photography').then((res) => {
          console.log(res.data)
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
</style>
