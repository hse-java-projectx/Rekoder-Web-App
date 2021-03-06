<template>
  <div class="comp-navbar">
    <b-navbar toggleable="md" type="dark" variant="primary" class="px-md-4">
      <b-navbar-brand>
        <router-link to="/feed" class="header-item d-inline-block d-md-none"
          ><h3>Recoder</h3></router-link
        >
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
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
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.header-item
  color: $light
  font-size: 14pt
  &:hover
    color: $light
    underline: none
</style>
