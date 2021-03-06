<template>
  <div class="text-center">
    <b-container
      class="py-md-2 py-lg-3 d-none d-md-inline-block text-left"
    >
      <b-row>
        <b-col>
          <h1>
            <router-link to="/" class="header-logo"
              ><h1>Rekoder</h1></router-link
            >
          </h1>
        </b-col>
        <b-col>
          <b-container class="header-additional-info text-secondary text-right">
            <ul class="header-links-list">
              <li>About</li>
              <li>Contact us</li>
            </ul>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style lang="sass" scoped>
@import "@/style/bootstrap-custom.scss"

.header-links-list
  list-style-type: none

.header-logo
  &:hover
    color: $primary
    text-decoration: none
</style>
