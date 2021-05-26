<template lang="">
  <span>
    <b-row>
      <b-col cols="auto">
        <router-link :to="`/profile/team/${data.id}`">
        <b-avatar :variant="variant(data.id)"
                  :text="data.id.substr(0, 2)"
                  :src="data.avatarPath" size="3rem"/>
          </router-link>
        <div>
        </div>
      </b-col>
      <b-col class="my-auto">
        <span class="text-dark"> <strong> {{ data.name }} </strong> </span>
        <span>
          <router-link :to="`/profile/team/${data.id}`"> @{{ data.id }} </router-link>
        </span>
        <div>
          <router-link :to="`/team-members/${data.id}`">
            {{ data.memberIds.length }} {{ rightWord }}
          </router-link>
          </div>
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
    rightWord() {
      return this.data.memberIds.length === 1 ? 'member' : 'members';
    },

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
