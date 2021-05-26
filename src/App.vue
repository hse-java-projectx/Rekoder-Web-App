<template>
  <div class="page-wrapper">
    <CookieAuth />
    <div class="app-wrapper">
      <Navbar />
      <router-view :key="$route.fullPath" />
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import CookieAuth from '@/views/CookieAuth.vue';

export default {
  components: {
    Navbar,
    Footer,
    CookieAuth,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap");

.page-wrapper {
  font-family: "Rubik", sans-serif;
}
</style>

<style lang="sass">
@import "../node_modules/bootstrap/scss/bootstrap"
@import "../node_modules/bootstrap-vue/src/index.scss"
@import "src/style/bootstrap-custom.scss"

.app-wrapper
  background-color: $white
  min-height: 100vh
  max-width: 100vw
  overflow: hidden
</style>
