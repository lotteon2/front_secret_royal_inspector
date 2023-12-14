<template>
  <div class="custom-avatar">
    <div>
      <CustomAvatar :imgSrc="thumbnail"></CustomAvatar>
    </div>
    <div class="custom-avatar__right">
      <div class="custom-avatar__name">{{ nickName }}</div>
      <div>{{ email }}</div>
      <div>{{ phoneNumber }}</div>
    </div>
  </div>
</template>

<script scoped>
import CustomAvatar from '@/components/common/CustomAvatar.vue'

export default {
  components: {
    CustomAvatar
  },
  props: {
    nickName: {
      type: String,
      default: 'user'
    },
    email: {
      type: String,
      default: 'email'
    },
    phoneNumber: {
      type: String,
      default: 'phoneNumber'
    },
    thumbnail: {
      type: String,
      default: 'thumbnail'
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-avatar {
  border: 1px solid lightgray;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 22rem;
  box-shadow: 5px 5px 5px 0px rgba(214, 209, 209, 0.75);

  .custom-avatar__right {
    .custom-avatar__name {
      font-size: 1.5rem;
    }
  }
}
</style>
