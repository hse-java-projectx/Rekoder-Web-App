<template>
  <div>
    <SearchLocationRegister entity="folder" :id="archiveFolderId" />
    <NotFound v-if="error.has" :message="error.message" />
    <div v-if="showPath" class="big-font">
      <b-row>
        <b-col>
          <b-skeleton-wrapper :loading="!path.recieved">
            <template #loading>
              <HorCylon />
            </template>
            <div>
              <HeaderPath :path="path.data" />
            </div>
          </b-skeleton-wrapper>
        </b-col>
        <b-col class="text-right">
          <div
            v-if="
              showRemote &&
              isFolderEditable &&
              path.recieved &&
              path.data.length !== 1
            "
          >
            <b-button variant="outline-danger" size="sm" v-b-modal.modal-delete>
              Delete Folder
            </b-button>
          </div>
        </b-col>
      </b-row>
      <br />
    </div>
    <b-container
      v-if="!subfolders.recieved || !problems.recieved"
      class="text-center"
    >
      <HorCylon />
    </b-container>
    <NothingToShow
      v-else-if="
        subfolders.recieved &&
        problems.recieved &&
        subfoldersEmpty &&
        problemsEmpty &&
        !isFolderEditable
      "
      message="This folder is empty"
    />
    <b-row v-else>
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
          <b-list-group class="scroll" v-else>
            <b-form
              v-if="newFolder.showInput"
              class="my-2 mx-1"
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
          <b-list-group class="scroll" v-else>
            <b-form
              v-if="newProblem.showInput"
              class="my-2 mx-1"
              @reset.prevent="onResetNew('newProblem')"
              @submit.prevent="
                onSubmitNew('newProblem', 'createProblem', 'problems')
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
              :link="`/problem/${item.id}?view=statement`"
            />
          </b-list-group>
        </div>
      </b-col>
    </b-row>
    <b-modal
      id="modal-delete"
      ref="modal-delete"
      title="Delete this folder"
      @ok="onClickDeleteFolder"
      header-bg-variant="danger"
      header-text-variant="light"
      body-text-variant="secondary"
      :ok-disabled="deleteFolder.submitted"
    >
      <b-container>
        <p>
          This folder and all internal folders with tasks and submissions will
          be irretrievably deleted. Are you sure you want to do this?
        </p>
      </b-container>
      <b-form-invalid-feedback :state="deleteFolder.feedback === null">
        {{ deleteFolder.feedback }}
      </b-form-invalid-feedback>
    </b-modal>
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
import SearchLocationRegister from '@/components/search/registers/Location.vue';

export default {
  props: {
    showPath: Boolean,
    propFolderId: String,
    showRemote: {
      type: Boolean,
      default: false,
    },
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

      submittedDelete: false,

      deleteFolder: {
        submitted: false,
        feedback: null,
      },
    };
  },
  components: {
    DirectoryItem,
    HeaderPath,
    HorCylon,
    NotFound,
    NothingToShow,
    SearchLocationRegister,
  },

  created() {
    this.processPromise(Backend.getFolderProblems(this.archiveFolderId), 'problems');

    Backend.getFolder(this.archiveFolderId)
      .then((folder) => {
        this.folder = {
          recieved: true,
          data: folder,
        };
        if (this.showPath) {
          Backend.getPathToRoot(this.archiveFolderId)
            .then((path) => {
              // const extendedPath = path;
              // extendedPath.push(folder);
              const processedPath = [];
              path.forEach((pathItem) => {
                processedPath.push({
                  link: `/archive/${pathItem.id}`,
                  name: pathItem.name,
                });
              });
              this.path = {
                recieved: true,
                data: processedPath,
              };
            })
            .catch((er) => {
              this.error = {
                has: true,
                message: er.toString(),
              };
            });
        }
        if (this.storageIsSigned) {
          this.processPromise(
            Backend.canEdit(this.storageUserId, {
              id: folder.owner.id,
              type: folder.owner.type.toLowerCase(),
            }),
            'requestIsEditable',
          );
        }
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
    ...mapGetters(['storageUserId', 'storageIsSigned', 'storageUser', 'storageAccessToken']),

    isFolderEditable() {
      return this.requestIsEditable.recieved && this.requestIsEditable.data;
    },

    archiveFolderId() {
      if (!(this.propFolderId === undefined || this.propFolderId === null)) {
        return this.propFolderId;
      }
      return this.routeFolderId === undefined || this.routeFolderId === null
        ? this.storageUser.rootFolderId
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
      if (this.subfoldersEmpty && this.problemsEmpty) {
        return { cols: 12, type: 'no-hide' };
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
          console.log(`Processed promise, field: ${field}, data: ${data}`);
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

    onClickDeleteFolder() {
      this.deleteFolder.submitted = true;
      Backend.deleteFolder(this.archiveFolderId, this.storageAccessToken)
        .then(() => {
          this.deleteFolder.submitted = false;
          this.$router.push(`/archive/${this.folder.data.parentFolderId}`);
        })
        .catch((er) => {
          this.deleteFolder.submitted = false;
          this.deleteFolder.feedback = er.toString();
        });
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
      Backend[backendMethod](
        this.archiveFolderId,
        this[field].name,
        this.storageUserId,
        this.storageAccessToken,
      )
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

.scroll
  overflow-y: auto
  max-height: 55vh
</style>
