<template>
  <div>
    <SearchRegister entity="user" />
    <SearchLocationRegister entity="team" :id="routeUserId" />
    <SingleView>
      <template #header>
        <b class="big-font"> Team Members </b>
      </template>
      <template #content>
        <HorCylon v-if="!teamMembersRequest.recieved" />
        <NotFound v-else-if="error.hasError" :message="error.message" />
        <NothingToShow
          v-else-if="teamMembersRequest.data.length === 0"
          message="Teams list is empty"
        />
        <b-list-group v-else>
          <b-list-group-item
            v-for="member in teamMembersRequest.data"
            :key="member.id"
          >
            <UserEntity :data="member" />
          </b-list-group-item>
        </b-list-group>
      </template>
    </SingleView>
  </div>
</template>
<script>
import Backend from '@/js/backend/main';
import UserEntity from '@/components/entity/User.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import SingleView from '@/components/SingleView.vue';
import NotFound from '@/views/NotFound.vue';
import NothingToShow from '@/components/NothingToShow.vue';
import SearchRegister from '@/components/search/registers/Entity.vue';
import SearchLocationRegister from '@/components/search/registers/Location.vue';

export default {
  data() {
    return {
      routeUserId: this.$route.params.teamId,
      teamMembersRequest: {
        recieved: false,
        data: null,
      },
      error: {
        hasError: false,
        error: null,
      },
    };
  },

  components: {
    UserEntity,
    HorCylon,
    SingleView,
    NotFound,
    NothingToShow,
    SearchRegister,
    SearchLocationRegister,
  },

  created() {
    Backend.getTeamMembers(this.routeUserId)
      .then((members) => {
        this.teamMembersRequest = {
          recieved: true,
          data: { ...members },
        };
      })
      .catch(() => {
        this.error = {
          hasError: true,
          error: `Unable to get members of team with id ${this.routeUserId}`,
        };
      });
  },
};
</script>
<style lang="sass">
</style>
