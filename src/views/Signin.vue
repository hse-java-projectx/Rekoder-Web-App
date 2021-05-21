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
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Password">
                <b-form-input
                  v-model="form.password"
                  type="password"
                  placeholder="Enter password"
                  :state="validation"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Profile type">
                <b-form-select
                  v-model="form.profileType"
                  :options="profileOptions"
                  :state="validation"
                  required
                />
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
        profileType: null,
      },
      validation: null,
      signinError: '',
      prevRoute: { path: '/' },

      profileOptions: [
        { value: null, text: 'Select profile type' },
        { value: 'user', text: 'Personal profile' },
        { value: 'team', text: 'Team' },
        { value: 'system', text: 'Judge Mirror' },
      ],

      showOverlay: false,
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
      this.showOverlay = true;
      Backend.getUserAccess(this.form.profileType, this.form.userId, this.form.password)
        .then((user) => {
          this.showOverlay = false;
          this.commitSignin(user);
        })
        .catch((er) => {
          this.showOverlay = false;
          this.signinError = er.toString();
          this.validation = false;
          this.onReset();
        });
    },

    onReset() {
      this.form.userId = '';
      this.form.password = '';
      this.form.profileType = null;
    },

    commitSignin(userData) {
      this.$store.commit({
        type: 'signin',
        profileType: this.form.profileType,
        id: this.form.userId,
        data: userData,
      });
      this.$router.push({ path: this.prevRoute.path });
    },
  },
};
</script>
