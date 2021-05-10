import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/Signin.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue'),
  },
  {
    path: '/feed',
    name: 'feed',
    component: () => import('../views/Feed.vue'),
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('../views/Explore.vue'),
  },
  {
    path: '/profile/:userId',
    name: 'profile',
    component: () => import('../views/UserProfile.vue'),
  },
  {
    path: '/profile-edit/:profileId',
    name: 'profileEdit',
    component: () => import('../views/edit/EditProfile.vue'),
  },
  {
    path: '/profile/:userId/archive/:folderId',
    name: 'archive',
    component: () => import('../views/Archive.vue'),
  },
  {
    path: '/profile/:userId/problem/:problemId',
    name: 'problemOrSubmissionHistory',
    component: () => import('../views/ProblemOrSubmissionHistory.vue'),
  },
  {
    path: '/profile/:userId/problem/:problemId/submission/:submissionId',
    name: 'submission',
    component: () => import('../views/Submission.vue'),
  },
  {
    path: '/profile/:userId/teams',
    name: 'teamList',
    component: () => import('../views/lists/TeamList.vue'),
  },
  {
    path: '/profile/:userId/following',
    name: 'followingList',
    component: () => import('../views/lists/FollowingList.vue'),
  },
  {
    path: '/profile/:userId/followers',
    name: 'followersList',
    component: () => import('../views/lists/FollowersList.vue'),
  },
  {
    path: '/profile/:userId/problem-edit/:problemId',
    name: 'problemEdit',
    component: () => import('../views/EditProblem.vue'),
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/Help.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue'),
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('../views/Report.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
