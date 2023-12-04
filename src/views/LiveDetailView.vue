<template>
  <div class="liveDetail">
    <div class="title">{{ title }}</div>
    <div class="desc">
      <div class="startDate">{{ startDate }}</div>
      <AuctionState :status="state"></AuctionState>
    </div>
    <CustomTable :headers="header" :items="items"></CustomTable>
    <CustomModal></CustomModal>
  </div>
</template>

<script scoped>
import AuctionState from '@/components/Auction/AuctionState.vue'
import CustomTable from '@/components/common/CustomTable.vue'
import CustomModal from '@/components/common/CustomModal.vue'
export default {
  name: 'LiveDetailView',
  components: {
    AuctionState,
    CustomTable
  },
  data() {
    return {
      title: '11/25 복순 DAY',
      startDate: '2023-12-08 17:00',
      state: 'BEFORE',
      header: [
        { text: '', value: 'storeImageUrl' },
        { text: '가게이름', value: 'sellerName' },
        { text: '이메일', value: 'sellerEmail' },
        { text: '대표번호', value: 'storePhoneNumber' },
        { text: '대표자 이름', value: 'businessmanName' },
        { text: '신청일자', value: 'createdAt' },
        { text: '상품이름', value: 'productName' },
        { text: '도수', value: 'alcoholDegree' },
        { text: '용량', value: 'capacity' },
        { text: '시작가', value: 'startingPrice' },
        { text: '승인여부', value: 'status' }
      ],
      items: [
        {
          sellerId: 1,
          sellerName: '덤보네 주막',
          sellerEmail: 'email@email.com',
          businessmanName: '덤덤보',
          storePhoneNumber: '010-0101-0101',
          storeImageUrl:
            'https://i.namu.wiki/i/X41e9ocvhIVMMdXi6r2jmujAbVnvYEIlr7YDg5rWozymdF-JJdy3aoVqSr_O-8eTWMkTilXWUHarVCubrC22yw.webp',
          auctionProductId: '2gvc6b14-7613-3963-8029-b23c56e3c5d3',
          productName: '복순도가 프리미엄',
          description: '복순도가 맛있다 설명',
          startingPrice: 10000,
          capacity: 500,
          alcoholDegree: 17,
          productImageUrl:
            'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMDhfMjUx/MDAxNjEwMTA1MDg1MTgz.B4WXxZw_gfJUTbeBkW563beyrxlsvuYp1RRZG0mFtzIg.vWGxP9oHbCuiIJD9K6OfIkR1G2TMytWnOWLae9PE-V4g.JPEG.angela8846/SE-18DA6C8F-D93C-4484-BA07-D77C7A56F40F.jpg?type=w800',
          status: 'WAIT',
          createdAt: '2023-11-30T23:59:59'.slice(0, 10)
        },
        {
          sellerId: 2,
          sellerName: '덤보네 주막',
          sellerEmail: 'email@email.com',
          businessmanName: '덤덤보',
          storePhoneNumber: '010-0101-0101',
          storeImageUrl:
            'https://i.namu.wiki/i/X41e9ocvhIVMMdXi6r2jmujAbVnvYEIlr7YDg5rWozymdF-JJdy3aoVqSr_O-8eTWMkTilXWUHarVCubrC22yw.webp',
          auctionProductId: '2gvc6b14-7613-3963-8029-b23c56e3c5d4',
          productName: '복순도가 프리미엄 22',
          description: '복순도가 맛있다 설명',
          startingPrice: 10000,
          capacity: 500,
          alcoholDegree: 17,
          productImageUrl:
            'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMDhfMjUx/MDAxNjEwMTA1MDg1MTgz.B4WXxZw_gfJUTbeBkW563beyrxlsvuYp1RRZG0mFtzIg.vWGxP9oHbCuiIJD9K6OfIkR1G2TMytWnOWLae9PE-V4g.JPEG.angela8846/SE-18DA6C8F-D93C-4484-BA07-D77C7A56F40F.jpg?type=w800',
          status: 'ALLOW',
          createdAt: '2023-11-30T23:59:59'.slice(0, 10)
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.liveDetail {
  margin-top: 1rem;
  .title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .startDate {
    text-align: end;
    height: 1.5rem;
  }

  .desc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
