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
import { getAuctionList } from '@/api/auction/auctionAPIService.ts'
import { useToast } from 'vue-toastification'

export default {
  components: { CustomButton, LiveItem },
  data() {
    return {
      liveList: []
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
    },
    async getAuctionList(page, size) {
      const toast = useToast()
      try {
        const data = await getAuctionList(page, size)
        if (data.code === 200) {
          this.liveList = data.data.content
          toast.success('라이브 경매 내역을 불러왔어요.', {
            timeout: 2000
          })
        }
      } catch (error) {
        toast.error('라이브 경매 내역을 불러오는데 실패했어요.', {
          timeout: 2000
        })
      }
    }
  },
  mounted() {
    this.getAuctionList(0, 10)
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
