<template>
  <div>
    <span class="d-none d-md-inline-block" v-for="way in path" :key="way.name">
      <span class="path-way">
        <router-link class="path-way-link" :to="way.link">
          {{ way.name }}
        </router-link>
        <b-icon icon="chevron-right" scale="0.7" />
      </span>
    </span>
    <span class="d-inline-block d-md-none">
      <span v-if="hasPrevWay" class="path-way">
        <router-link class="path-way-link" :to="prevWay.link">
          ...
        </router-link>
        <b-icon icon="chevron-right" scale="0.7" />
      </span>
      <span class="path-way">
        <router-link class="path-way-link" :to="lastWay.link">
          {{ lastWay.name }}
        </router-link>
        <b-icon icon="chevron-right" scale="0.7" />
      </span>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    path: Array[Object],
  },
  computed: {
    lastWay() {
      return this.path[this.path.length - 1];
    },
    hasPrevWay() {
      return this.path.length >= 2;
    },
    prevWay() {
      return this.path[this.path.length - 2];
    },
  },
};
</script>
<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap
</style>
