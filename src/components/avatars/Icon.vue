<template>
  <b-img
    class="icon"
    :src="src"
    thumbnail
    :alt="alt"
    width="60"
  />
</template>
<script>
export default {
  props: {
    src: String,
    alt: String,
  },
};
</script>
<style lang="css">
.icon {
  border-radius: 50%;
}
</style>
