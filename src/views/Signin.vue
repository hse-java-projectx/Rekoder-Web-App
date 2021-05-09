<template>
  <div>
    <SingleView>
      <template #header>
        <SubNavbar>
          <template #left> <b> Sign in </b> </template>
        </SubNavbar>
      </template>
      <template #content>
        <div class="page-item-container">
          <b-form @submit="onSubmit">
            <b-form-group label="Username" label-for="form-input-userId">
              <b-form-input
                id="form-input-userId"
                v-model="form.userId"
                placeholder="Enter userId"
                :state="validation"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password" label-for="form-input-password">
              <b-form-input
                id="form-input-password"
                v-model="form.password"
                type="password"
                placeholder="Enter password"
                :state="validation"
                required
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Sign In</b-button>
            <b-form-invalid-feedback :state="validation">
              {{ signinError }}
            </b-form-invalid-feedback>
          </b-form>
        </div>
      </template>
    </SingleView>
  </div>
</template>

<script>
import Backend from '@/js/backend/main';
import SubNavbar from '@/components/SubNavbar.vue';
import SingleView from '@/components/SingleView.vue';

export default {
  components: { SubNavbar, SingleView },
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
      Backend.getUserAccess(this.form.userId, this.form.password)
        .then((user) => {
          this.commitSignin(user);
        })
        .catch((er) => {
          this.signinError = er.toString();
          this.validation = false;
          this.onReset();
        });
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
