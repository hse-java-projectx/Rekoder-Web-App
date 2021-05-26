<template>
  <b-jumbotron
    v-if="!hasAgreement"
    bg-variant="light"
    header="Cookie Law 🍪"
    header-level="5"
    lead="We use cookies to store the login token on your computer. It's okay, everyone does it!"
  >
    <b-button variant="primary" @click.prevent="onClickAgree"
      >Ok, I understand</b-button
    >
  </b-jumbotron>
</template>
<script>
import Backend from '@/js/backend/main';

export default {
  data() {
    return {
      cToken: 'rekoder-access-token',
      cAgeement: 'rekoder-cookie-agreement',
      hasAgreement: null,
    };
  },

  created() {
    this.hasAgreement = this.$cookies.isKey(this.cAgeement);
    if (this.$cookies.isKey(this.cToken)) {
      const accessToken = this.$cookies.get(this.cToken);
      const decoded = JSON.parse(atob(accessToken.split(' ')[1].split('.')[1])).sub;
      Backend.getUser({ type: 'user', id: decoded }).then((user) => {
        this.$store.commit({
          type: 'signin',
          user,
          accessToken,
        });
      });
    }
  },

  methods: {
    onClickAgree() {
      this.$cookies.set(this.cAgeement, true);
      this.hasAgreement = true;
    },
  },
};
</script>
