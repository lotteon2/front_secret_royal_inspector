<template>
  <div class="user-detail">
    <UserCard></UserCard>
    <div class="user-detail__menu">
      <RouterLink to="/user/userDetail/3/orderList" :class="{ active: isActive('orderList') }"
        >주문내역</RouterLink
      >
      <RouterLink to="/user/userDetail/3/point" :class="{ active: isActive('point') }"
        >포인트</RouterLink
      >
      <RouterLink to="/user/userDetail/3/credit" :class="{ active: isActive('credit') }"
        >경매 크레딧</RouterLink
      >
      <RouterLink to="/user/userDetail/3/auction" :class="{ active: isActive('auction') }"
        >경매 참여 내역</RouterLink
      >
    </div>
    <div class="user-detail__sub">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import UserCard from '@/components/UserCard/UserCard.vue'
import { useToast } from 'vue-toastification'
import { getConsumerDetailInfoByConsumerId } from '@/api/consumer/consumerAPIService.ts'
export default {
  components: {
    UserCard
  },
  mounted() {
    this.consumerId = this.$route.params.consumerId
    this.getUserDetailInfo()
    this.$router.replace(`/user/userDetail/${this.consumerId}/orderList`)
  },
  data() {
    return {
      consumerId: -1,
      email: '',
      thumbnail: '',
      nickName: '',
      phoneNumber: '',
      point: '',
      credit: null,
      isDeleted: null
    }
  },
  methods: {
    isActive(route) {
      return this.$route.path.includes(route)
    },
    async getUserDetailInfo() {
      const toast = useToast()
      try {
        const data = await getConsumerDetailInfoByConsumerId(this.consumerId)
        if (data.code === 200) {
          toast.success('고객 상세 정보를 불러왔어요.', {
            timeout: 2000
          })
          this.email = data.data.email
          this.thumbnail = data.data.thumbnail
          this.phoneNumber = data.data.phoneNumber
          this.isDeleted = data.data.isDeleted
        }
      } catch (err) {
        toast.error('고객 상세 정보를 불러오는데 실패했어요.', {
          timeout: 2000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-detail {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  .user-detail__menu {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
    justify-content: center;
  }

  .user-detail__sub {
    width: 100%;
  }
  a {
    text-decoration: none;
    border-radius: 4px;
    background-color: #9db0a3;
    padding: 0.3rem;
    color: white;
    &:hover,
    &:active {
      font-weight: bold;
      background-color: #aab3ff;
    }
  }

  .active {
    font-weight: bold;
    background-color: #aab3ff;
  }
}
</style>
