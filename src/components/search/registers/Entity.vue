<template lang="">
<div>
</div>
</template>
<script>
export default {
  props: {
    entity: String,
  },

  created() {
    this.$store.commit({ type: 'addSearchEntity', entity: this.entity });
  },

  beforeDestroy() {
    this.$store.commit({ type: 'removeSearchEntity', entity: this.entity });
  },
};
</script>
<style lang="">
</style>
