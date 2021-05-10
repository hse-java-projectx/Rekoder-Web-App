<template>
  <SingleView>
    <template #header> </template>
    <template #content>
      <h1>Contact us</h1>
      <ul>
        <li>
          <b-link href="https://t.me/glebmarin">Telegram (Gleb Marin)</b-link>
        </li>
        <li>
          <b-link href="mailto:glebmar2001@gmail.com?subject=[Rekoder]"
            >Email (Gleb Marin)</b-link
          >
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
