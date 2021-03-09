<template>
  <div>
    <b-img :src="src" fluid rounded :alt="alt" class="image-large"></b-img>
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
