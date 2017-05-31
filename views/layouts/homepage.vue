<template>
  <div>
    <IndexMenu></IndexMenu>
    <main class="homepage-container">
      <v-container>
        <nuxt class="nuxt_container" />
      </v-container>
    </main>
  </div>
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
.homepage-container {
  margin-top: 4rem;
  margin-left: 15rem;
}
.container
{
  height: 100%;
  width: 100%;
}
#__nuxt {
  height: 100%;
}
#__nuxt>div {
  height: 100%;
}
</style>
