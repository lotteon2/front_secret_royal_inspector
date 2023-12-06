<template>
  <div class="jumo-product-list">
    <div class="jumo-product-list__info-section">
      <div>행을 클릭하면 상품의 공개 여부를 변경할 수 있어요.</div>
    </div>
    <CustomTable :headers="header" :items="items" @rowClick="handleClickRow"></CustomTable>
    <CustomModal
      v-if="popState"
      :modalTitle="this.modalTitle"
      btnText1="비공개로 바꾸기"
      btnText2="공개로 바꾸기"
      @btnClick1="() => handleChangeVisibility(false)"
      @btnClick2="() => handleChangeVisibility(true)"
    ></CustomModal>
  </div>
</template>

<script>
import CustomTable from '@/components/common/CustomTable.vue'
import CustomModal from '@/components/common/CustomModal.vue'
import { updateProductVisibility } from '@/api/product/productAPIService.ts'
import { useToast } from 'vue-toastification'

export default {
  components: {
    CustomTable,
    CustomModal
  },
  methods: {
    changePopState() {
      this.popState = !this.popState
    },
    async handleChangeVisibility(isActivate) {
      const toast = useToast()
      try {
        const data = await updateProductVisibility(this.selectedProductId, { isActivate })
        if (data.code === 200) {
          toast.success(`상품 공개 상태가 변경되었어요.`, {
            timeout: 2000
          })
          const idx = this.items.findIndex((item) => item.productId === this.selectedProductId)
          this.items[idx].isActivate = isActivate
          this.changePopState()
        }
      } catch (err) {
        toast.fail(`상품 공개 상태가 변경에 실패했어요.`, {
          timeout: 2000
        })
      }
    },
    handleClickRow(items) {
      this.changePopState()
      this.modalTitle = items.productName
      this.isActivate = items.isActivate
      this.selectedProductId = items.productId
    }
  },
  data() {
    return {
      sellerId: -1,
      popState: false,
      modalTitle: '',
      isActivate: null,
      selectedProductId: -1,
      header: [
        { text: '상품 이름', value: 'productName' },
        { text: '총 판매량', value: 'totalSalesCount' },
        { text: '개당 가격', value: 'productPrice' },
        { text: '재고', value: 'stockQuantity' },
        { text: '리뷰 수', value: 'reviewCount' },
        { text: '쇼츠', value: 'shortsId' },
        { text: '공개여부', value: 'isActivate' }
      ],
      items: [
        {
          productId: '280a8a4d-a27f-4d01-b031-2a003cc4c039',
          productName: '복순도가',
          totalSalesCount: 100,
          productPrice: 30000,
          stockQuantity: 5,
          reviewCount: 3,
          shortsId: 12,
          isActivate: true
        },
        {
          productId: '280a8a4d-a27f-4d01-b031-2a003cc4c030',
          productName: '안동소주',
          totalSalesCount: 100,
          productPrice: 20000,
          stockQuantity: 5,
          reviewCount: 3,
          shortsId: 10,
          isActivate: true
        }
      ]
    }
  },
  mounted() {
    this.sellerId = this.$route.params.sellerId
    console.log(this.sellerId)
  }
}
</script>

<style lang="scss" scoped>
.jumo-product-list {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  .jumo-product-list__info-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0;
  }
}
</style>
