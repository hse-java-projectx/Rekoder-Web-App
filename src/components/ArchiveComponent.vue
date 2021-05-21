<template>
  <div>
    <NotFound v-if="error.has" :message="error.message" />
    <div v-if="showPath" class="big-font">
      <HorCylon v-if="!path.recieved" />
      <HeaderPath v-else :path="path.data" />
      <br />
    </div>
    <b-row>
      <b-col cols="12" :md="foldersShow.cols" :class="foldersShow.type">
        <div class="page-item-container">
          <b-row>
            <b-col cols="auto" class="mr-auto">
              <span class="text-dark"> Folders </span>
            </b-col>
            <b-col cols="auto" v-if="isFolderEditable">
              <b-button
                @click.prevent="onClickCreateFolder"
                size="sm"
                variant="link"
              >
                <b-icon icon="folder-plus" />
              </b-button>
            </b-col>
          </b-row>
          <hr class="mt-1 w-100" />
          <HorCylon v-if="!subfolders.recieved" />
          <b-list-group v-else>
            <b-form
              v-if="newFolder.showInput"
              class="my-2"
              @reset.prevent="onResetNew('newFolder')"
              @submit.prevent="
                onSubmitNew('newFolder', 'createFolder', 'subfolders')
              "
            >
              <b-input-group>
                <template #prepend>
                  <b-button
                    type="reset"
                    variant="outline-danger"
                    size="sm"
                    :disabled="submittedNewFolder"
                  >
                    <b-icon icon="x" />
                  </b-button>
                </template>
                <b-form-input
                  size="sm"
                  autocomplete="off"
                  v-model="newFolder.name"
                  :state="newFolder.valid"
                  :disabled="submittedNewFolder"
                />
                <template #append>
                  <b-button
                    type="submit"
                    variant="outline-success"
                    size="sm"
                    :disabled="submittedNewFolder"
                  >
                    Add
                  </b-button>
                </template>
              </b-input-group>
              <b-form-invalid-feedback :state="newFolder.valid">
                {{ newFolder.feedback }}
              </b-form-invalid-feedback>
            </b-form>
            <NothingToShow
              v-if="subfolders.data.length === 0 && !newFolder.showInput"
              message="No nested folders"
            />
            <DirectoryItem
              v-else
              v-for="item in subfolders.data"
              :key="item.id"
              :name="item.name"
              :isDirectory="true"
              :link="`/archive/${item.id}`"
            />
          </b-list-group>
        </div>
      </b-col>
      <b-col cols="12" :md="problemsShow.cols" :class="problemsShow.type">
        <div class="page-item-container">
          <b-row>
            <b-col cols="auto" class="mr-auto">
              <span class="text-dark"> Problems </span>
            </b-col>
            <b-col cols="auto" v-if="isFolderEditable">
              <b-button
                @click.prevent="onClickCreateProblem"
                size="sm"
                variant="link"
              >
                <b-icon icon="file-earmark-plus" />
              </b-button>
            </b-col>
          </b-row>
          <hr class="mt-1 w-100" />
          <HorCylon v-if="!problems.recieved" />
          <b-list-group v-else>
            <b-form
              v-if="newProblem.showInput"
              class="my-2"
              @reset.prevent="onResetNew('newProblem')"
              @submit.prevent="
                onSubmitNew('newProblem', 'createProblem', 'newProblem')
              "
            >
              <b-input-group>
                <template #prepend>
                  <b-button
                    type="reset"
                    variant="outline-danger"
                    size="sm"
                    :disabled="newProblem.submitted"
                  >
                    <b-icon icon="x" />
                  </b-button>
                </template>
                <b-form-input
                  size="sm"
                  autocomplete="off"
                  v-model="newProblem.name"
                  :state="newProblem.valid"
                  :disabled="newProblem.submitted"
                />
                <template #append>
                  <b-button
                    type="submit"
                    variant="outline-success"
                    size="sm"
                    :disabled="newProblem.submitted"
                  >
                    Add
                  </b-button>
                </template>
              </b-input-group>
              <b-form-invalid-feedback :state="newProblem.valid">
                {{ newProblem.feedback }}
              </b-form-invalid-feedback>
            </b-form>
            <NothingToShow
              v-if="problems.data.length === 0 && !newProblem.showInput"
              message="No problems here"
            />
            <DirectoryItem
              v-else
              v-for="item in problems.data"
              :key="item.id"
              :name="item.name"
              :isDirectory="false"
              :link="`/problem/${item.id}`"
            />
          </b-list-group>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Backend from '@/js/backend/main';
import { mapGetters } from 'vuex';

import DirectoryItem from '@/components/archive/DirectoryItem.vue';
import HeaderPath from '@/components/HeaderPath.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import NotFound from '@/views/NotFound.vue';
import NothingToShow from '@/components/NothingToShow.vue';

