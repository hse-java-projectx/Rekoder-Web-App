<template>
  <SingleView>
    <template #top>
      Search results for <b> '{{ query }}' </b> in
      <b>{{ location.entity }}:{{ location.id }}</b>
    </template>
    <template #content>
      <NotFound v-if="error.has" :message="error.message" />
      <HorCylon v-if="!search.recieved" />
      <div v-else>
        <div
          v-for="entity in entities"
          :key="entity.entity"
          class="my-3 my-md-4"
        >
          <div v-if="requestByEntity(entity.entity).length !== 0">
            <span class="big-font">
              <b> {{ entity.text }} </b>
            </span>
            <b-list-group class="p-2">
              <b-list-group-item
                v-for="result in requestByEntity(entity.entity)"
                :key="result.entity + result.id"
              >
                <Folder v-if="result.entity === 'folder'" :data="result" />
                <Judge v-if="result.entity === 'judge'" :data="result" />
                <Problem v-if="result.entity === 'problem'" :data="result" />
                <Submission
                  v-if="result.entity === 'submission'"
                  :data="result"
                />
                <Team v-if="result.entity === 'team'" :data="result" />
                <User v-if="result.entity === 'user'" :data="result" />
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
      </div>
    </template>
  </SingleView>
</template>
<script>
import HorCylon from '@/components/animated/HorCylon.vue';
import SingleView from '@/components/SingleView.vue';
import NotFound from '@/views/NotFound.vue';

import Folder from '@/components/entity/Folder.vue';
import Judge from '@/components/entity/Judge.vue';
import Problem from '@/components/entity/Problem.vue';
import Submission from '@/components/entity/Submission.vue';
import Team from '@/components/entity/Team.vue';
import User from '@/components/entity/User.vue';

import Backend from '@/js/backend/main';

export default {
  data() {
    return {
      query: this.parseQuery(),
      location: this.parseLocation(),
      contentTypes: this.parseContentTypes(),

      search: {
        recieved: false,
        data: null,
      },

      error: {
        has: false,
        message: null,
      },

      entities: [
        { text: 'Folders', entity: 'folder' },
        { text: 'Judges', entity: 'judge' },
        { text: 'Problems', entity: 'problem' },
        { text: 'Submissions', entity: 'submission' },
        { text: 'Teams', entity: 'team' },
        { text: 'Users', entity: 'user' },
      ],
    };
  },

  components: {
    SingleView,
    HorCylon,
    NotFound,
    Folder,
    Judge,
    Problem,
    Submission,
    Team,
    User,
  },

  created() {
    Backend.searchContent(this.query, this.contentTypes, this.location)
      .then((results) => {
        this.search = {
          recieved: true,
          data: results,
        };
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
  },

  methods: {
    parseQuery() {
      const query = decodeURIComponent(this.$route.query.query);
      return query === undefined ? null : query;
    },

    parseContentTypes() {
      if (!this.$route.query.contentType) {
        return null;
      }
      return this.$route.query.contentType.split(',');
    },

    parseLocation() {
      if (!(this.$route.params.entity && this.$route.params.id)) {
        return null;
      }
      return { entity: this.$route.params.entity, id: this.$route.params.id };
    },

    requestByEntity(entity) {
      return this.search.data.filter((e) => e.entity === entity);
    },
  },
};
</script>
<style lang="">
</style>
