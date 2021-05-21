<template>
  <div>
    <SingleView>
      <template #content>
        <b-row>
          <b-col cols="12" md="4" class="p-1">
            <div class="page-item-container">
              <b-row>
                <b-col cols="3" md="12" class="text-center pr-0 px-md-3">
                  <PictureIcon :alt="avatarAlt" :src="avatarPath" />
                </b-col>
                <b-col cols="9" md="12">
                  <div class="text-dark big-font text-center mt-1">
                    <b>{{ name }}</b>
                  </div>
                  <div class="text-secondary text-center mb-1">
                    {{ subname }}
                  </div>
                  <b-container class="text-center my-1">
                    <slot name="undername" />
                  </b-container>
                  <div class="my-md-2 profile-bio">
                    <i>{{ bio }}</i>
                  </div>
                  <div class="my-3">
                    <div v-for="contact in contacts" :key="contact.name">
                      <strong> {{ contact.name }} </strong>:
                      <b-link :href="contact.ref">
                        {{ contact.short }}
                      </b-link>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="justify-content-center">
                <b-col
                  v-for="{ name, num, ref } in statRefs"
                  :key="name"
                  col
                  md="12"
                >
                  <router-link :to="ref" class="text-primary profile-numbers">
                    <b> {{ num }} </b>
                    <div style="display: inline">{{ name }}</div>
                  </router-link>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col cols="12" md="8" class="p-1">
            <slot name="feed" />
          </b-col>
        </b-row>
      </template>
    </SingleView>
  </div>
</template>

<script>
import PictureIcon from '@/components/profile/PictureIcon.vue';
import SingleView from '@/components/SingleView.vue';

export default {
  props: {
    statRefs: Array[Object], // name, num, ref
    contacts: Array[Object], // key, value, ref
    name: String,
    subname: String,
    avatarAlt: String,
    avatarPath: String,
    bio: String,
  },
  components: { PictureIcon, SingleView },
};
</script>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.profile-name
  font-size: 14pt
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
