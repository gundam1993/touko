<template>
  <v-sidebar id="side-bar" class="white"  left fixed  v-model="sideBarDisplay">
    <v-list>
      <template v-for="item in items">
        <v-list-group v-if="item.items" :key="item.title">
          <v-list-item slot="item">
            <v-list-tile ripple>
              <v-list-tile-avatar >
                <v-icon class="grey--text text--darken-3">{{ item.avatar }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title class="title grey--text text--darken-3" v-text="item.title" />
              <v-list-tile-action>
                <v-icon class="grey--text text--darken-3">keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-item>
          <v-list-item v-for="subItem in item.items" :key="subItem.title">
            <v-list-tile ripple append router :href="subItem.route">
              <v-list-tile-avatar >
                <v-icon class="grey--text text--darken-3">{{ subItem.avatar }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title class="grey--text text--darken-3" v-text="subItem.title" />    
            </v-list-tile>
          </v-list-item>
        </v-list-group>
        <v-subheader v-else-if="item.header" v-text="item.header" />
        <v-divider v-else-if="item.divider" light />
        <v-list-item v-else >
          <v-list-tile ripple append router :href="item.route">
            <v-list-tile-avatar >
              <v-icon class="grey--text text--darken-3">{{ item.avatar }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title class="grey--text text--darken-3" v-text="item.title" />    
          </v-list-tile>
        </v-list-item>
      </template>
    </v-list>
  </v-sidebar>
</template>

<script>
  export default {
    name: 'SideBar',
    data: () => ({
      sideBarDisplay: this.display
    }),
    props: {
      display: {
        type: Boolean,
        required: true
      },
      items: {
        type: Array,
        required: true
      }
    },
    watch: {
      sideBarDisplay (newVal, oldVal) {
        this.$emit('barChange', newVal)
      },
      display (newVal, oldVal) {
        this.sideBarDisplay = newVal
      }
    }
  }
</script>

<style lang='scss' scoped>
  #side-bar {
    font-size: 16px;
  }
</style>
