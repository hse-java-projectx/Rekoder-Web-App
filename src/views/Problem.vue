<template>
  <div>
    <div class="pb-3">
      <div>
        <div class="problem-name text-center mt-1 mt-md-3">
          <b>{{ problem.name }}</b>
        </div>
        <div class="text-center">
          <slot name="under-solve" />
        </div>
        <hr />
        <span class="big-font"> <b> Statement </b> </span>
        <div class="statement p-0 p-md-3">
          <Math :safe="false" :formula="problem.statement" :options="mathJaxOptions" />
        </div>
        <span class="big-font"> <b> Input format </b> </span>
        <div class="statement p-0 p-md-3">
          <Math
            :safe="false"
            :formula="problem.inputFormat"
            :options="mathJaxOptions"
          />
        </div>
        <span class="big-font"> <b> Output format </b> </span>
        <div class="statement p-0 p-md-3">
          <Math
            :safe="false"
            :formula="problem.outputFormat"
            :options="mathJaxOptions"
          />
        </div>
        <span class="big-font"> <b> Examples </b> </span>
        <div class="statement p-0 p-md-3">
          <b-table hover :items="problem.tests" />
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
    problem: Object,
    /*
    name: String,
    statement: String,
    inputFormat: String,
    outputFormat: String,
    tests: Array[Object],
    */
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
  white-space: pre-wrap

@media (max-width: $grid-md)
  .problem-name
    font-size: 16pt

  .statement
    font-size: 10pt
</style>
