<template>
  <div>
    <b-row>
      <b-col cols="12" md="4" class="p-1">
        <div class="page-item-container">
          <b-row>
            <b-col cols="3" md="12" class="text-center pr-0 px-md-3">
              <PictureIcon :alt="avatarAlt" :src="avatarPath" />
            </b-col>
            <b-col cols="9" md="12">
              <div class="mt-md-1 text-dark text-center" style="font-size: 16pt">
                <b>{{ username }}</b>
              </div>
              <div class="mt-md-1 text-secondary text-center">
                <b>{{ name }}</b>
              </div>

              <div class="my-md-2 profile-bio">
                <i>{{ bio }}</i>
              </div>

              <div class="my-3">
                <div v-for="{ key, value, ref } in information" :key="key">
                  <b> {{ key }}: </b>
                  <router-link :to="ref" class="text-primary">
                    <span class="profile-bio"> {{ value }} </span>
                  </router-link>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="justify-content-center">
            <b-col v-for="{ name, num, ref } in links" :key="name" col md="12">
              <router-link :to="ref" class="text-primary profile-numbers">
                <b> {{ num }} </b>
                <div style="display: inline">{{ name }}</div>
              </router-link>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col cols="12" md="8" class="p-1">
        <slot name="feed">
          <div style="height: 100pt" class="page-item-container">Hello!</div>
          <div style="height: 100pt" class="page-item-container">Hello!</div>
          <div style="height: 100pt" class="page-item-container">Hello!</div>
          <div style="height: 100pt" class="page-item-container">Hello!</div>
          <div style="height: 100pt" class="page-item-container">Hello!</div>
        </slot>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PictureIcon from '@/components/profile/PictureIcon.vue';

export default {
  props: {
    links: Array[Object],
    information: Array[Object],
    name: String,
    username: String,
    avatarAlt: String,
    avatarPath: String,
    bio: String,
  },
  components: { PictureIcon },
};
</script>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.profile-name
  font-size: 14pt
  text-align: center

.profile-username
  font-size: 18pt
  text-align: center

.profile-bio
  font-size: 11pt

.profile-numbers
  font-size: 10pt

@media (min-width: $grid-md)
  .profile-name
    font-size: 20pt

  .profile-bio
    font-size: 12pt

  .profile-numbers
    font-size: 12pt
</style>
