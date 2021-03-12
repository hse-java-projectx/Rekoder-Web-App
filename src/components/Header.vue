<template>
  <b-container
    fluid
    class="bg-gray-150 px-5 py-md-2 d-none d-md-inline-block text-left"
  >
    <b-row>
      <b-col>
        <router-link to="/feed" class="header-logo">
          <b>Rekoder</b>
        </router-link>
      </b-col>
      <b-col>
        <b-container class="header-additional-info text-secondary">
          <ul class="list-unstyled text-right my-auto">
            <li>About</li>
            <li>Contact us</li>
          </ul>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  methods: {},
};
</script>

<style lang="sass" scoped>
@import "@/style/bootstrap-custom.scss"

.header-logo
  font-size: 24pt
  &:hover
    color: $primary
    text-decoration: none
</style>