export default {
  props: {
    showPath: Boolean,
    propFolderId: String,
  },

  data() {
    return {
      routeFolderId: this.$route.params.folderId,
      path: {
        recieved: false,
        data: [],
      },
      subfolders: {
        recieved: false,
        data: null,
      },
      problems: {
        recieved: false,
        data: null,
      },
      folder: {
        recieved: false,
        data: null,
      },

      error: {
        has: false,
        message: null,
      },

      requestIsEditable: {
        recieved: false,
        data: null,
      },

      newFolder: {
        showInput: false,
        name: '',
        feedback: null,
        valid: null,
        submitted: false,
      },

      submittedNewFolder: false,

      newProblem: {
        showInput: false,
        name: '',
        feedback: null,
        valid: null,
        submitted: false,
      },

      submittedNewProblem: false,
    };
  },
  components: {
    DirectoryItem,
    HeaderPath,
    HorCylon,
    NotFound,
    NothingToShow,
  },

  created() {
    if (this.showPath) {
      this.processPromise(Backend.getPathToRoot(this.archiveFolderId), 'path');
    }
    this.processPromise(Backend.getFolderProblems(this.archiveFolderId), 'problems');

    Backend.getFolder(this.archiveFolderId)
      .then((folder) => {
        this.folder = {
          recieved: true,
          data: folder,
        };
        this.processPromise(Backend.canEdit(this.userid, folder.ownerId), 'requestIsEditable');
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });

    Backend.getFolderSubfolders(this.archiveFolderId)
      .then((subfolders) => {
        this.subfolders = {
          recieved: true,
          data: subfolders.sort((a, b) => a.name.localeCompare(b.name)),
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
    ...mapGetters(['userid', 'archiveRoot']),

    isFolderEditable() {
      return this.requestIsEditable.recieved && this.requestIsEditable.data;
    },

    archiveFolderId() {
      if (!(this.propFolderId === undefined || this.propFolderId === null)) {
        return this.propFolderId;
      }
      return this.routeFolderId === undefined || this.routeFolderId === null
        ? this.archiveRoot
        : this.routeFolderId;
    },

    problemsEmpty() {
      return this.problems.recieved ? this.problems.data.length === 0 : true;
    },

    subfoldersEmpty() {
      return this.subfolders.recieved ? this.subfolders.data.length === 0 : true;
    },

    problemsShow() {
      if (this.isFolderEditable) {
        return { cols: 6, type: 'no-hide' };
      }
      if (!this.problems.recieved) {
        return { cols: 6, type: 'no-hide' };
      }
      if (this.problemsEmpty) {
        return { cols: 0, type: 'hide' };
      }
      return this.subfoldersEmpty ? { cols: 12, type: 'no-hide' } : { cols: 6, type: 'no-hide' };
    },

    foldersShow() {
      if (this.isFolderEditable) {
        return { cols: 6, type: 'no-hide' };
      }
      if (!this.subfolders.recieved) {
        return { cols: 6, type: 'no-hide' };
      }
      if (this.subfoldersEmpty) {
        return { cols: 0, type: 'hide' };
      }
      return this.problemsEmpty ? { cols: 12, type: 'no-hide' } : { cols: 6, type: 'no-hide' };
    },
  },

  methods: {
    processPromise(promise, field) {
      promise
        .then((data) => {
          this[field] = {
            recieved: true,
            data,
          };
        })
        .catch((er) => {
          this.error = {
            has: true,
            message: er.toString(),
          };
        });
    },

    onClickCreateFolder() {
      this.newFolder.showInput = true;
    },

    onClickCreateProblem() {
      this.newProblem.showInput = true;
    },

    onResetNew(field) {
      this[field] = {
        showInput: false,
        name: '',
        feedback: null,
        valid: null,
        submitted: false,
      };
    },

    onSubmitNew(field, backendMethod, target) {
      if (this[field].name.length === 0) {
        this.onResetNew(field);
        this[field].showInput = true;
        this[field].feedback = 'Empty name';
        this[field].valid = false;
        return;
      }
      this[field].valid = true;
      this[field].submitted = true;
      Backend[backendMethod](this.archiveFolderId, this[field].name, this.userid)
        .then((created) => {
          this.onResetNew(field);
          this[field].submitted = false;
          this[field].showInput = false;
          this[target].data.push(created);
          this[target].data.sort((a, b) => a.name.localeCompare(b.name));
        })
        .catch((er) => {
          this.onResetNew(field);
          this[field].submitted = false;
          this[field].showInput = true;
          this[field].feedback = er.toString();
          this[field].valid = false;
        });
    },

    onResetNewProblem() {
      this.newProblem = {
        showInput: false,
        name: '',
        feedback: null,
        valid: null,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
@import "@/style/bootstrap-custom.scss"
@import "@/../node_modules/bootstrap/scss/bootstrap.scss"

.hide
  display: none

.no-hide
  display: inline-block
</style>
