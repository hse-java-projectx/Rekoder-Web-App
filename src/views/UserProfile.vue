<template>
  <div>
    <SearchLocationRegister entity="user" :id="pageProfileId" />
    <SearchEntityRegister entity="submission" />
    <SearchEntityRegister entity="problem" />
    <SearchEntityRegister entity="team" />
    <SearchEntityRegister entity="folder" />
    <b-container v-if="notSignedAndNotQualified" class="mt-4 big-font">
      Please <router-link to="/signin">sign in</router-link> to see profile
    </b-container>
    <div v-else>
      <NotFound v-if="error.has" :message="error.message" />
      <HorCylon v-if="!userRequest.recieved" />
      <ProfileLayout
        v-else
        :statRefs="processedUserInformation.statRefs"
        :contacts="processedUserInformation.contacts"
        :name="
          userRequest.data.name === null
            ? userRequest.data.id
            : userRequest.data.name
        "
        :subname="`@${userRequest.data.id}`"
        :avatarAlt="`${userRequest.data.name} profile avatar`"
        :avatarPath="userRequest.data.avatarPath"
        :bio="userRequest.data.bio"
      >
        <template #feed>
          <FeedBlock name="Archive">
            <template #content>
              <HorCylon v-if="!userRequest.recieved" />
              <ArchiveComponent
                v-else
                :showPath="false"
                :propFolderId="userRequest.data.rootFolderId.toString()"
              />
            </template>
          </FeedBlock>
          <FeedBlock name="Recent activity">
            <template #content>
              <HorCylon v-if="!activitiesRequest.recieved" />
              <ActivityFeed
                v-else
                :activities="activitiesRequest.data"
                :anon="true"
              />
            </template>
          </FeedBlock>
        </template>
        <template #undername v-if="storageIsSigned">
          <b-row>
            <b-col v-if="canEdit">
              <b-button
                variant="outline-primary"
                size="sm"
                class="w-100"
                @click.prevent="onClickEdit"
                >Edit
              </b-button>
            </b-col>
            <b-col v-if="canSignout">
              <b-button
                variant="outline-primary"
                size="sm"
                class="w-100"
                @click.prevent="onClickSignOut"
                >Sign out
              </b-button>
            </b-col>
          </b-row>
          <b-button
            v-if="canFollow"
            variant="outline-primary"
            size="sm"
            class="w-100"
            @click.prevent="onClickFollow"
            >Follow</b-button
          >
        </template>
      </ProfileLayout>
    </div>
  </div>
</template>

<script>
import ProfileLayout from '@/components/profile/ProfileLayout.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import NotFound from '@/views/NotFound.vue';
import ActivityFeed from '@/components/feed/ActivityFeed.vue';
import FeedBlock from '@/components/feed/FeedBlock.vue';
import ArchiveComponent from '@/components/ArchiveComponent.vue';
import SearchLocationRegister from '@/components/search/registers/Location.vue';
import SearchEntityRegister from '@/components/search/registers/Entity.vue';

import Backend from '@/js/backend/main';
import { mapGetters } from 'vuex';

export default {
  props: {},

  components: {
    ProfileLayout,
    HorCylon,
    NotFound,
    ActivityFeed,
    FeedBlock,
    ArchiveComponent,
    SearchLocationRegister,
    SearchEntityRegister,
  },
  data() {
    return {
      routeProfileType: this.$route.params.profileType,
      rotueProfileId: this.$route.params.userId,

      error: {
        has: false,
        message: null,
      },

      processedUserInformation: {
        statRefs: [],
        contacts: [],
      },

      activitiesRequest: {
        recieved: false,
        data: [],
      },

      directionsRequest: {
        recieved: false,
        data: null,
      },

      userRequest: {
        recieved: false,
        data: null,
      },

      canEditRequest: {
        recieved: false,
        data: null,
      },
    };
  },

  computed: {
    ...mapGetters(['storageIsSigned', 'storageUser', 'storageUserId']),

    canEdit() {
      return this.canEditRequest.recieved && this.canEditRequest.data;
    },

    canFollow() {
      return this.canEditRequest.recieved && !this.canEditRequest.data;
    },

    canSignout() {
      return this.storageIsSigned && this.storageUserId === this.pageProfileId;
    },

    notSignedAndNotQualified() {
      return (
        (this.rotueProfileId === null || this.rotueProfileId === undefined) && !this.storageIsSigned
      );
    },

    pageProfileType() {
      return this.routeProfileType === undefined || this.routeProfileType === null
        ? 'user'
        : this.routeProfileType;
    },

    pageProfileId() {
      return this.rotueProfileId === null || this.rotueProfileId === undefined
        ? this.storageUserId
        : this.rotueProfileId;
    },
  },

  methods: {
    onClickEdit() {
      this.$router.push({ path: `/edit/${this.pageProfileType}/${this.pageProfileId}` });
    },

    onClickFollow() {},

    onClickSignOut() {
      this.$store.commit('signout');
      this.$router.push({ path: '/signin' });
    },

    validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
  },

  created() {
    if (this.notSignedAndNotQualified) {
      return;
    }
    Backend.getUserActivity(this.pageProfileId)
      .then((feed) => {
        this.activitiesRequest = {
          recieved: true,
          data: feed,
        };
      })
      .catch((err) => {
        this.error = {
          has: true,
          message: err.toString(),
        };
      });
    Backend.getUser({ id: this.pageProfileId, type: this.pageProfileType })
      .then((user) => {
        this.userRequest = {
          recieved: true,
          data: { ...user },
        };
        if (this.pageProfileType === 'user') {
          Backend.getUserTeams(user.id).then((userTeams) => {
            this.processedUserInformation.statRefs.push(
              {
                name: 'following',
                num: user.following.length,
                ref: `/following/${this.pageProfileId}`,
              },
              {
                name: 'followers',
                num: user.followers.length,
                ref: `/followers/${this.pageProfileId}`,
              },
              {
                name: 'teams',
                num: userTeams.length,
                ref: `/teams/${this.pageProfileId}`,
              },
            );
            Object.keys(user.contacts).forEach((contact) => {
              let short = user.contacts[contact].ref;
              let { ref } = user.contacts[contact];
              if (this.validateEmail(ref)) {
                short = ref;
                ref = `mailto:${ref}`;
              } else {
                const parts = ref.split('/');
                short = `@${parts[parts.length - 1]}`;
              }
              this.processedUserInformation.contacts.push({
                name: user.contacts[contact].name,
                ref,
                short,
              });
            });
          });
        } else if (this.pageProfileType === 'team') {
          this.processedUserInformation.statRefs.push({
            name: user.memberIds.length === 1 ? 'member' : 'members',
            num: user.memberIds.length,
            ref: `/team-members/${this.pageProfileId}`,
          });
        }
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
    Backend.canEdit(this.storageUserId, {
      id: this.pageProfileId,
      type: this.pageProfileType,
    })
      .then((can) => {
        this.canEditRequest = {
          recieved: true,
          data: can,
        };
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
  },
};
</script>
