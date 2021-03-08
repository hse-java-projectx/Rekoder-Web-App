<template>
  <b-navbar toggleable="md" type="dark" variant="primary" class="comp-navbar">
    <b-navbar-brand>
      <router-link
        to="/feed"
        class="navbar-brand-text d-inline-block d-md-none"
      >
        <b>Rekoder <v-icon name="code-branch" scale="1.5" /></b>
      </router-link>
    </b-navbar-brand>
    <b-navbar-toggle size="sm" target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav class="w-100">
      <b-container fluid>
        <b-navbar-nav class="w-100">
          <b-row class="w-100">
            <b-col md="8">
              <b-row>
                <b-col class="navbar-link" cols="12" md="3" xl="2">
                  <NavbarLink name="Feed" link="/feed" icon="newspaper" />
                </b-col>
                <b-col class="navbar-link" cols="12" md="3" xl="2">
                  <NavbarLink name="Explore" link="/explore" icon="compass" />
                </b-col>
                <b-col cols="12" md="6" class="my-auto">
                  <b-form-input size="sm" placeholder="Search" />
                </b-col>
              </b-row>
            </b-col>
            <b-col md="4">
              <b-row align-h="end">
                <b-col
                  class="navbar-link p-md-0"
                  cols="12"
                  md="4"
                  lg="6"
                  xl="4"
                >
                  <NavbarLink name="Profile" link="/profile" icon="user-alt" />
                </b-col>
                <b-col
                  class="navbar-link p-md-0"
                  cols="12"
                  md="4"
                  lg="6"
                  xl="4"
                >
                  <NavbarLink name="Archive" link="/archive" icon="archive" />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-navbar-nav>
      </b-container>
    </b-collapse>
  </b-navbar>
</template>

<script>
import NavbarLink from '@/components/NavbarLink.vue';

export default {
  components: {
    NavbarLink,
  },
};
</script>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

@media (min-width: $grid-md)
  .navbar-link
    max-width: 80pt

.navbar-link-text
  color: $light
  &:hover
    text-decoration-line: underline

.navbar-brand-text
  color: $light
  &:hover
    color: $light
    text-decoration: none
</style>
