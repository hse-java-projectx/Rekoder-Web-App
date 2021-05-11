<template>
  <div>
    <SplitView>
      <template #header>
        <NotFound v-if="error.has" :message="error.message" />
      </template>
      <template #subheader>
        <div class="big-font">
          <HorCylon v-if="!path.recieved" />
          <HeaderPath v-else :path="path.data" />
        </div>
      </template>
      <template #content>
        <div class="page-item-container">
          <b-row>
            <b-col v-if="isFolderEditable" cols="auto" class="mr-auto">
              <b-button v-b-modal.modal-create-problem size="sm" variant="link">
                <b-icon icon="file-earmark-plus" />
                Problem
              </b-button>
              <b-button v-b-modal.modal-create-folder size="sm" variant="link">
                <b-icon icon="folder-plus" />
                Folder
              </b-button>
            </b-col>
          </b-row>
          <hr class="mt-1 w-100" />
          <HorCylon v-if="!directions.recieved" />
          <NothingToShow
            v-else-if="directions.data.length === 0"
            message="This folder is empty"
          />
          <b-list-group v-else>
            <DirectoryItem
              v-for="item in directions.data"
              :key="item.link"
              :name="item.name"
              :isDirectory="item.isDirectory"
              :link="item.link"
              :solved="item.solved"
            ></DirectoryItem
          ></b-list-group>
        </div>
      </template>
      <template #additional>
        <ProfileCardLayout :userId="routeUserId" />
      </template>
    </SplitView>
    <div v-if="folder.recieved">
      <b-modal
        id="modal-create-problem"
        ref="modal-create-problem"
        title="Create New Problem"
        @show="resetModalProblem"
        @hidden="resetModalProblem"
        @ok="handleOkProblem"
      >
        <form
          ref="form-create-problem"
          @submit.stop.prevent="handleSubmitProblem"
        >
          <b-form-group
            label-for="problem-name-input"
            :state="newProblem.state"
          >
            <b-form-input
              id="problem-name-input"
              v-model="newProblem.name"
              :state="newProblem.state"
              placeholder="Problem name"
              required
            />
            <b-form-invalid-feedback :state="newProblem.state">
              {{ newProblem.invalidFeedback }}
            </b-form-invalid-feedback>
          </b-form-group>
        </form>
      </b-modal>
      <b-modal
        id="modal-create-folder"
        ref="modal-create-folder"
        title="Create New Folder"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form-create-folder" @submit.stop.prevent="handleSubmit">
          <b-form-group label-for="folder-name-input" :state="newFolder.state">
            <b-form-input
              id="folder-name-input"
              v-model="newFolder.name"
              :state="newFolder.state"
              placeholder="Folder name"
              required
            />
            <b-form-invalid-feedback :state="newFolder.state">
              {{ newFolder.invalidFeedback }}
            </b-form-invalid-feedback>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Backend from '@/js/backend/main';
import { mapGetters } from 'vuex';

import DirectoryItem from '@/components/archive/DirectoryItem.vue';
import HeaderPath from '@/components/HeaderPath.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import SplitView from '@/components/SplitView.vue';
import ProfileCardLayout from '@/components/profile/ProfileCardLayout.vue';
import NotFound from '@/views/NotFound.vue';
import NothingToShow from '@/components/NothingToShow.vue';

