<template>
  <div>
    <HorCylon v-if="!userRequest.recieved" />
    <div v-else>
      <!-- Name -->
      <b-form @submit="onFormSubmit">
        <b-form-group label="Name" label-cols-sm="2">
          <b-form-input
            trim
            v-model="form.name.value"
            placeholder="Enter your name"
            :state="form.name.valid"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="form.name.valid">
            {{ form.name.feedback }}
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Avatar -->
        <b-form-group label="Profile avatar" label-cols-sm="2">
          <b-form-file
            v-model="form.avatarPath.value"
            :state="form.avatarPath.valid"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          />
          <b-button variant="outline-danger" class="mt-2" size="sm">
            Delete avatar
          </b-button>
        </b-form-group>

        <!-- Origin -->
        <b-form-group label="Actual page" label-cols-sm="2">
          <b-form-input
            trim
            v-model="form.origin.value"
            placeholder="Insert link to the actual judge"
            :state="form.origin.valid"
            type="url"
          ></b-form-input>
          <b-form-invalid-feedback :state="form.origin.valid">
            {{ form.origin.feedback }}
          </b-form-invalid-feedback>
        </b-form-group>

        <br />

        <b-button type="submit" variant="success"> Save changes </b-button>
        <b-form-valid-feedback :state="form.submitRequest.valid">
          {{ form.submitRequest.feedback }}
        </b-form-valid-feedback>
        <b-form-invalid-feedback :state="form.submitRequest.valid">
          {{ form.submitRequest.feedback }}
        </b-form-invalid-feedback>
      </b-form>
    </div>
  </div>
</template>
<script>
import Backend from '@/js/backend/main';

import HorCylon from '@/components/animated/HorCylon.vue';

export default {
  components: { HorCylon },

  props: {
    systemId: String,
  },

  data() {
    return {
      form: {
        name: {
          value: null,
          valid: null,
          feedback: null,
        },

        avatarPath: {
          value: null,
          valid: null,
          feedback: null,
          path: null,
        },

        origin: {
          value: null,
          valid: null,
          feedback: null,
        },

        submitRequest: {
          recieved: false,
          valid: null,
          feedback: null,
        },
      },

      userRequest: {
        recieved: false,
        user: null,
      },
    };
  },

  created() {
    Backend.getUser(this.systemId, 'judge')
      .then((user) => {
        this.userRequest = {
          recieved: true,
          user,
        };
        this.form.name.value = user.name;
        this.form.avatarPath.path = user.avatarPath;
        this.form.origin.value = user.bio;
      })
      .catch((er) => {
        this.$emit('editError', er);
      });
  },

  methods: {
    getFormValidation() {
      return true;
    },

    onFormValid() {
      this.form.submitRequest = {
        recieved: false,
        valid: null,
        feedback: null,
      };
      Backend.editProfile('judge', this.systemId, {
        name: this.form.name.value,
        avatarPath: this.form.avatarPath.path,
        origin: this.form.origin.value,
      })
        .then(() => {
          this.form.submitRequest = {
            recieved: true,
            valid: true,
            feedback: 'All changes has been saved',
          };
        })
        .catch((er) => {
          this.form.submitRequest = {
            recieved: true,
            valid: false,
            feedback: er.toString(),
          };
        });
    },

    onFormSubmit(event) {
      event.preventDefault();
      if (this.getFormValidation()) {
        this.onFormValid();
      }
    },
  },
};
</script>
