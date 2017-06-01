<template>
  <main class="homepage-container">
    <IndexMenu></IndexMenu>
    <div class="container">
      <nuxt class="nuxt_container" />
    </div>
  </main>
</template>

<script>
import IndexMenu from '~components/Menu'
export default {
  components: {
    IndexMenu
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
</style>
