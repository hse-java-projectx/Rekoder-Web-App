<template>
  <div>
    <div class="pb-3">
      <div>
        <div class="problem-name text-center mt-1 mt-md-3">
          <b>{{ name }}</b>
        </div>
        <div class="text-center">
          <slot name="under-solve" />
        </div>
        <hr />
        <div class="statement p-0 p-md-3">
          <Math :safe="false" :formula="statement" :options="mathJaxOptions" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Math from 'vue-mathjax/src/components/vue-mathjax.vue';

export default {
  props: {
    ownerName: String,
    owner: String,
    name: String,
    statement: String,
  },

  data() {
    return {
      mathJaxOptions: {
        tex2jax: { inlineMath: [['$$$', '$$$']], displayMath: [['$$$$$$', '$$$$$$']] },
      },
    };
  },

  components: { Math },
};
</script>
<style lang="sass">
@import "@/style/bootstrap-custom.scss"
@import "@/../node_modules/bootstrap/scss/bootstrap.scss"

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
