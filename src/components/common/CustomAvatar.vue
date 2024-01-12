<template>
  <div class="avatar">
    <img
      :src="
        imgSrc ||
        'https://github.com/lotteon2/jeontongju-front-consumer/assets/72402747/dae9e692-8cfa-41e2-a44b-9bcf3f22ca4e'
      "
      alt="avatar"
      class="avatar-img"
    />
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default:
        '"https://github.com/lotteon2/jeontongju-front-consumer/assets/72402747/dae9e692-8cfa-41e2-a44b-9bcf3f22ca4e"'
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 70%;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
