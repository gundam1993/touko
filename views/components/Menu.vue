<template>
  <div id="menu">
    <header class="large-screen hidden-sm-and-down">
      <div class="title">
        <h1>\Tommy.H\</h1>
      </div>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/">BLOG</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/photography">PHOTOGRAPHY</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">ABOUT</nuxt-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
  export default {
    name: 'topMenu'
  }
</script>

<style scoped>
  @media only screen and (max-width: 450px) {
      #menu li {
        width: 100%;
      }
  }
  #menu {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    color: #555;
    font-family: sans-serif;
    margin-bottom: 2rem;
  }

  #menu .title h1 {
    font-weight: normal;
    letter-spacing: 5px;
    font-size: 1rem;
  }
  #menu ul {
    padding: 0;
  }
  #menu li {
    display: inline-block;
    padding: 0 1rem;
    margin: 0.2rem 0;
    box-sizing: border-box;
    font-weight: 300;
    cursor: pointer;
    list-style: none;
    color: #555;
  }
  #menu a {
    display: inline-block;
    text-decoration: none;
    color: #777;
  }
  #menu a:hover {
    color: #aaa;
  }
</style>
