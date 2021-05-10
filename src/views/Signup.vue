<template>
  <div>
    <SingleView>
      <template #header>
        <b class="big-font"> Create new profile </b>
      </template>
      <template #content>
        <div class="page-item-container">
          <b-form @submit="onSubmit">
            <b-form-group label="Profile Name" label-for="profile-name">
              <b-form-input
                id="profile-name"
                v-model="form.profileName.value"
                placeholder="Enter new profile name"
                :state="form.profileName.valid"
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
                type="password"
                required
              ></b-form-input>
              <b-form-invalid-feedback :state="form.password.valid">
                {{ form.password.invalidFeedback }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Confirm password" label-for="password-confirm">
              <b-form-input
                id="password-confirm"
                v-model="form.password.confirm"
                placeholder="Enter same password"
                :state="form.password.valid"
                type="password"
                required
              ></b-form-input>
              <b-form-invalid-feedback :state="form.password.valid">
                {{ form.password.invalidFeedback }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Profile type" label-for="profile-type">
              <b-form-select
                id="profile-type"
                v-model="form.profileType.value"
                :options="profileOptions"
                :state="form.profileType.valid"
                required
              />
              <b-form-invalid-feedback :state="form.profileType.valid">
                {{ form.profileType.invalidFeedback }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" variant="primary">Continue</b-button>
            <b-form-invalid-feedback :state="form.sentRequest.valid">
              {{ form.sentRequest.invalidFeedback }}
            </b-form-invalid-feedback>
          </b-form>
          <div class="my-3 text-secondary">
            Already have a profile? Then
            <router-link to="/signin">Sign in</router-link>
          </div>
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
          valid: null,
          invalidFeedback: null,
        },
        sentRequest: {
          valid: null,
          invalidFeedback: null,
        },
      },

      profileOptions: [
        { value: null, text: 'Select profile type' },
        { value: 'user', text: 'Personal profile' },
        { value: 'team', text: 'Team' },
        { value: 'system', text: 'Judge Mirror' },
      ],
    };
  },

  methods: {
    getFormValidation() {
      this.form.password.valid = null;
      this.form.profileName.valid = null;
      this.form.profileType.valid = null;
      let allValid = true;
      if (this.form.password.value !== this.form.password.confirm) {
        this.form.password.valid = false;
        this.form.password.invalidFeedback = 'Passwords does not match';
        allValid = false;
      }
      if (this.form.password.value.length < 6) {
        this.form.password.valid = false;
        this.form.password.invalidFeedback = 'Password must contain at least 6 characters';
        allValid = false;
      }
      if (this.form.profileType.value === null) {
        this.form.profileType.valid = false;
        this.form.profileType.invalidFeedback = 'Select profile type';
        allValid = false;
      }
      return allValid;
    },

    onValidForm() {
      this.form.sentRequest.valid = null;
      Backend.createProfile({
        name: this.form.profileName.value,
        type: this.form.profileType.value,
        password: this.form.password.value,
      })
        .then((profile) => {
          this.$store.commit('signin', profile);
          this.$router.push({ path: `/profile-edit/${profile.id}` });
        })
        .catch((er) => {
          this.form.sentRequest.valid = false;
          this.form.sentRequest.invalidFeedback = er.toString();
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
