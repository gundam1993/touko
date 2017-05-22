<template>
  <div id="photography">
    <v-card class="photography-block">
      <v-card-title>
        相册管理
      </v-card-title>
      <v-card-row>
       
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
        this.$awtGet('/api/admin/photography').then((res) => {
          console.log(res.data)
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  #photography {
    padding: 1rem;
    height: 100%;
  }

</style>
