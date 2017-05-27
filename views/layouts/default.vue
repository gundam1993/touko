<template>
  <div>
    <IndexMenu></IndexMenu>
    <nuxt class="nuxt_container" />
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
