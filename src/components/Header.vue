<template>
  <b-container
    fluid
    class="bg-gray-150 px-5 py-md-2 d-none d-md-inline-block text-left"
  >
    <b-row>
      <b-col>
        <router-link to="/feed" class="header-logo"
          ><h1><b>Rekoder</b></h1></router-link
        >
      </b-col>
      <b-col>
        <b-container class="header-additional-info text-secondary">
          <ul class="list-unstyled text-right my-auto">
            <li>
              About
              <b-icon icon="question-circle"></b-icon>
            </li>
            <li>
              Contact us
              <b-icon icon="telephone"></b-icon>
            </li>
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

.header-links-list
  list-style-type: none

.header-logo
  &:hover
    color: $primary
    text-decoration: none
</style>
