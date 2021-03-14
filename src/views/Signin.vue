<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group label="Username:" label-for="form-input-username">
        <b-form-input
          id="form-input-username"
          v-model="form.username"
          placeholder="Enter username"
          :state="validation"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Username:" label-for="form-input-password">
        <b-form-input
          id="form-input-password"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          :state="validation"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-form-invalid-feedback :state="validation">
        {{ signinError }}
      </b-form-invalid-feedback>
    </b-form>
  </div>
</template>

<script>
import BackendMixin from '@/mixins/backend/main';

export default {
  mixins: [BackendMixin],
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      validation: null,
      signinError: '',
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const access = this.backend.getUserAccess(this.form.username, this.form.password);
      if (access.success) {
        this.commitSignin();
        return;
      }
      this.signinError = 'Invalid username or password';
      this.validation = false;
    },

    onReset() {
      this.form.username = '';
      this.form.username = '';
    },

    commitSignin() {
      this.$store.commit('signin', this.form.username);
      this.$router.push({ path: '/' });
    },
  },
};
</script>
