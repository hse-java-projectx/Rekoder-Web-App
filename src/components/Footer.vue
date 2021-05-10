<template>
  <div>
    <b-container fluid class="px-0 px-md-5 mt-5">
      <hr />
    </b-container>
    <b-container class="footer my-3">
      <b-row class="justify-content-md-center text-center">
        <b-col cols="12" md="2">
          <router-link to="/about"> About </router-link>
        </b-col>
        <b-col cols="12" md="2">
          <router-link to="/help"> Help </router-link>
        </b-col>
        <b-col cols="12" md="2">
          <router-link to="/contact"> Contact us </router-link>
        </b-col>
        <b-col cols="12" md="2">
          <router-link to="/report"> Report issue </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="sass" scoped>
@import "@/style/bootstrap-custom.scss"

.footer
  text-align: center
  height: fill
  color: $secondary
  font-size: 10pt
</style>
