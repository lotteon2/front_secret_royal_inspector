<template>
  <div class="user-detail">
    <div class="user-detail__header">
      <UserCard
        :email="email"
        :nickName="name"
        :thumbnail="thumbnail"
        :phoneNumber="phoneNumber"
      ></UserCard>
      <div class="user-detail__header__btns">
        <CustomButton :btnText="`${credit} 크레딧`" />
        <CustomButton :btnText="`${point} 포인트`" />
        <CustomButton
          v-if="this.isDeleted === true"
          btnText="탈퇴 유저"
          :handleClick="() => withDrawSeller()"
          btnType="negative"
        />
        <CustomButton v-else btnText="활성 유저" :handleClick="() => withDrawSeller()" />
      </div>
    </div>
    <div class="user-detail__menu">
      <RouterLink
        :to="`/user/userDetail/${this.consumerId}/orderList`"
        :class="{ active: isActive('orderList') }"
        >주문내역</RouterLink
      >
      <RouterLink
        :to="`/user/userDetail/${this.consumerId}/point`"
        :class="{ active: isActive('point') }"
        >포인트</RouterLink
      >
      <RouterLink
        :to="`/user/userDetail/${this.consumerId}/credit`"
        :class="{ active: isActive('credit') }"
        >경매 크레딧</RouterLink
      >
      <RouterLink
        :to="`/user/userDetail/${this.consumerId}/auction`"
        :class="{ active: isActive('auction') }"
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
import CustomButton from '@/components/common/CustomButton.vue'
import { useToast } from 'vue-toastification'
import { getConsumerDetailInfoByConsumerId } from '@/api/consumer/consumerAPIService.ts'
export default {
  components: {
    UserCard,
    CustomButton
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
      name: '',
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
          this.name = data.data.name
          this.thumbnail = data.data.thumbnail
          this.phoneNumber = data.data.phoneNumber
          this.point = data.data.point
          this.credit = data.data.credit
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

  .user-detail__header {
    display: flex;
    gap: 2rem;
    align-items: center;

    .user-detail__header__btns {
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
    }
  }
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
