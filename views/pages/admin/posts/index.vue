<template>
  <div id="post-list-page">
    <div id="table-block">
      <v-card class="paper-block">
          <v-card-title>
            文章列表
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="搜索"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
        <v-data-table
          :headers="headers"
          v-model="tableInfo"
          :search="search"
          no-data-text="暂无文章"
          no-results-text="无相似文章">
          <template slot="items" scope="props">
            <td class="text-xs-middle">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.createdAt }}</td>
            <td class="text-xs-right">{{ props.item.pv }}</td>
            <td class="text-xs-right">
              <v-btn icon class="blue--text text--lighten-2">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon class="red--text text--lighten-2">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
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
  </div>
</template>

<script>
  export default {
    name: 'PostListPage',
    layout: 'admin',
    head: () => ({
      title: '文章列表'
    }),
    data: () => ({
      tableInfo: [],
      chosenId: '',
      chosenIndex: 0,
      modal: false,
      total: 0,
      page: 1,
      pageSize: 10,
      headers: [{text: '标题', value: 'title', left: true, sortable: false},
                {text: '日期', value: 'createdAt'},
                {text: '阅读', value: 'pv'},
                {text: '操作', sortable: false}],
      search: '',
      ready: false
    }),
    mounted: function () {
      this.getTableInfo(this.pageSize, 1)
    },
    methods: {
      getTableInfo (pageSize, page) {
        this.$awtGet(`/api/admin/posts?pageSize=${pageSize}&page=${page}`).then((res) => {
          this.tableInfo = res.data.posts
          this.total = res.data.total
          this.ready = true
        })
      },
      deletePost () {
        this.$awtGet(`/api/admin/post/delete/${this.chosenId}`).then((res) => {
          if (res.data.success) {
            this.table_info.splice(this.chosenIndex, 1)
            this.modal = false
          }
        })
      },
      showDeleteDialog (id, index) {
        this.chosenId = id
        this.chosenIndex = index
        this.modal = true
      },
      pageChange (event) {
        this.ready = false
        this.getTableInfo(this.pageSize, event)
        this.page = event
      }
    }
  }
</script>

<style lang='scss' scoped>
  #post-list-page {
    padding: 1rem;
    height: 100%;

    #table-block {
      height: 100%;
    }
  }
  h2 {
    text-align: center;
  }
  .info_title:hover {
    text-decoration: underline;
  }
  .loading {
    height: 550px;
  }
</style>
