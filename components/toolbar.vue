<template>
  <v-toolbar fixed class="grey darken-3">
    <v-toolbar-side-icon @click.native.stop="sideIconCilck"/>
    <v-toolbar-title class="hidden-sm-and-down">Blog</v-toolbar-title>
    <v-spacer />
    <v-btn icon dark>
      <v-icon>account_circle</v-icon>
    </v-btn>
    <v-btn icon dark @click.native.stop="powerIconCilck">
      <v-icon>power_settings_new</v-icon>
    </v-btn>
    <v-btn icon dark>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'ToolBar',
    props: {
      sideIconCilck: {
        type: Function
      },
      powerIconCilck: {
        type: Function
      }
    }
  }
</script>
