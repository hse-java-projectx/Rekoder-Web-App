<template>
  <SingleView>
    <template #header> </template>
    <template #content>
      <h1>About <strong class="text-primary">Rekoder</strong></h1>
      <div>
        <p>
          In this short article, we will try to answer the questions you may
          have had when you came to this site.
        </p>
      </div>
      <hr />
      <div>
        <h2>General purpose</h2>
        <div>
          <p>
            This is a service with which you can find, solve, and save
            competitive programming problems.
          </p>
        </div>
      </div>
      <br />
      <div>
        <h2>Usage</h2>
        <div>
          <p>
            To use all the features of the service you need to learn how to use
            this site and the client application (such as our plugin for
            IntellijIDEA). The
            <router-link to="/help"> help </router-link>
            page can tell you more about this.
          </p>
        </div>
      </div>
      <br />
      <div>
        <h2>Source Code</h2>
        <div>
          <p>
            The source code of the service is completely open and can be found
            at
            <b-link href="https://github.com/hse-java-projectx">
              our GitHub
            </b-link>
            page.
          </p>
        </div>
      </div>
      <br />
      <div>
        <h2>Credits ❤️</h2>
        <div>
          <p>
            It was developed as part of the coursework for the Java course by
            students of the St. Petersburg Higher School of Economics.
            <ul>
              <li>Danil Bubnov</li>
              <li>Gleb Marin</li>
              <li>Ilya Onofriychuck</li>
            </ul>
          </p>
        </div>
      </div>
    </template>
  </SingleView>
</template>

<script>
import SingleView from '@/components/SingleView.vue';

export default {
  name: 'About',
  components: { SingleView },
};
</script>

<style lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap
</style>
