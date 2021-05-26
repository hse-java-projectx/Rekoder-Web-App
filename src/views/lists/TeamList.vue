<template>
  <div>
    <SearchRegister entity="user" />
    <SearchLocationRegister entity="user" :id="routeUserId" />
    <SingleView>
      <template #header>
        <b-row>
          <b-col>
            <b class="big-font"> Teams </b>
          </b-col>
          <b-col cols="auto" v-if="canCreateTeam" class="text-right">
            <b-button
              pill
              variant="link"
              size="sm"
              class="w-auto"
              @click.prevent="onClickCreateTeam"
            >
              Create new team <b-icon icon="plus" />
            </b-button>
          </b-col>
        </b-row>
      </template>
      <template #content>
        <HorCylon v-if="!teams.recieved" />
        <NotFound v-else-if="error.hasError" :message="error.message" />
        <NothingToShow
          v-else-if="teams.data.length === 0"
          message="Teams list is empty"
        />
        <b-list-group v-if="teams.recieved">
          <b-form
            v-if="newTeam.showInput"
            class="my-2 mx-1"
            @reset.prevent="onResetNewTeam"
            @submit.prevent="onSubmitNewTeam"
          >
            <b-input-group>
              <template #prepend>
                <b-button
                  type="reset"
                  variant="outline-danger"
                  size="sm"
                  :disabled="newTeam.submitted"
                >
                  <b-icon icon="x" />
                </b-button>
              </template>
              <b-form-input
                size="sm"
                autocomplete="teamid"
                v-model="newTeam.id"
                :state="newTeam.valid"
                :disabled="newTeam.submitted"
              />
              <template #append>
                <b-button
                  type="submit"
                  variant="outline-success"
                  size="sm"
                  :disabled="newTeam.submitted"
                >
                  Add
                </b-button>
              </template>
            </b-input-group>
            <b-form-invalid-feedback :state="newTeam.valid">
              {{ newTeam.feedback }}
            </b-form-invalid-feedback>
          </b-form>
          <b-list-group-item v-for="team in teams.data" :key="team.id">
            <Team :data="team" />
          </b-list-group-item>
        </b-list-group>
      </template>
    </SingleView>
  </div>
</template>
<script>
import Backend from '@/js/backend/main';
import Team from '@/components/entity/Team.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import SingleView from '@/components/SingleView.vue';
import NotFound from '@/views/NotFound.vue';
import NothingToShow from '@/components/NothingToShow.vue';
import { mapGetters } from 'vuex';
import SearchRegister from '@/components/search/registers/Entity.vue';
import SearchLocationRegister from '@/components/search/registers/Location.vue';

export default {
  data() {
    return {
      routeUserId: this.$route.params.userId,
      teams: {
        recieved: false,
        data: [],
      },
      error: {
        hasError: false,
        error: null,
      },
      newTeam: {
        showInput: false,
        submitted: false,
        id: null,
        feedback: null,
        valid: null,
      },
    };
  },

  components: {
    Team,
    HorCylon,
    SingleView,
    NotFound,
    NothingToShow,
    SearchRegister,
    SearchLocationRegister,
  },

  methods: {
    onClickCreateTeam() {
      this.newTeam.showInput = true;
    },

    onResetNewTeam() {
      this.newTeam.feedback = null;
      this.newTeam.id = null;
      this.newTeam.showInput = false;
      this.newTeam.valid = null;
    },

    onSubmitNewTeam() {
      if (!this.newTeam.id) {
        this.newTeam.valid = false;
        this.newTeam.feedback = 'Empty team name';
        return;
      }
      this.newTeam.submitted = true;
      Backend.createTeam(this.newTeam.id, this.storageAccessToken)
        .then(() => {
          this.$router.push({
            path: `/edit/team/${this.newTeam.id}`,
          });
        })
        .catch((er) => {
          this.newTeam.feedback = er.toString();
          this.newTeam.valid = false;
        })
        .finally(() => {
          this.newTeam.submitted = false;
        });
    },
  },

  created() {
    Backend.getUserTeams(this.routeUserId)
      .then((teams) => {
        this.teams = {
          recieved: true,
          data: teams,
        };
      })
      .catch(() => {
        this.error = {
          hasError: true,
          error: `Unable to get teams list of user with id ${this.routeUserId}`,
        };
      });
  },

  computed: {
    ...mapGetters(['storageUserId', 'storageIsSigned', 'storageUser', 'storageAccessToken']),

    canCreateTeam() {
      return this.routeUserId === this.storageUserId;
    },
  },
};
</script>
<style lang="sass">
</style>
