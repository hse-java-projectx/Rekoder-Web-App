<template>
  <b-navbar toggleable="md" type="dark" variant="primary">
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
            <b-col md="8">
              <b-row>
                <b-col class="navbar-link" cols="12" md="3" xl="2">
                  <NavbarLink name="Feed" link="/feed" />
                </b-col>
                <b-col class="navbar-link" cols="12" md="3" xl="2">
                  <NavbarLink name="Explore" link="/explore" />
                </b-col>
                <b-col cols="12" md="6" class="my-auto">
                  <b-form-input size="sm" placeholder="Search" />
                </b-col>
              </b-row>
            </b-col>
            <b-col md="4">
              <b-row align-h="end">
                <template v-if="isSigned">
                  <b-col
                    class="navbar-link p-md-0"
                    cols="12"
                    md="4"
                    lg="6"
                    xl="4"
                  >
                    <NavbarLink
                      name="Profile"
                      :link="profileLink"
                      icon="user-alt"
                    />
                  </b-col>
                  <b-col
                    class="navbar-link p-md-0"
                    cols="12"
                    md="4"
                    lg="6"
                    xl="4"
                  >
                    <NavbarLink
                      name="Archive"
                      :link="archiveLink"
                      icon="archive"
                    />
                  </b-col>
                </template>
                <template v-else>
                  <b-col
                    class="navbar-link p-md-0"
                    cols="12"
                    md="4"
                    lg="6"
                    xl="4"
                  >
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
    ...mapGetters(['isSigned', 'userid', 'archiveRoot']),
    profileLink() {
      return `/profile/${this.userid}`;
    },
    archiveLink() {
      return `/profile/${this.userid}/archive/${this.archiveRoot}`;
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
  color: $light
  &:hover
    text-decoration-line: underline

.navbar-brand-text
  color: $light
  &:hover
    color: $light
    text-decoration: none
</style>
