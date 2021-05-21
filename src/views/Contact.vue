<template>
  <SingleView>
    <template #header> </template>
    <template #content>
      <h1>Contact us via Telegram</h1>
      <ul>
        <li>
          <b-link href="https://t.me/danilbk123">Danil Bubnov</b-link>
        </li>
        <li>
          <b-link href="https://t.me/glebmarin">Gleb Marin</b-link>
        </li>
        <li>
          <b-link href="https://t.me/ilyaonoff">Ilya Onofriychuk</b-link>
        </li>
      </ul>
    </template>
  </SingleView>
</template>

<script>
import SingleView from '@/components/SingleView.vue';

export default {
  name: 'Contact',
  components: { SingleView },
};
</script>

<style lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap
</style>
