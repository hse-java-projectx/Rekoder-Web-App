<template>
  <div class="page-wrapper">
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

export default {
  components: {
    Navbar,
    Footer,
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
@import "src/style/bootstrap-custom.scss"
@import "../node_modules/bootstrap/scss/bootstrap"
@import "../node_modules/bootstrap-vue/src/index.scss"

.app-wrapper
  background-color: $white
  min-height: 100vh
</style>
