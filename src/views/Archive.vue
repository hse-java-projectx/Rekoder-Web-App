<template>
  <div>
    <SubNavbar>
      <template #left>
        <span
          class="d-none d-md-inline-block"
          v-for="way in path"
          :key="way.name"
        >
          <span class="path-way">
            <router-link class="path-way-link" :to="way.link">
              {{ way.name }}
            </router-link>
            /
          </span>
        </span>
        <span class="d-inline-block d-md-none">
          <span v-if="hasPrevWay" class="path-way">
            <router-link class="path-way-link" :to="prevWay.link">
              ...
            </router-link>
            /
          </span>
          <span class="path-way">
            <router-link class="path-way-link" :to="lastWay.link">
              {{ lastWay.name }}
            </router-link>
            /
          </span>
        </span>
      </template>
      <template #right>
        <b-icon icon="folder-plus" class="text-primary" />
      </template>
    </SubNavbar>
    <div class="page-item-container">
      <b-list-group>
        <DirectoryItem
          v-for="item in directions"
          :key="item.name"
          :name="item.name"
          :isDirectory="item.isDirectory"
          :link="item.link"
          :solved="item.solved"
        ></DirectoryItem
      ></b-list-group>
    </div>
  </div>
</template>

<script>
import DirectoryItem from '@/components/archive/DirectoryItem.vue';
import SubNavbar from '@/components/SubNavbar.vue';

export default {
  name: 'Archive',
  data() {
    return {
      owner: 'Gleb Marin',
      path: [
        { name: 'Glebanister', link: 'user/Glebanister' },
        { name: 'root', link: 'user/Glebanister/root' },
        { name: 'collections', link: 'user/Glebanister/root/collections' },
      ],
      directions: [
        {
          name: 'leetcode',
          isDirectory: true,
          link: '/leetcode',
          solved: false,
        },
        {
          name: 'codefoeces',
          isDirectory: true,
          link: '/codefoeces',
          solved: true,
        },
        {
          name: 'A + B Problem',
          isDirectory: false,
          link: '/aplusb',
          solved: true,
        },
        {
          name: 'Find path',
          isDirectory: false,
          link: '/findpath',
          solved: false,
        },
        {
          name: '3-SAT',
          isDirectory: false,
          link: '/3sat',
          solved: false,
        },
        {
          name: 'collection',
          isDirectory: true,
          link: '/collection',
          solved: null,
        },
      ],
    };
  },
  components: { DirectoryItem, SubNavbar },
  computed: {
    lastWay() {
      return this.path[this.path.length - 1];
    },
    hasPrevWay() {
      return this.path.length >= 2;
    },
    prevWay() {
      return this.path[this.path.length - 2];
    },
  },
};
</script>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.path-way
  font-size: 18pt

.path-way-link
  color: $secondary
  &:hover
    color: $dark
</style>