export default {
  name: 'Archive',
  data() {
    return {
      routeUserId: this.$route.params.userId,
      routeFolderId: this.$route.params.folderId,
      path: {
        recieved: false,
        data: [],
      },
      directions: {
        recieved: false,
        data: [],
      },
      folder: {
        recieved: false,
        data: null,
      },
      newFolder: {
        name: '',
        state: null,
        invalidFeedback: '',
      },
      newProblem: {
        name: '',
        state: null,
        invalidFeedback: '',
      },
      error: {
        has: false,
        message: null,
      },

      requestIsEditable: {
        recieved: false,
        data: null,
      },
    };
  },
  components: {
    DirectoryItem,
    HeaderPath,
    HorCylon,
    SplitView,
    ProfileCardLayout,
    NotFound,
    NothingToShow,
  },

  created() {
    this.getPathToRoot()
      .then((path) => {
        this.path = {
          recieved: true,
          data: path,
        };
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
    this.getDirections()
      .then((dirs) => {
        this.directions = {
          recieved: true,
          data: dirs,
        };
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
    Backend.getFolder(this.routeFolderId)
      .then((folder) => {
        this.folder = {
          recieved: true,
          data: folder,
        };
        this.folderPrivacy = folder.privacy;
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
    Backend.canEdit(this.userid, this.routeUserId)
      .then((val) => {
        this.requestIsEditable = {
          recieved: true,
          data: val,
        };
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
  },

  computed: {
    ...mapGetters(['userid']),

    isFolderEditable() {
      return this.requestIsEditable.recieved && this.requestIsEditable.data;
    },
  },

  methods: {
    async getPathToRoot() {
      const result = [];
      const pathToRoot = await Backend.getPathToRoot(this.routeFolderId);
      pathToRoot.forEach((folder) => {
        result.push({
          name: folder.name,
          link: `/profile/${this.routeUserId}/archive/${folder.id}`,
        });
      });
      return result;
    },

    async getDirections() {
      const dirs = [];
      const folderContent = await Backend.getFolderContent(this.routeUserId, this.routeFolderId);
      this.folder = {
        recieved: true,
        data: folderContent,
      };
      this.folderPrivacy = folderContent.privacy;
      folderContent.forEach((dir) => {
        dirs.push({
          name: dir.name,
          isDirectory: dir.isDirectory,
          solved: dir.solved,
          link: dir.isDirectory
            ? `/profile/${this.routeUserId}/archive/${dir.id}`
            : `/profile/${this.routeUserId}/problem/${dir.id}/?view=statement`,
        });
      });
      return dirs;
    },

    checkFormValidity() {
      let valid = this.$refs['form-create-folder'].checkValidity();
      if (!valid) {
        this.newFolder.invalidFeedback = 'Folder name cannot be empty';
      }
      this.directions.data.forEach((item) => {
        if (item.isDirectory && item.name === this.newFolder.name) {
          valid = false;
          this.newFolder.invalidFeedback = 'Folder name can not be a duplicate';
        }
      });
      this.newFolder.state = valid;
      return valid;
    },
    resetModal() {
      this.newFolder = {
        name: '',
        state: null,
      };
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    async handleSubmit() {
      this.checkFormValidity();
      if (!this.checkFormValidity()) {
        return;
      }
      Backend.createFolder(this.folder.data.id, this.newFolder.name)
        .then(() => {
          this.$nextTick(() => {
            this.$bvModal.hide('modal-create-folder');
          });
          this.directions = {
            recieved: false,
            data: [],
          };
          this.getDirections()
            .then((dirs) => {
              this.directions = {
                recieved: true,
                data: dirs,
              };
            })
            .catch((er) => {
              this.error = {
                has: true,
                message: er.toString(),
              };
            });
        })
        .catch((er) => {
          this.newFolder.state = false;
          this.newFolder.invalidFeedback = er.toString();
        });
    },

    checkFormValidityProblem() {
      const valid = this.$refs['form-create-problem'].checkValidity();
      this.newProblem.state = valid;
      if (!valid) {
        this.newProblem.invalidFeedback = 'Problem name cannot be empty';
      }
      return valid;
    },
    resetModalProblem() {
      this.newProblem = {
        name: '',
        state: null,
      };
    },
    handleOkProblem(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitProblem();
    },
    async handleSubmitProblem() {
      if (!this.checkFormValidityProblem()) {
        return;
      }
      Backend.addEmptyProblem(this.routeUserId, this.routeFolderId, this.newProblem.name)
        .then((id) => {
          this.$nextTick(() => {
            this.$bvModal.hide('modal-create-folder');
          });
          this.$router.push({ path: `/profile/${this.routeUserId}/problem-edit/${id}` });
        })
        .catch((er) => {
          this.newProblem.state = false;
          this.newProblem.invalidFeedback = er.toString();
        });
    },
  },
};
</script>

<style lang="sass" scoped>
@import "@/style/bootstrap-custom.scss"
@import "@/../node_modules/bootstrap/scss/bootstrap.scss"
</style>
