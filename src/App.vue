<template>
  <div class="page-wrapper">
    <Header />
    <div class="app-wrapper">
      <Navbar />
      <b-container class="router-wrapper py-sm-4 py-3 my-sm-3">
        <router-view />
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

<style lang="sass">
@import src/style/bootstrap-custom.scss

@import "../node_modules/bootstrap/scss/bootstrap"
@import "../node_modules/bootstrap-vue/src/index.scss"

.page-wrapper
  font-family: "Ubuntu"

.app-wrapper
  background-color: $gray-150
  min-height: 100vh

.router-wrapper
  background-color: $white
  border-radius: 3pt
</style>
