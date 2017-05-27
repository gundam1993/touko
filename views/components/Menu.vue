<template>
  <div id="menu">
    <header class="large-screen hidden-sm-and-down">
      <div class="logo">
        <img src="~assets/img/title.png" alt="">
      </div>
      <ul class="menu-list">
        <li>BLOG</li>
        <li>PHOTOGRAPHY</li>
        <li>.</li>
        <li>ABOUT</li>
      </ul>
    </header>
    <header class="small-screen hidden-md-and-up">
      <div class="logo">
        <img src="~assets/img/title.png" alt="">
      </div>
      <div class="menu-bottom" @click='listShow = !listShow'>
          <v-icon class="black--text">menu</v-icon>
      </div>
      <transition name="fade">
        <ul v-if="listShow" class="menu-list">
          <li>BLOG</li>
          <li>PHOTOGRAPHY</li>
          <li>ABOUT</li>
        </ul>
      </transition>
    </header>
  </div>
</template>

<script>
  export default {
    name: 'menu',
    data: () => ({
      listShow: false
    })
  }
</script>

<style lang='scss' scoped>
  @font-face {
    font-family: "NeuzeitGro-Lig";
    src: url('~assets/font/NeuzeitGro-Lig.woff') format('woff'), /* chrome, firefox */
  }
  #menu {
    font-family: "NeuzeitGro-Lig";
    
    .large-screen {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: 15rem;
      height: 100%;
      padding: 2.5rem 2rem 0 2.5rem;
      box-sizing: border-box;

      .logo {
        width: 100%;

        img {
          width: 100%;
          vertical-align: bottom;
        }
      }
      .menu-list {
        display: block;
        margin-top: 1rem;
        list-style: none;
        padding-left: 0;

        li {
          font-size: 16px;
          cursor: pointer;

          &:hover {
            color: #aaa;
          }
        }
      }
    }

    .small-screen {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 4rem;
      box-sizing: border-box;

      .logo  {
        height: 100%;
        width: 80%;
        text-align: center;
        margin: auto;
        padding: 0.5rem;
        
        img {
          height: 100%;
          vertical-align: bottom;
        }
      }
      .menu-bottom {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        box-sizing: border-box;
        padding: 1rem;
      }

      .menu-list {
        list-style-type: none;
        padding: 0;

        li {
          display: block;
          width: 100%;
          text-align: center;
          height: 2rem;
          line-height: 2rem;
        }
      }
    }
  }

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
