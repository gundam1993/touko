<template>
  <v-app class='grey lighten-2' id="main-page" top-fixed-toolbar :left-fixed-sidebar="sidebar_display" sidebar-under-toolbar>
    <tool-bar :sideIconCilck='toggleSidebar' :powerIconCilck="logout"></tool-bar>
    <main>
      <side-bar :display='sidebar_display' :items="sidebar_item" @barChange="barChange"></side-bar>
      <v-content class='grey lighten-2 main-container'>
        <v-container fluid class='grey lighten-2'>
          <transition name="fade" mode="out-in">
            <nuxt @notification="showNotification" />
          </transition>
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
          avatar: 'backup',
          route: '/admin/post/new'
        }]
      }, {
        title: '图片',
        avatar: 'photo',
        route: '/admin'
      }, {
        title: '评论',
        avatar: 'comment',
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
      showNotification (event) {
        console.log(event)
        this.notificationInfo = event
        this.notification = true
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
    .page-enter-active {
      transition: all .3s ease;
    }
    .page-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .page-enter, .page-leave-to {
      transform: translateX(10px);
      opacity: 0;
    }
    .main-container {
      overflow: auto;
    }
  }
  
</style>
