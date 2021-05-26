<template>
  <div>
    <SingleView>
      <template #header>
        <b class="big-font"> Create new profile </b>
      </template>
      <template #content>
        <b-overlay :show="showOverlay" rounded="sm">
          <div class="page-item-container" :show="showOverlay">
            <b-form @submit="onSubmit">
              <b-form-group label="Username" label-for="profile-name">
                <b-form-input
                  id="profile-name"
                  v-model="form.profileName.value"
                  placeholder="Enter new username"
                  :state="form.profileName.valid"
                  autocomplete="username"
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="form.profileName.valid">
                  {{ form.profileName.invalidFeedback }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Password" label-for="password">
                <b-form-input
                  id="password"
                  v-model="form.password.value"
                  placeholder="Enter strong password"
                  :state="form.password.valid"
                  autocomplete="new-password"
                  type="password"
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="form.password.valid">
                  {{ form.password.invalidFeedback }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                label="Confirm password"
                label-for="password-confirm"
              >
                <b-form-input
                  id="password-confirm"
                  v-model="form.password.confirm"
                  placeholder="Enter same password"
                  :state="form.password.valid"
                  autocomplete="new-password"
                  type="password"
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="form.password.valid">
                  {{ form.password.invalidFeedback }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-button type="submit" variant="primary">Continue</b-button>
              <b-form-invalid-feedback :state="form.sentRequest.valid">
                {{ form.sentRequest.invalidFeedback }}
              </b-form-invalid-feedback>
            </b-form>
          </div>
        </b-overlay>
        <div class="my-3 text-secondary">
          Already have a profile? Then
          <router-link to="/signin">Sign in</router-link>
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
      showOverlay: false,
      form: {
        profileName: {
          valid: null,
          value: '',
          invalidFeedback: null,
        },
        password: {
          valid: null,
          value: '',
          confirm: '',
          invalidFeedback: null,
        },
        sentRequest: {
          valid: null,
          invalidFeedback: null,
        },
      },
    };
  },

  methods: {
    getFormValidation() {
      this.form.password.valid = null;
      this.form.profileName.valid = null;
      let allValid = true;
      if (this.form.password.value !== this.form.password.confirm) {
        this.form.password.valid = false;
        this.form.password.invalidFeedback = "Passwords didn't match";
        allValid = false;
      }
      if (this.form.password.value.length < 8) {
        this.form.password.valid = false;
        this.form.password.invalidFeedback = 'Password must contain at least 8 characters';
        allValid = false;
      }
      return allValid;
    },

    onValidForm() {
      this.form.sentRequest.valid = null;
      this.showOverlay = true;

      Backend.createProfile({ id: this.form.profileName.value, password: this.form.password.value })
        .then((user) => {
          Backend.getLoginToken({
            id: this.form.profileName.value,
            password: this.form.password.value,
          }).then((accessToken) => {
            this.$store.commit({
              type: 'signin',
              user,
              accessToken,
            });
            this.$router.push({ path: `/edit/user/${this.form.profileName.value}` });
          });
        })
        .catch((er) => {
          this.form.sentRequest.valid = false;
          this.form.sentRequest.invalidFeedback = er.toString();
        })
        .finally(() => {
          this.showOverlay = false;
        });
    },

    onSubmit(event) {
      event.preventDefault();
      if (this.getFormValidation()) {
        this.onValidForm();
      }
    },

    onReset() {
      this.form = {
        profileName: {
          valid: null,
          value: '',
          invalidFeedback: null,
        },
        password: {
          valid: null,
          value: '',
          confirm: '',
          invalidFeedback: null,
        },
        profileType: {
          value: null,
          invalidFeedback: null,
        },
      };
    },
  },
};
</script>
