<template>
  <div id="app">
    <div class="nav">
      <RouterLink to="/"> Observer </RouterLink>
      <RouterLink to="/colors"> Colors </RouterLink>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
}

.nav {
  display: flex;
  justify-content: space-around;
  position: sticky;
  top: 0;
  background: white;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid grey;
}
</style>
