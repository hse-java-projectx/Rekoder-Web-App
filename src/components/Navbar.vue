<template>
  <div class="comp-navbar">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand>
        <router-link to="/" class="header-item"><h3>Recoder</h3></router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/profile" class="header-item">Profile</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/about" class="header-item">About</router-link>
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
  &:hover
    color: $light
    underline: none
</style>
