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
        <v-card-row>
          <table class="datatable table">
            <thead>
              <tr>
                <th class='column sortable text-xs-center' v-for="item in headers">{{item.text}}</th>
              </tr> 
            </thead>
            <tbody>
              <tr v-for="item in tableInfo">
                <td class="text-xs-center title">{{ item.title }}</td>
                <td class="text-xs-center">{{ dateTransform(item.createdAt) }}</td>
                <td class="text-xs-center">{{ item.pv }}</td>
                <td class="text-xs-right">
                  <v-btn icon class="blue--text text--lighten-2">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn icon class="red--text text--lighten-2">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr v-if="search === '' && tableInfo.length === 0 && ready">
                <td  class="text-xs-center" colspan="100%">暂无文章</td>
              </tr>
              <tr v-if="search !== '' && tableInfo.length === 0 && ready">
                <td  class="text-xs-center" colspan="100%">无相似文章</td>
              </tr>
              <tr v-if="!ready">
                <td class="text-xs-center" style="height:29rem" colspan="100%">
                  <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="red--text" />
                </td>
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
                          <v-list-item v-for="item in pageSizeList" :key="item" @click="pageSizeChange(item)">
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
    mounted: function () {
      this.getTableInfo(this.pageSize, 0, '')
    },
    methods: {
      getTableInfo (pageSize, page, search) {
        this.$awtGet(`/api/admin/posts?pageSize=${pageSize}&page=${page}&search=${search}`).then((res) => {
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
      pageSizeChange (item) {
        this.ready = false
        this.pageSize = item
        this.page = 0
        this.getTableInfo(this.pageSize, this.page, this.search)
      },
      pageChange (event) {
        this.ready = false
        this.page = event - 1
        this.getTableInfo(this.pageSize, event - 1, this.search)
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

      .datatable.table {
        tbody tr td.title {
          width: 50%;
          cursor: pointer;
          
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
