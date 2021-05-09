<template>
  <div>
    <b-container fluid class="my-2">
      <span class="big-font">
        <b> {{ name }} </b>
      </span>
    </b-container>
    <slot name="content" />
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>
