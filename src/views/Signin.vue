<template>
  <div>
    <SingleView>
      <template #header>
        <b class="big-font"> Sign in </b>
      </template>
      <template #content>
        <b-overlay :show="showOverlay" rounded="sm">
          <div class="page-item-container">
            <b-form @submit="onSubmit">
              <b-form-group label="Username">
                <b-form-input
                  v-model="form.userId"
                  placeholder="Enter username"
                  :state="validation"
                  autocomplete="username"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Password">
                <b-form-input
                  v-model="form.password"
                  type="password"
                  placeholder="Enter password"
                  :state="validation"
                  autocomplete="current-password"
                  required
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Sign In</b-button>
              <b-form-invalid-feedback :state="validation">
                {{ signinError }}
              </b-form-invalid-feedback>
            </b-form>
          </div>
        </b-overlay>
        <div class="my-3 text-secondary">
          Don't have a profile yet? Create one on
          <router-link to="/signup">Sign up</router-link> page
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
      showOverlay: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // eslint-disable-next-line no-param-reassign
      vm.prevRoute = from;
      if (from.name === null) {
        // eslint-disable-next-line no-param-reassign
        vm.prevRoute = { path: '/profile' };
      }
    });
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.showOverlay = true;
      Backend.getLoginToken({ id: this.form.userId, password: this.form.password })
        .then((accessToken) => {
          Backend.getUser({ id: this.form.userId, type: 'user' }).then((user) => {
            this.commitSignin(user, accessToken);
          });
        })
        .catch((er) => {
          this.signinError = er.toString();
          this.validation = false;
          this.onReset();
        })
        .finally(() => {
          this.showOverlay = false;
        });
    },

    onReset() {
      this.form.userId = '';
      this.form.password = '';
      this.form.profileType = null;
    },

    commitSignin(user, accessToken) {
      // console.log('Commiting signin', user, accessToken);
      this.$store.commit({
        type: 'signin',
        accessToken,
        user,
      });
      try {
        this.$router.push({ path: this.prevRoute.path });
      } catch (e) {
        this.$router.push({ path: '/profile' });
      }
    },
  },
};
</script>
