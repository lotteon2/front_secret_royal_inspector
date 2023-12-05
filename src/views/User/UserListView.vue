<template>
  <div class="userList">
    <div class="infoSection">
      <div>자세한 내역이 궁금하다면 눌러주세요</div>
    </div>
    <CustomTable :headers="header" :items="items"></CustomTable>
  </div>
</template>

<script scoped>
import LiveItem from '@/components/Auction/LiveItem.vue'
import CustomTable from '@/components/common/CustomTable.vue'

export default {
  components: { CustomTable },
  data() {
    return {
      header: [
        { text: '', value: 'thumbnail' },
        { text: '성함', value: 'nickName' },
        { text: '이메일', value: 'email' },
        { text: '전화번호', value: 'phoneNumber' },
        { text: '포인트', value: 'point' },
        { text: '크레딧', value: 'credit' },
        { text: '양반여부', value: 'isYangban' },
        { text: '가입일', value: 'createdAt' },
        { text: '탈퇴 여부', value: 'isDeleted' }
      ],
      items: [
        {
          consumerId: 1,
          thumbnail:
            'https://i.namu.wiki/i/X41e9ocvhIVMMdXi6r2jmujAbVnvYEIlr7YDg5rWozymdF-JJdy3aoVqSr_O-8eTWMkTilXWUHarVCubrC22yw.webp',
          nickName: '마덤보',
          email: 'dumbo@naver.com',
          phoneNumber: '010-0101-0101',
          point: 300,
          credit: 1000,
          isYangban: true,
          createdAt: '2023-11-26',
          isDeleted: true
        },
        {
          consumerId: 2,
          thumbnail:
            'https://i.namu.wiki/i/X41e9ocvhIVMMdXi6r2jmujAbVnvYEIlr7YDg5rWozymdF-JJdy3aoVqSr_O-8eTWMkTilXWUHarVCubrC22yw.webp',
          nickName: '마덤보22',
          email: 'dumbo@naver.com',
          phoneNumber: '010-0101-0101',
          point: 300,
          credit: 1000,
          isYangban: false,
          createdAt: '2023-11-26',
          isDeleted: false
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
.userList {
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
