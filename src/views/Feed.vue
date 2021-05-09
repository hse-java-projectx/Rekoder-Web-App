<template>
  <div>
    <SingleView>
      <template #header v-if="!isSigned">
        Please <router-link to="/signin">sign in</router-link> to see feed
      </template>
      <template #content v-if="isSigned">
        <HorCylon v-if="!activities.recieved && !error.has" />
        <NotFound v-else-if="error.has" :message="error.message" />
        <ActivityFeed v-else :activities="activities.data" :anon="false" />
      </template>
    </SingleView>
  </div>
</template>

<script>
import SingleView from '@/components/SingleView.vue';
import ActivityFeed from '@/components/feed/ActivityFeed.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import NotFound from '@/views/NotFound.vue';

import Backend from '@/js/backend/main';
import { mapGetters } from 'vuex';

export default {
  name: 'Feed',

  components: {
    SingleView,
    ActivityFeed,
    HorCylon,
    NotFound,
  },

  computed: {
    ...mapGetters(['isSigned', 'userid']),
  },

  data() {
    return {
      activities: {
        recieved: false,
        data: null,
      },

      error: {
        has: false,
        message: null,
      },
    };
  },
  created() {
    Backend.getUserFeed(this.userid)
      .then((feed) => {
        this.activities = {
          recieved: true,
          data: feed,
        };
      })
      .catch((err) => {
        this.error = {
          has: true,
          message: err,
        };
      });
  },
};
</script>
