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
      <b-collapse id="nav-collapse" is-nav class="w-100">
        <b-container fluid>
          <b-navbar-nav class="w-100">
            <b-row class="w-100">
              <b-col md="8">
                <b-row>
                  <b-col class="p-md-0" cols="12" md="3" xl="2">
                    <b-nav-item>
                      <router-link to="/feed" class="header-item">
                        <b-icon
                          icon="newspaper"
                          class="d-md-none d-lg-inline"
                        ></b-icon>
                        Feed
                      </router-link>
                    </b-nav-item>
                  </b-col>
                  <b-col class="p-md-0" cols="12" md="3" xl="2">
                    <b-nav-item>
                      <router-link to="/explore" class="header-item">
                        <b-icon
                          icon="signpost"
                          class="d-md-none d-lg-inline"
                        ></b-icon>
                        Explore
                      </router-link>
                    </b-nav-item>
                  </b-col>
                  <b-col cols="12" md="6">
                    <b-form-input placeholder="Search" />
                  </b-col>
                </b-row>
              </b-col>

              <b-col md="4">
                <b-row align-h="end">
                  <b-col class="p-md-0" cols="12" md="4" lg="6" xl="4">
                    <b-nav-item>
                      <router-link to="/profile" class="header-item">
                        <b-icon
                          icon="person"
                          class="d-md-none d-lg-inline"
                        ></b-icon>
                        Profile
                      </router-link>
                    </b-nav-item>
                  </b-col>
                  <b-col class="p-md-0" cols="12" md="4" lg="6" xl="4">
                    <b-nav-item>
                      <router-link to="/archive" class="header-item">
                        <b-icon
                          icon="collection"
                          class="d-md-none d-lg-inline"
                        ></b-icon>
                        Archive
                      </router-link>
                    </b-nav-item>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-navbar-nav>
        </b-container>
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

.header-item
  color: $light
  font-size: 13pt
  &:hover
    color: $light
    underline: none
</style>
