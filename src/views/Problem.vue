<template>
  <div>
    <div class="pb-3">
      <div>
        <div class="problem-name text-center mt-1 mt-md-3">
          <b>{{ name }}</b>
        </div>
        <div class="text-center mb-3">
          by <ProfileLink :name="ownerName" :profile="owner" />
        </div>
        <hr />
        <b> Statement </b>
        <div class="statement p-0 p-md-3">
          {{ statement }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProfileLink from '@/components/links/ProfileLink.vue';

export default {
  props: {
    ownerName: String,
    owner: String,
    name: String,
    statement: String,
  },

  components: { ProfileLink },
};
</script>
<style lang="sass">
@import "src/style/bootstrap-custom.scss"

.problem-name
  font-size: 20pt

.statement
  font-size: 16pt

@media (max-width: $grid-md)
  .problem-name
    font-size: 16pt

  .statement
    font-size: 10pt
</style>
