<template>
  <span>
    <b-row>
      <b-col cols="auto">
        <router-link :to="`/profile/user/${data.id}`">
          <b-avatar
            :variant="variant(data.id)"
            :text="data.id.substr(0, 2)"
            :src="data.avatarPath"
            size="3rem"
          />
        </router-link>
        <div></div>
      </b-col>
      <b-col class="my-auto">
        <span class="text-dark">
          <strong> {{ data.name }} </strong>
        </span>
        <span>
          <router-link :to="`/profile/user/${data.id}`">
            @{{ data.id }}
          </router-link>
        </span>
      </b-col>
    </b-row>
  </span>
</template>
<script>
import Backend from '@/js/backend/main';

export default {
  props: {
    data: { type: Object, required: true },
  },

  computed: {
    avatarPath() {
      return this.data.avatarPath;
    },
  },

  methods: {
    variant(s) {
      return Backend.variant(s);
    },
  },
};
</script>
<style lang="">
</style>
