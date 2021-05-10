<template>
  <div>
    <b-img :src="src" :alt="alt" width="35" />
  </div>
</template>
<script>
export default {
  props: {
    src: String,
    alt: String,
  },
};
</script>
