<template>
  <b-container fluid class="text-center">
    <p class="text-secondary">
      <i> {{ message }} </i>
    </p>
  </b-container>
</template>
<script>
export default {
  props: {
    message: String,
  },
};
</script>
