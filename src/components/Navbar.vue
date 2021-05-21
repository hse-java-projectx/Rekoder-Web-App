<template>
  <b-navbar toggleable="md" type="light" variant="white" class="shadow-sm">
    <b-navbar-brand>
      <router-link to="/feed" class="navbar-brand-text">
        <b>Rekoder</b>
      </router-link>
    </b-navbar-brand>
    <b-navbar-toggle size="sm" target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav class="w-100">
      <b-container fluid>
        <b-navbar-nav class="w-100">
          <b-row class="w-100">
            <b-col md="7">
              <b-row>
                <b-col cols="12" md="6" class="my-auto">
                  <b-form-input size="md" placeholder="Search" />
                </b-col>
              </b-row>
            </b-col>
            <b-col md="5">
              <b-row align-h="end">
                <template v-if="isSigned">
                  <b-col cols="auto">
                    <NavbarLink name="Feed" link="/feed" />
                  </b-col>
                  <b-col cols="auto">
                    <NavbarLink name="Archive" :link="archiveLink" />
                  </b-col>
                  <b-col cols="auto">
                    <NavbarLink name="Profile" :link="profileLink" />
                  </b-col>
                </template>
                <template v-else>
                  <b-col cols="auto">
                    <NavbarLink name="Sign in" link="/signin" />
                  </b-col>
                </template>
              </b-row>
            </b-col>
          </b-row>
        </b-navbar-nav>
      </b-container>
    </b-collapse>
  </b-navbar>
</template>

<script>
import NavbarLink from '@/components/links/NavbarLink.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    NavbarLink,
  },

  computed: {
    ...mapGetters(['isSigned', 'userid', 'archiveRoot', 'storeProfileType']),
    profileLink() {
      return '/profile';
    },
    archiveLink() {
      return `/archive/${this.archiveRoot}`;
    },
  },
};
</script>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

@media (min-width: $grid-md)
  .navbar-link
    max-width: 60pt

.navbar-link-text
  color: $primary
  &:hover
    text-decoration-line: underline

.navbar-brand-text
  color: $primary
  &:hover
    color: $primary
    text-decoration: none
</style>
