<template>
  <div class="avatar">
    <img :src="imgSrc" alt="avatar" class="avatar-img" />
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default:
        'https://mblogthumb-phinf.pstatic.net/MjAyMDEwMjVfMTIw/MDAxNjAzNTU1MTYxMTk4.O3bIk9PByRbaIpbXeQLfC6TlgEUUOmPlcB0MpZC9iEEg.EBFxC0vxVdRDnWKIBVCuO_DopZsxNb6lUwr5JpPmgAcg.JPEG.jinwee92/%EC%95%84%EC%9D%B4%ED%8F%B0%ED%9A%8C%EC%83%89%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_03.jpg?type=w800'
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
