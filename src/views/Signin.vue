<template>
  <div>
    <SubNavbar>
      <template #left> Sign in </template>
    </SubNavbar>
    <div class="page-item-container">
      <b-form @submit="onSubmit">
        <b-form-group label="User Id:" label-for="form-input-userId">
          <b-form-input
            id="form-input-userId"
            v-model="form.userId"
            placeholder="Enter userId"
            :state="validation"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="form-input-password">
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
  </div>
</template>

<script>
import Backend from '@/js/backend/main';
import SubNavbar from '@/components/SubNavbar.vue';

export default {
  components: { SubNavbar },
  data() {
    return {
      form: {
        userId: '',
        password: '',
      },
      validation: null,
      signinError: '',
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const access = Backend.getUserAccess(this.form.userId, this.form.password);
      if (access.success) {
        this.commitSignin(access.user);
        return;
      }
      this.signinError = 'Invalid user id or password';
      this.validation = false;
      this.onReset();
    },

    onReset() {
      this.form.userId = '';
      this.form.password = '';
    },

    commitSignin(userData) {
      this.$store.commit('signin', userData);
      this.$router.push({ path: '/' });
    },
  },
};
</script>
