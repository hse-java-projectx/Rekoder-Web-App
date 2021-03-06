<template>
  <!-- <b-row class="justify-content-center m-0 p-0">
    <b-col cols="12" xl="10" class="p-0"> -->
  <div class="comp-navbar-wrapper">
    <b-navbar toggleable="md" type="dark" variant="primary" class="comp-navbar">
      <b-navbar-brand>
        <router-link to="/feed" class="header-item d-inline-block d-md-none">
          <h3>Rekoder</h3>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-form>
            <b-form-input
              size="sm"
              class="ml-md-3 mr-md-4"
              placeholder="Search"
            ></b-form-input>
          </b-nav-form>
          <b-nav-item>
            <router-link to="/feed" class="header-item">
              <b-icon icon="newspaper"></b-icon>
              Feed
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/explore" class="header-item">
              <b-icon icon="signpost"></b-icon>
              Explore
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item right>
            <router-link to="/profile" class="header-item">
              <b-icon icon="person"></b-icon>
              Profile
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/archive" class="header-item">
              <b-icon icon="collection"></b-icon>
              Archive
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <!-- </b-col>
  </b-row> -->
</template>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.comp-navbar-wrapper
  position: sticky
  top: 0

.comp-navbar
  // border-radius: 6pt

.header-item
  color: $light
  font-size: 13pt
  &:hover
    color: $light
    underline: none
</style>
