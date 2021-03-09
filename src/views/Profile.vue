<template>
  <div>
    <ProfileLayout
      :links="links"
      name="Gleb Marin"
      avatarAlt="Profile avatar"
      avatarPath="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"
      :information="userInfo"
      :bio="description"
    >
    </ProfileLayout>
  </div>
</template>

<script>
import ProfileLayout from '@/components/profile/ProfileLayout.vue';

export default {
  components: { ProfileLayout },
  data() {
    return {
      description: 'National Research University HSE SPb. Applied Mathematics and Computer Science',
      links: [
        {
          name: 'teams',
          num: 3,
          ref: 'teams',
        },
        {
          name: 'followers',
          num: 281,
          ref: 'followers',
        },
        {
          name: 'following',
          num: 12,
          ref: 'following',
        },
      ],
      userInfo: [
        {
          key: 'City',
          value: 'Saint Petersburg',
          ref: 'city/spb',
        },
        {
          key: 'Email',
          value: 'glebmar2001@gmail.com',
          ref: 'mailto:glebmar2001@gmail.com',
        },
      ],
    };
  },
};
</script>
