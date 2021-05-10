<template>
  <div>
    <SingleView>
      <template #header>
        <b class="big-font"> Create new profile </b>
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
import SingleView from '@/components/SingleView.vue';

export default {
  components: { SingleView },
  data() {
    return {
      form: {
        userId: '',
        password: '',
      },
      validation: null,
      signinError: '',
      prevRoute: { path: '/' },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // eslint-disable-next-line no-param-reassign
      vm.prevRoute = from;
    });
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
      this.$router.push({ path: this.prevRoute.path });
    },
  },
};
</script>
