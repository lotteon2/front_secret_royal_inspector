<template>
  <div>
    <CustomTable :headers="header" :items="items"></CustomTable>
  </div>
</template>

<script>
import CustomTable from '@/components/common/CustomTable.vue'
export default {
  components: { CustomTable },
  data() {
    return {
      header: [
        { text: '', value: 'productImageUrl' },
        { text: '경매 이름', value: 'auctionName' },
        { text: '상품', value: 'productName' },
        { text: '시작가', value: 'startingPrice' },
        { text: '낙찰가', value: 'myLastBidPrice' },
        { text: '낙찰 여부', value: 'isBid' },
        { text: '낙찰 날짜', value: 'bidDate' }
      ],
      items: [
        {
          auctionId: '4dfc6b14-7213-3363-8009-b23c56e3a1b1',
          auctionName: '제 20회 경매대회',
          productName: '복순도가 프리미엄',
          productImageUrl:
            'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMDhfMjUx/MDAxNjEwMTA1MDg1MTgz.B4WXxZw_gfJUTbeBkW563beyrxlsvuYp1RRZG0mFtzIg.vWGxP9oHbCuiIJD9K6OfIkR1G2TMytWnOWLae9PE-V4g.JPEG.angela8846/SE-18DA6C8F-D93C-4484-BA07-D77C7A56F40F.jpg?type=w800',
          startingPrice: 1000,
          lastBidPrice: 36000,
          myLastBidPrice: 36000,
          isBid: true,
          bidDate: '2023-11-26'
        },
        {
          auctionId: '4dfc6b14-7213-3363-8009-b23c56e3a1b1',
          auctionName: '제 20회 경매대회',
          productName: '복순도가 프리미엄 22',
          productImageUrl:
            'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMDhfMjUx/MDAxNjEwMTA1MDg1MTgz.B4WXxZw_gfJUTbeBkW563beyrxlsvuYp1RRZG0mFtzIg.vWGxP9oHbCuiIJD9K6OfIkR1G2TMytWnOWLae9PE-V4g.JPEG.angela8846/SE-18DA6C8F-D93C-4484-BA07-D77C7A56F40F.jpg?type=w800',
          startingPrice: 1000,
          lastBidPrice: 25000,
          myLastBidPrice: 28000,
          isBid: false,
          bidDate: '2023-11-26'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
