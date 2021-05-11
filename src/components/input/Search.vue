<template>
  <div>
    <b-form-group class="my-auto">
      <b-form-input
        trim
        id="search"
        size="sm"
        v-model="query.value"
        :placeholder="searchPlaceholder"
        :state="query.valid"
        debounce="200"
        @update="onInputUpdate"
        @focus="inputFocused = true"
        @blur="inputFocused = false"
        autocomplete="off"
      />
      <div class="search-results" v-show="showSearchResults">
        <div v-if="searchRequest.sent && !searchRequest.recieved">
          <HorCylon />
        </div>
        <div v-else>
          <b-list-group>
            <b-list-group-item
              v-if="searchRequest.results.length === 0"
              class="text-secondary text-center"
            >
              <i> Nothing found </i>
            </b-list-group-item>
            <b-list-group-item
              button
              v-for="result in searchRequest.results"
              :key="result.name"
              @click.prevent="onSelectOption(result)"
            >
              {{ result.name }}
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </b-form-group>
  </div>
</template>

<script>
import Backend from '@/js/backend/main';
import HorCylon from '@/components/animated/HorCylon.vue';

export default {
  components: { HorCylon },

  props: {
    contentTypes: Array[String],
    result: Object,
  },

  data() {
    return {
      inputFocused: null,

      query: {
        valid: null,
        feedback: null,
        value: null,
      },

      searchRequest: {
        sent: false,
        recieved: false,
        results: [],
      },
    };
  },

  computed: {
    showSearchResults() {
      return (
        // eslint-disable-next-line operator-linebreak
        (this.inputFocused || this.query.valid === false) &&
        !((this.query.value !== null && this.query.value.length === 0) || this.query.value === null)
      );
    },

    searchPlaceholder() {
      let placeholder = 'Search';
      let anyLeft = this.contentTypes.length;
      this.contentTypes.forEach((contentType) => {
        let desc = '';
        if (contentType === 'user') {
          desc = 'User';
        } else if (contentType === 'team') {
          desc = 'Team';
        } else if (contentType === 'system') {
          desc = 'Judge System';
        }
        placeholder += ` ${desc}`;
        anyLeft -= 1;
        if (anyLeft !== 0) {
          placeholder += ',';
        }
      });
      return placeholder;
    },
  },

  methods: {
    validateInput() {
      this.query.valid = null;
      if (this.query.value === 0 || this.query.value.length === 0) {
        this.onClearOption();
        return null;
      }
      this.query.valid = false;
      this.searchRequest.results.forEach((result) => {
        if (this.query.value === result.name || this.query.value === result.id) {
          this.onSelectOption(result);
        }
      });
      return this.query.valid;
    },

    onInputUpdate(q) {
      this.searchRequest = {
        sent: true,
        recieved: false,
        results: [],
      };
      Backend.searchContent(q, this.contentTypes)
        .then((results) => {
          this.searchRequest = {
            sent: false,
            recieved: true,
            results,
          };
          this.validateInput();
        })
        .catch((er) => {
          this.$emit('searchError', er);
        });
    },

    onSelectOption(option) {
      this.query.valid = true;
      this.query.value = option.name;
      this.$emit('searchSelect', option);
      this.result.value = option;
      this.result.valid = true;
    },

    onClearOption() {
      this.$emit('searchReset');
      this.result.value = null;
      this.result.valid = false;
    },
  },
};
</script>

<style lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.search-results
  position: absolute
  z-index: 5
</style>
