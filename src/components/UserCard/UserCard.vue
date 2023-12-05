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
  data() {
    return {
      nickName: '마덤보',
      email: 'dumbo@naver.com',
      phoneNumber: '010-1234-5678',
      thumbnail:
        'https://i.namu.wiki/i/X41e9ocvhIVMMdXi6r2jmujAbVnvYEIlr7YDg5rWozymdF-JJdy3aoVqSr_O-8eTWMkTilXWUHarVCubrC22yw.webp'
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
  width: 16rem;
  box-shadow: 5px 5px 5px 0px rgba(214, 209, 209, 0.75);

  .custom-avatar__right {
    .custom-avatar__name {
      font-size: 1.5rem;
    }
  }
}
</style>
