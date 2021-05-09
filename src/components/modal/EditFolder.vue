<template>
  <b-modal hide-footer centered id="modal-edit-folder">
    <template #modal-header>
      <span class="big-font">Edit folder {{ initialPrivacy }} </span>
    </template>
    <b-form>
      <label> Privacy </label>
      <b-form-group>
        <b-form-select
          v-model="folderPrivacy"
          :options="privacyOptions"
        ></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-modal>
</template>
<script>
export default {
  props: {
    id: String,
    initialPrivacy: String,
  },

  data() {
    return {
    };
  },

  created() {
    this.folderPrivacy = this.initialPrivacy;
  },
};
</script>
<style lang="sass">
@import "@/style/bootstrap-custom.scss"
@import "@/../node_modules/bootstrap/scss/bootstrap.scss"
</style>
