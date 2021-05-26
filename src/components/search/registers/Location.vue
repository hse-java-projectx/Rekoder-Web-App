<template lang="">
<div>
</div>
</template>
<script>
export default {
  props: {
    entity: String,
    id: String,
  },

  created() {
    this.$store.commit({
      type: 'addSearchLocation',
      location: { entity: this.entity, id: this.id },
    });
  },

  beforeDestroy() {
    this.$store.commit({
      type: 'removeSearchLocation',
      location: { entity: this.entity, id: this.id },
    });
  },
};
</script>
<style lang="">
</style>
