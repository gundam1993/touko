<template>
  <div id="post-list-page">
    <div id="table-block">
      <v-card class="paper-block">
        <v-card-title>
          文章列表
          <v-spacer></v-spacer>
          <v-text-field class='search'
            append-icon="search"
            label="搜索"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-card-row>
          <table class="datatable table">
            <thead style="border-bottom: 1px solid #e0e0e0">
              <tr>
                <th class='column sortable text-xs-center' v-for="item in headers">{{item.text}}</th>
              </tr> 
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableInfo">
                <td class="text-xs-center title" @click="$router.push(`/admin/post/${item.id}`)">{{ item.title }}</td>
                <td class="text-xs-center">{{ dateTransform(item.createdAt) }}</td>
                <td class="text-xs-center">{{ item.pv }}</td>
                <td class="text-xs-right">
                  <v-btn
                    @click.native="$router.push(`/admin/post/${item.id}/edit`)"
                    v-tooltip:bottom="{ html: '编辑' }"
                    icon class="blue--text text--darken-2"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn
                    @click.native="moveToDraftBox(item.id, index)"
                    v-tooltip:bottom="{ html: '移至草稿箱' }" 
                    icon class="amber--text text--lighten-1"
                  >
                    <v-icon>move_to_inbox</v-icon>
                  </v-btn>
                  <v-btn
                    @click.native="showDeleteDialog(item.id, index)"
                    v-tooltip:bottom="{ html: '删除' }" 
                    icon class="red--text text--lighten-2"
                  >
                    <v-icon>delete_forever</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr v-if="search === '' && tableInfo.length === 0 && ready">
                <td  class="text-xs-center" colspan="100%">暂无文章</td>
              </tr>
              <tr v-if="search !== '' && tableInfo.length === 0 && ready">
                <td  class="text-xs-center" colspan="100%">无相似文章</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="100%">
                  <div class="datatable__actions">
                    <div class="datatable__actions__select">
                      Rows per page:
                      <v-menu offset-y>
                        <div class="input-group input-group--dirty input-group--light input-group--append-icon input-group--hide-details input-group--text-field input-group--select" slot="activator">
                          <div class="input-group__selections__comma">{{pageSize}}</div>
                          <i class="material-icons icon input-group__append-icon">arrow_drop_down</i>
                        </div>
                        <v-list>
                          <v-list-item v-for="item in pageSizeList" :key="item" @click="pageSizeChange(item, item.id, index)">
                            <v-list-tile>
                              <v-list-tile-title>{{ item }}</v-list-tile-title>
                            </v-list-tile>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                    <div v-if="tableInfo.length > 0" class="datatable__actions__pagination">{{1 + pageSize * page}}-{{pageSize * page + tableInfo.length}} of {{total}}</div>
                    <div v-else class="datatable__actions__pagination">0-0 of 0</div>
                    <v-pagination class="pagination" v-bind:length.number="paginationLength" v-model="paginationPage" @input="pageChange" />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
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
  </div>
</template>

<script>
  import axios from 'axios'
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
      page: 0,
      pageSize: 10,
      pageSizeList: [5, 10, 15, 20, 25, 30, 'All'],
      headers: [{text: '标题'}, {text: '日期'}, {text: '阅读'}, {text: '操作'}],
      search: '',
      ready: false
    }),
    asyncData (context) {
      return axios.get('/api/admin/posts?pageSize=10&page=0&search=')
        .then((res) => (
          {tableInfo: res.data.posts}
        ))
    },
    computed: {
      paginationPage () {
        return this.page + 1
      },
      paginationLength () {
        if (this.pageSize !== 'All') {
          return parseInt(this.total / this.pageSize) + 1
        } else {
          return 1
        }
      }
    },
    watch: {
      search (newVal, oldVal) {
        this.getTableInfo(this.pageSize, 0, newVal)
      }
    },
    created: function () {
      // this.getTableInfo(this.pageSize, 0, '')
    },
    methods: {
      getTableInfo (pageSize, page, search) {
        this.$http.get(`/api/admin/posts?pageSize=${pageSize}&page=${page}&search=${search}`).then((res) => {
          this.tableInfo = res.data.posts
          this.total = res.data.total
          this.ready = true
        })
      },
      dateTransform (date) {
        let newDate = new Date(date)
        return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
      },
      deletePost () {
        this.$http.get(`/api/admin/post/delete/${this.chosenId}`).then((res) => {
          if (res.data.success) {
            this.tableInfo.splice(this.chosenIndex, 1)
            this.total --
            this.modal = false
            this.$store.commit('noticeChange', { msg: '删除成功' })
            this.$store.commit('noticeOn')
          }
        })
      },
      moveToDraftBox (id, index) {
        this.$http.get(`/api/admin/post/move_to_draft/${id}`).then((res) => {
          if (res.data.success) {
            this.$store.commit('noticeChange', { msg: '移动成功' })
            this.$store.commit('noticeOn')
            this.tableInfo.splice(index, 1)
          }
        })
      },
      showDeleteDialog (id, index) {
        event.cancelBubble = true
        this.chosenId = id
        this.chosenIndex = index
        this.modal = true
      },
      pageSizeChange (item) {
        this.pageSize = item
        this.page = 0
        this.getTableInfo(this.pageSize, this.page, this.search)
      },
      pageChange (event) {
        this.page = event - 1
        this.getTableInfo(this.pageSize, event - 1, this.search)
      }
    }
  }
</script>

<style lang='scss' scoped>
  #post-list-page {
    height: 100%;

    .paper-block {
      width: 100%;
      height: 100%;
      margin: auto;
    }

    #table-block {
      height: 100%;

      .loading {
        height: 550px;
        width: 100%;
        text-align: center;
      }

      .datatable.table {
        tbody tr td.title {
          width: 50%;
          cursor: pointer;

          a {
            color: rgba(0,0,0,.87);
            text-decoration: none;
          }
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .pagination {
        float: right;
        .pagination__item--active {
          background-color: #e57373 !important;
        }
      }
    }
  }
  .search {
    margin: 0.3rem 0;
  }
  h2 {
    text-align: center;
  }
  .info_title:hover {
    text-decoration: underline;
  }

</style>
