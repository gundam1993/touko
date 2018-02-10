<template>
  <main class="homepage-container">
    <IndexMenu></IndexMenu>
    <div class="container">
      <nuxt class="nuxt_container" />
    </div>
    <PageFooter></PageFooter>
  </main>
</template>

<script>
import IndexMenu from '../components/Menu'
import PageFooter from '../components/Footer'
export default {
  head: () => ({
    title: 'Tommy.H',
    link: [
      { hid: 'font-style', rel: 'stylesheet', href: '' },
      { hid: 'vuetify', rel: 'stylesheet', href: '' },
      { hid: 'admin', rel: 'stylesheet', href: '' }
    ]
  }),
  components: {
    IndexMenu,
    PageFooter
  }
}
</script>

<style>
body {
  margin: 0;
}
.homepage-container {
 margin: 2rem auto 0 auto;
 width: 90%;
 font-family: "Classic Grotesque W01", "Avenir Next", "Segoe UI", "Helvetica Neue", Arial, "Hiragino Sans GB", "PingFang SC", "Heiti SC", "Microsoft YaHei UI", "Microsoft YaHei", "Source Han Sans", sans-serif;
}
@media only screen and (min-width: 720px) {
  .homepage-container {
    width: 80%;
  }
}
@media only screen and (min-width: 960px) {
  .homepage-container {
    width: 65%;
  }
} 
@media only screen and (min-width: 1280px) {
  .homepage-container {
    width: 50%;
  }
} 
#__nuxt {
}
#__nuxt>div {
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
