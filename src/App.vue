<template>
  <div class="page-wrapper">
    <Header />
    <div class="app-wrapper">
      <Navbar />
      <b-container class="nav-router-wrapper p-0 m-auto">
        <b-container class="router-wrapper my-0 my-sm-2 my-md-4 py-3">
          <router-view />
        </b-container>
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
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

html {
  font-family: 'Roboto', sans-serif;
}
</style>

<style lang="sass">
@import "src/style/bootstrap-custom.scss"
@import "../node_modules/bootstrap/scss/bootstrap"
@import "../node_modules/bootstrap-vue/src/index.scss"

.app-wrapper
  background-color: $gray-150
  min-height: 100vh

.router-wrapper
  background-color: $white
  border-radius: 3pt
</style>
