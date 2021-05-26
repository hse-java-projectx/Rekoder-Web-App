<template lang="">
  <span>
    <b-row>
      <b-col cols="auto">
        <b-avatar :variant="variant(data.id)"
                  :text="data.id.substr(0, 2)"
                  :src="data.avatarPath" size="3rem"/>
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
export default {
  /* eslint-disable no-bitwise */
  /* eslint-disable no-param-reassign */

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
    hashCode(s) {
      return s.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return (a & (a * 123)) % 31;
      }, 0);
    },

    variant(handle) {
      const id = this.hashCode(handle);
      return ['primary', 'info', 'success', 'danger', 'secondary', 'light', 'dark'][id];
    },
  },
};
</script>
<style lang="">
</style>
