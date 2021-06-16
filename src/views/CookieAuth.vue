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
export default {
  data() {
    return {
      cToken: 'rekoder-access-token',
      cAgeement: 'rekoder-cookie-agreement',
      cUser: 'rekoder-user',
      hasAgreement: null,
    };
  },

  created() {
    this.hasAgreement = this.$cookies.isKey(this.cAgeement);
    if (this.$cookies.isKey(this.cToken) && this.$cookies.isKey(this.cUser)) {
      const accessToken = this.$cookies.get(this.cToken);
      const user = this.$cookies.get(this.cUser);
      this.$store.commit({
        type: 'signin',
        user,
        accessToken,
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
