<template>
  <div>
    <HorCylon v-if="!teamRequest.recieved" />
    <div v-else>
      <b-form @submit="onFormSubmit">
        <!-- Name -->
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

        <!-- Bio -->
        <b-form-group label="Bio" label-cols-sm="2">
          <b-form-input
            trim
            v-model="form.bio.value"
            placeholder="Tell about your team"
            :state="form.bio.valid"
          ></b-form-input>
          <b-form-invalid-feedback :state="form.bio.valid">
            {{ form.bio.feedback }}
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Members -->
        <div>
          <p>Team members</p>
          <b-list-group>
            <b-list-group-item
              v-for="(memberId, index) in form.members.value"
              :key="index"
            >
              <b-row>
                <b-col cols="auto" class="my-auto pr-0">
                  <b-button
                    variant="outline-danger"
                    size="sm"
                    class="rounded-circle"
                    @click.prevent="onClickRemoveMember(memberId)"
                  >
                    <b-icon icon="x" scale="1.3" />
                  </b-button>
                </b-col>
                <b-col class="my-auto">
                  <span>{{ memberId }}</span>
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item>
              <b-row>
                <b-col cols="auto" class="my-auto pr-0">
                  <b-button
                    variant="outline-success"
                    size="sm"
                    class="rounded-circle"
                    @click.prevent="onClickAddMember"
                  >
                    <b-icon icon="plus" scale="1.3" />
                  </b-button>
                </b-col>
                <b-col cols="6" md="4" class="my-auto pr-0">
                  <Search :contentTypes="['user']" :result="form.newMember" />
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
          <b-form-invalid-feedback :state="form.members.valid">
            {{ form.members.feedback }}
          </b-form-invalid-feedback>
        </div>

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
import Search from '@/components/search/SearchInput.vue';

export default {
  components: { HorCylon, Search },

  props: {
    teamId: String,
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

        bio: {
          value: null,
          valid: null,
          feedback: null,
        },

        members: {
          value: null,
          valid: null,
          feedback: null,
        },

        newMember: {
          valid: null,
          value: null,
        },

        submitRequest: {
          recieved: false,
          valid: null,
          feedback: null,
        },
      },

      teamRequest: {
        recieved: false,
        user: null,
      },
    };
  },

  created() {
    Backend.getUser('team', this.teamId)
      .then((team) => {
        this.teamRequest = {
          recieved: true,
          team,
        };
        this.form.name.value = team.name;
        this.form.avatarPath.path = team.avatarPath;
        this.form.bio.value = team.bio;
        this.form.members.value = [];
        team.members.forEach((memberId) => {
          this.form.members.value.push(memberId);
        });
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
      Backend.editProfile('team', this.teamId, {
        name: this.form.name.value,
        avatarPath: this.form.avatarPath.path,
        bio: this.form.bio.value,
        membersId: this.form.members.value,
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

    onClickRemoveMember(memberName) {
      const index = this.form.members.value.indexOf(memberName);
      this.form.members.value.splice(index, 1);
    },

    onClickAddMember() {
      if (this.form.newMember.valid) {
        const newMember = this.form.newMember.value;
        this.form.newMember.value = {};
        this.form.newMember.valid = false;
        this.form.members.value.push(newMember.id);
      }
    },
  },
};
</script>
