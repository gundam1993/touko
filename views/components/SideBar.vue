<template>
  <v-navigation-drawer id="side-bar" light persistent clipped v-model="sideBarDisplay">
    <v-list dense>
      <template v-for="item in items">
        <v-list-group v-if="item.items" :value="item.active" :key="item.title">
          <v-list-tile slot="item">
            <v-list-tile-action >
              <v-icon class="grey--text text--darken-3">{{ item.avatar }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text text--darken-3">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon class="grey--text text--darken-3">keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-item v-for="subItem in item.items" :key="subItem.title">
            <v-list-tile ripple append router :href="subItem.route">
              <v-list-tile-action >
                <v-icon class="grey--text text--darken-3">{{ subItem.avatar }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title class="grey--text text--darken-3">{{ subItem.title }}</v-list-tile-title>  
            </v-list-tile>
          </v-list-item>
        </v-list-group>
        <v-subheader v-else-if="item.header" v-text="item.header" />
        <v-divider v-else-if="item.divider" light />
        <v-list-item v-else >
          <v-list-tile ripple append router :href="item.route">
            <v-list-tile-action >
              <v-icon class="grey--text text--darken-3">{{ item.avatar }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-3">{{ item.title }}</v-list-tile-title>    
          </v-list-tile>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
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
