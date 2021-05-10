<template>
  <SingleView>
    <template #header> </template>
    <template #content>
      <h1>Report issue</h1>
      <p>
        All of our projects are developed on github. Try to determine in which
        part of the service the problem occurred and create an issue in that
        repository.
      </p>
      <ul>
        <li>
          <b-link
            href="https://github.com/hse-java-projectx/Rekoder-Web-App/issues/new"
            >Web Application</b-link
          >
        </li>
        <li>
          <b-link
            href="https://github.com/hse-java-projectx/IntelliJ-Rekoder-Plugin/issues/new"
            >IntellijIDEA Plugin</b-link
          >
        </li>
        <li>
          <b-link
            href="https://github.com/hse-java-projectx/Rekoder-Backend/issues/new"
            >API</b-link
          >
        </li>
      </ul>
      <p>
        If there is any other problem, you can refer to the
        <router-link to="/contact">Contact us</router-link>
        page and write to us directly.
      </p>
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
