<template>
  <div>
    <b-container fluid class="px-0 px-md-5">
      <hr />
    </b-container>
    <b-container class="footer my-3">
      <b-row class="justify-content-md-center text-center">
        <b-col cols="12" md="3" lg="2"> About </b-col>
        <b-col cols="12" md="3" lg="2"> Contact us </b-col>
        <b-col cols="12" md="3" lg="2"> Report issue </b-col>
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
  font-size: 12pt
</style>
