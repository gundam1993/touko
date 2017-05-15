<template>
  <v-app class='grey lighten-3' id="main-page" top-fixed-toolbar :left-fixed-sidebar="sidebar_display" sidebar-under-toolbar>
    <tool-bar :sideIconCilck='toggleSidebar' :powerIconCilck="logout"></tool-bar>
    <main>
      <side-bar :display='sidebar_display' :items="sidebar_item" @barChange="barChange"></side-bar>
      <v-content class='grey lighten-3 main-container'>
        <v-container fluid class='grey lighten-3'>
          <nuxt />
          <v-snackbar :timeout="3000" :bottom="true" :right="true" 
                      v-model="$store.state.noticeDisplay" @input="noticeToggle">
            {{$store.state.noticeInfo}}
            <v-btn flat class="red--text" @click.native="">关闭</v-btn>
          </v-snackbar>
        </v-container>
      </v-content>
    </main>
  </v-app> 
</template>

<script>
  import sidebar from '../components/SideBar'
  import toolbar from '../components/ToolBar'
  export default {
    name: 'MainPage',
    components: {
      'side-bar': sidebar,
      'tool-bar': toolbar
    },
    data: () => ({
      sidebar_display: true,
      sidebar_item: [{
        title: '首页',
        avatar: 'home',
        route: '/admin'
      }, {
        title: '文章',
        avatar: 'description',
        items: [{
          title: '文章列表',
          avatar: 'list',
          route: '/admin/posts'
        }, {
          title: '发表文章',
          avatar: 'add',
          route: '/admin/posts/new'
        }, {
          title: '草稿箱',
          avatar: 'inbox',
          route: '/admin/posts/draftbox'
        }]
      }, {
        title: '图片',
        avatar: 'photo',
        items: [{
          title: '相册管理',
          avatar: 'photo_album',
          route: '/admin/photography'
        }, {
          title: '文章插图管理',
          avatar: 'picture_in_picture',
          route: '/admin/post_picture'
        }]
      }, {
        title: '评论',
        avatar: 'comment',
        route: '/admin'
      }, {
        title: '编辑关于页面',
        avatar: 'face',
        route: '/admin/about'
      }, {
        title: '设置',
        avatar: 'settings',
        route: '/admin'
      }]
    }),
    methods: {
      toggleSidebar () {
        this.sidebar_display = !this.sidebar_display
      },
      barChange (e) {
        if (this.sidebar_display !== e) {
          this.sidebar_display = e
        }
      },
      logout () {
        this.$awtGet('/admin/logout').then((res) => {
          if (res.data.success) {
            localStorage.removeItem('touko-blog-token')
            this.$router.push('/admin/login')
          }
        })
      },
      noticeToggle (event) {
        if (event === false) {
          this.$store.commit('noticeOff')
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  #main-page {
    height: 100%;
    font-family: 'Roboto', 'Source Han Sans';

    main {
      height: 100%;
    }
    .main-container {
      overflow: auto;
      min-height: 100%;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
