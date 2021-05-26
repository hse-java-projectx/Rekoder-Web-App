import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/signin',
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: { title: 'About' },
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/Signin.vue'),
    meta: { title: 'Sign in' },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue'),
    meta: { title: 'Sign up' },
  },
  {
    path: '/feed',
    name: 'feed',
    component: () => import('../views/Feed.vue'),
    meta: { title: 'Feed' },
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('../views/Explore.vue'),
    meta: { title: 'Explore' },
  },
  {
    path: '/profile/:profileType/:userId',
    name: 'profile',
    component: () => import('../views/UserProfile.vue'),
    meta: { title: 'Submission' },
  },
  {
    path: '/profile',
    name: 'anonProfile',
    component: () => import('../views/UserProfile.vue'),
    meta: { title: 'Profile' },
  },
  {
    path: '/edit/:profileType/:profileId',
    name: 'profileEdit',
    component: () => import('../views/edit/EditProfile.vue'),
    meta: { title: 'Edit Profile' },
  },
  {
    path: '/archive/:folderId',
    name: 'archive',
    component: () => import('../views/Archive.vue'),
    meta: { title: 'Archive' },
  },
  {
    path: '/problem/:problemId',
    name: 'problemOrSubmissionHistory',
    component: () => import('../views/ProblemOrSubmissionHistory.vue'),
    meta: { title: 'Problem' },
  },
  {
    path: '/submission/:submissionId',
    name: 'submission',
    component: () => import('../views/Submission.vue'),
    meta: { title: 'Submission' },
  },
  {
    path: '/teams/:userId',
    name: 'teamList',
    component: () => import('../views/lists/TeamList.vue'),
    meta: { title: 'Teams' },
  },
  {
    path: '/team-members/:teamId',
    name: 'membersList',
    component: () => import('../views/lists/MembersList.vue'),
  },
  {
    path: '/following/:userId',
    name: 'followingList',
    component: () => import('../views/lists/FollowingList.vue'),
    meta: { title: 'Following' },
  },
  {
    path: '/followers/:userId',
    name: 'followersList',
    component: () => import('../views/lists/FollowersList.vue'),
    meta: { title: 'Followers' },
  },
  {
    path: '/problem-edit/:problemId',
    name: 'problemEdit',
    component: () => import('../views/EditProblem.vue'),
    meta: { title: 'Edit Problem' },
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/Help.vue'),
    meta: { title: 'Help' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue'),
    meta: { title: 'Contact us' },
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('../views/Report.vue'),
    meta: { title: 'Report' },
  },
  {
    path: '/search/:entity/:id',
    name: 'search',
    component: () => import('../components/search/SearchResults.vue'),
    meta: { title: 'Report' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const DEFAULT_TITLE = 'Rekoder';
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
