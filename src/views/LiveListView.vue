<template>
  <div class="liveList">
    <div class="infoSection">
      <div>자세한 내역이 궁금하다면 눌러주세요</div>
      <CustomButton btnText="등록하기" :handleClick="addAuction"></CustomButton>
    </div>
    <div v-for="item in liveList" v-bind:key="item.auctionId">
      <LiveItem
        :title="item.title"
        :status="item.status"
        :allow="item.allow"
        :wait="item.wait"
        :deny="item.deny"
        :participation="item.participation"
        @click="goDetailAuction(item.auctionId)"
      ></LiveItem>
    </div>
  </div>
</template>

<script scoped>
import LiveItem from '@/components/Auction/LiveItem.vue'
import CustomButton from '@/components/common/CustomButton.vue'

export default {
  components: { CustomButton, LiveItem },
  data() {
    return {
      liveList: [
        {
          auctionId: '4dfc6b14-7213-3363-8009-b23c56e3a1b1',
          title: '제 20회 복순도가 경매대회',
          description: '누가 가져갈 것인가 복순도가',
          startDate: '2023-12-08T17:00:00',
          endDate: '',
          status: 'BEFORE',
          wait: 4,
          allow: 3,
          deny: 1
        },
        {
          auctionId: '4dfc6b14-7213-3363-8009-b23c56e3a1b2',
          title: '제 19회 복순도가 경매대회',
          description: '내가바로 복순도가',
          startDate: '2023-12-01T17:00:00',
          endDate: '',
          status: 'ING',
          participation: 5
        }
      ]
    }
  },
  methods: {
    addAuction() {
      console.log('here')
      this.$router.push({
        path: '/live/add'
      })
    },
    goDetailAuction(auctionId) {
      this.$router.push({
        path: `/live/detail/${auctionId}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.liveList {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  .infoSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 70vw;
    max-width: 70vw;
    margin: 1rem 0;
  }
}
</style>
