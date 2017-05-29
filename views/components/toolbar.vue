<template>
  <v-toolbar fixed class="grey darken-3">
    <v-toolbar-side-icon light @click.native.stop="sideIconCilck"/>
    <v-toolbar-title class="hidden-sm-and-down">Blog</v-toolbar-title>
    <v-spacer />
    <v-btn icon light @click.native.stop="homeIconCilck">
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn icon light @click.native.stop="powerIconCilck">
      <v-icon>power_settings_new</v-icon>
    </v-btn>
    <v-btn icon light>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'ToolBar',
    props: {
      homeIconCilck: {
        type: Function
      },
      powerIconCilck: {
        type: Function
      },
      sideIconCilck: {
        type: Function
      }
    }
  }
</script>
