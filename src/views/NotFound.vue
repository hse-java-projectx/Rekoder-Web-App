<template>
  <b-card
    title="Something went wrong"
    bg-variant="danger"
    text-variant="white"
  >
    <b-card-text> {{ message }} </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: 'NotFound',

  props: {
    message: String,
  },
};
</script>
