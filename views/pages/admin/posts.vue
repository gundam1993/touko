<template>
  <div id="post-list-page">
    <div id="table-block">
      <v-card class="paper-block">
        <table>
          <thead>
            <tr>
              <th v-for="header in headers" v-text="header"></th>
            </tr>
          </thead>
          <tbody >
            <tr class="loading" v-if="!ready">
              <td :colspan="this.headers.length" class="loading">
                <v-progress-circular :size="70" :width="7" indeterminate class="red--text" />
              </td>
            </tr>
            <template v-if="ready" v-for="(info, index) in tableInfo">
              <tr>
                <td class="info_title" @click="$router.push(`/post/${info._id}`)">{{info.title}}</td>
                <td>{{info.created_at}}</td>
                <td>{{info.pv}}</td>
                <td>{{info.commentCount}}</td>
                <td>
                  <v-btn icon="icon" class="success--text" @click.native="$router.push(`/post/${info._id}`)">
                    <v-icon>pageview</v-icon>
                  </v-btn>
                  <v-btn icon="icon" class="info--text" @click.native="$router.push(`/post/edit/${info._id}`)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn icon="icon" class="error--text" @click.native.stop="showDeleteDialog(info._id, index)">
                    <v-icon>delete_forever</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
            <tr>
              <td class="pagination-block" :colspan="this.headers.length">
                <v-pagination :length.number="Math.ceil(total / pageSize)" v-model="page" @input="pageChange"></v-pagination>
              </td>
            </tr>
          </tbody>
        </table>
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
      headers: ['标题', '日期', '阅读', '评论', '操作'],
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
    table {
      height: 98%;
      width: 100%;
    }
    thead tr th {
      padding: 15px;
    }
    tbody tr td {
      padding: 4px;
    }
  }
  th {
    text-align: center;
  }
  td {
    cursor: pointer;
    text-align: center;
  }
  td.pagination-block {
    text-align: left;
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
