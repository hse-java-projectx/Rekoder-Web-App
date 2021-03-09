<template>
  <div>
    <b-row>
      <b-col cols="12" md="4" class="page-item-container">
        <b-row>
          <b-col cols="3" md="12" class="text-center">
            <PictureIcon :alt="avatarAlt" :src="avatarPath" />
          </b-col>
          <b-col cols="9" md="12">
            <div class="profile-name mt-md-1">
              <b>{{ name }}</b>
            </div>

            <div class="my-md-2">
              <i>{{ bio }}</i>
            </div>

            <div class="my-3">
              <div v-for="{ key, value, ref } in information" :key="key">
                <b> {{ key }}: </b>
                <router-link :to="ref" class="text-primary">
                  {{ value }}
                </router-link>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-for="{ name, num, ref } in links" :key="name">
            <router-link :to="ref" class="text-primary">
              <b> {{ num }} </b> {{ name }}
            </router-link>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" md="8"  class="page-item-container">
        <slot name="feed"> Profile feed </slot>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PictureIcon from '@/components/profile/picture-views/PictureIcon.vue';

export default {
  props: {
    links: Array[Object],
    information: Array[Object],
    name: String,
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
  font-size: 18pt
  text-align: center

@media (min-width: $grid-md)
  .profile-name
    font-size: 24pt
</style>
