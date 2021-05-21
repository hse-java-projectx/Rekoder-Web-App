<template>
  <div>
    <b-form-group class="my-auto">
      <b-form-input
        trim
        id="search"
        :size="inline ? 'sm' : 'md'"
        v-model="query.value"
        :placeholder="searchPlaceholder"
        autocomplete="off"
        @focus="inputFocused = true"
        @blur="onBlur"
        @update="onInputUpdate"
        :state="
          !inline ? undefined : query.feedback !== null ? false : undefined
        "
      />
      <div class="search-results" v-show="showOptions">
        <b-list-group>
          <b-list-group-item
            button
            v-for="location in locations"
            :key="location.entity"
            @click.prevent="onSelectSearchLocation(location)"
          >
            {{ locationOption(location) }}
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="search-results" v-show="showSearchResults">
        <HorCylon v-if="searchRequest.waiting" />
        <b-list-group v-else>
          <b-list-group-item
            button
            v-for="result in searchRequest.results"
            :key="result.entity + result.id"
            @click.prevent="onSelectResult(result)"
          >
            {{ searchResult(result) }}
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-form-group>
  </div>
</template>

<script>
import HorCylon from '@/components/animated/HorCylon.vue';

import Backend from '@/js/backend/main';

export default {
  components: { HorCylon },

  props: {
    contentTypes: Array[String],
    locations: Array[Object],
    inline: {
      type: Boolean,
      default: false,
    },
    inlineLimit: {
      type: Number,
      default: 5,
    },
  },

  data() {
    return {
      inputFocused: null,

      query: {
        feedback: null,
        value: '',
      },

      searchRequest: {
        sent: false,
        recieved: false,
        results: null,
        waiting: false,
      },
    };
  },

  computed: {
    showOptions() {
      return !this.inline && this.inputFocused && this.query.value.length !== 0;
    },

    showSearchResults() {
      return this.inline && this.inputFocused && this.query.value.length !== 0;
    },

    searchPlaceholder() {
      let placeholder = 'Search';
      console.log(this.contentTypes);
      console.log(this.locations);
      let anyLeft = this.contentTypes.length;
      this.contentTypes.forEach((contentType) => {
        placeholder += ` ${contentType}`;
        anyLeft -= 1;
        if (anyLeft !== 0) {
          placeholder += ',';
        }
      });
      return placeholder;
    },
  },

  methods: {
    onBlur() {
      setTimeout(() => {
        this.inputFocused = false;
      }, 100);
    },

    onClearOption() {
      this.$emit('handleSearchResult', null);
      this.query.feedback = null;
      this.result.valid = false;
    },

    onInputUpdate() {
      if (!this.inline) {
        return;
      }
      if (this.query.value.length === 0 || this.searchRequest.waiting) {
        return;
      }
      if (this.locations.length !== 1) {
        throw Error('Locations length for inline mode must be 1');
      }
      this.searchRequest.waiting = true;
      this.searchRequest.recieved = false;
      Backend.searchContent(this.query.value, this.contentTypes, this.locations[0])
        .then((results) => {
          this.searchRequest.recieved = true;
          this.searchRequest.results = results;
        })
        .catch((er) => {
          this.query.feedback = er.toString();
        })
        .finally(() => {
          this.searchRequest.waiting = false;
        });
    },

    locationOption(location) {
      return `Search '${this.query.value}' in ${location.entity}:${location.id}`;
    },

    searchResult(result) {
      return this.contentTypes.length === 0 ? result.id : `${result.entity}:${result.id}`;
    },

    onSelectResult(result) {
      this.$emit('handleSearchResult', result);
    },

    onSelectSearchLocation(location) {
      if (this.query.value.length === 0) {
        return;
      }
      this.$router.push({
        path: `/search/${location.entity}/${location.id}`,
        query: {
          query: encodeURIComponent(this.query.value),
          contentType: this.contentTypes.join(','),
        },
      });
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
