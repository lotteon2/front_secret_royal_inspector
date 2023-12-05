<template>
  <div class="jumoList">
    <div class="infoSection">
      <div>행을 클릭하면 유저 상세 페이지로 이동해요.</div>
    </div>
    <CustomTable :headers="header" :items="items" @rowClick="goDetailJumo"></CustomTable>
  </div>
</template>

<script>
import CustomTable from '@/components/common/CustomTable.vue'
export default {
  components: { CustomTable },
  data() {
    return {
      header: [
        { text: '', value: 'storeImageUrl' },
        { text: '주모', value: 'storeName' },
        { text: '이메일', value: 'email' },
        { text: '대표자', value: 'businessmanName' },
        { text: '대표번호', value: 'storePhoneNumber' },
        { text: '주모소개', value: 'storeDescription' },
        { text: '승인여부', value: 'approvalState' },
        { text: '가입일', value: 'createdAt' },
        { text: '탈퇴 여부', value: 'isActivate' }
      ],
      items: [
        {
          sellerId: 1,
          email: 'seller1@naver.com',
          businessmanName: '이우쪽',
          storeName: '우리도가',
          storePhoneNumber: '0701234567',
          createdAt: '2023-10-11T10:10:11',
          approvalState: 'ALLOW',
          isActivate: true,
          storeDescription: '맛있는 술 싸게 팔아요',
          storeImageUrl:
            'https://i.namu.wiki/i/X41e9ocvhIVMMdXi6r2jmujAbVnvYEIlr7YDg5rWozymdF-JJdy3aoVqSr_O-8eTWMkTilXWUHarVCubrC22yw.webp'
        },
        {
          sellerId: 2,
          email: 'seller2@naver.com',
          businessmanName: '김우쪽',
          storeName: '우리도가',
          storePhoneNumber: '0701234567',
          createdAt: '2023-10-11T10:10:11',
          approvalState: 'ALLOW',
          isActivate: true,
          storeDescription: '맛있는 술 싸게 팔아요',
          storeImageUrl:
            'https://i.namu.wiki/i/X41e9ocvhIVMMdXi6r2jmujAbVnvYEIlr7YDg5rWozymdF-JJdy3aoVqSr_O-8eTWMkTilXWUHarVCubrC22yw.webp'
        },
        {
          sellerId: 3,
          email: 'seller3@naver.com',
          businessmanName: '장장우쪽',
          storeName: '우리도가',
          storePhoneNumber: '0701234567',
          createdAt: '2023-10-11T10:10:11',
          approvalState: 'ALLOW',
          isActivate: true,
          storeDescription: '맛있는 술 싸게 팔아요',
          storeImageUrl:
            'https://i.namu.wiki/i/X41e9ocvhIVMMdXi6r2jmujAbVnvYEIlr7YDg5rWozymdF-JJdy3aoVqSr_O-8eTWMkTilXWUHarVCubrC22yw.webp'
        },
        {
          sellerId: 4,
          email: 'seller4@naver.com',
          businessmanName: '최최우쪽',
          storeName: '우리도가',
          storePhoneNumber: '0701234567',
          createdAt: '2023-10-11T10:10:11',
          approvalState: 'WAIT',
          isActivate: true,
          storeDescription: '맛있는 술 싸게 팔아요',
          storeImageUrl:
            'https://i.namu.wiki/i/X41e9ocvhIVMMdXi6r2jmujAbVnvYEIlr7YDg5rWozymdF-JJdy3aoVqSr_O-8eTWMkTilXWUHarVCubrC22yw.webp'
        },
        {
          sellerId: 5,
          email: 'seller5@naver.com',
          businessmanName: '마우쪽',
          storeName: '우리도가',
          storePhoneNumber: '0701234567',
          createdAt: '2023-10-11T10:10:11',
          approvalState: 'DENY',
          isActivate: true,
          storeDescription: '맛있는 술 싸게 팔아요',
          storeImageUrl:
            'https://i.namu.wiki/i/X41e9ocvhIVMMdXi6r2jmujAbVnvYEIlr7YDg5rWozymdF-JJdy3aoVqSr_O-8eTWMkTilXWUHarVCubrC22yw.webp'
        }
      ]
    }
  },
  methods: {
    goDetailJumo(item) {
      this.$router.push({
        path: `/jumo/jumoDetail/${item.sellerId}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.jumoList {
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
