<template>
  <div class="page-wrapper">
    <div class="app-wrapper">
      <Header />
      <Navbar />
      <b-container fluid="xl" class="my-0 my-sm-2 my-md-4 py-3 px-md-4 px-lg-5">
        <router-view :key="$route.fullPath" />
      </b-container>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
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
  background-color: $gray-150
  min-height: 100vh
</style>
