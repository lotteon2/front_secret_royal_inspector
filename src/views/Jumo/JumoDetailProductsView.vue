<template>
  <div class="jumo-product-list">
    <div class="jumo-product-list__info-section">
      <div>행을 클릭하면 상품의 공개 여부를 변경할 수 있어요.</div>
    </div>
    <div class="jumo-product-list-table" v-if="items.length > 0">
      <CustomTable :headers="header" :items="items" @rowClick="handleClickRow"></CustomTable>
      <CustomPagination
        :on-change-page="onChangePage"
        :request-page="requestPage"
        :total-pages="totalPages"
      />
    </div>
    <div v-else>해당 주모의 상품 내역이 비어있어요.</div>
    <CustomModal
      v-if="popState"
      :modalTitle="this.modalTitle"
      btnText1="비공개로 바꾸기"
      btnText2="공개로 바꾸기"
      @btnClick1="() => handleChangeVisibility(false)"
      @btnClick2="() => handleChangeVisibility(true)"
      @closeBtnClick="this.changePopState"
    ></CustomModal>
  </div>
</template>

<script lang="ts" scoped>
import CustomPagination from '@/components/common/CustomPagination.vue'
import CustomTable from '@/components/common/CustomTable.vue'
import CustomModal from '@/components/common/CustomModal.vue'
import { updateProductVisibility } from '@/api/product/productAPIService.ts'
import { getProductListBySellerId } from '@/api/search/searchAPIService.ts'
import { useToast } from 'vue-toastification'
import type { GetProductListBySellerIdResponseData } from '@/api/search/searchAPIService.types'

export default {
  components: {
    CustomTable,
    CustomModal,
    CustomPagination
  },
  methods: {
    async onChangePage(page: number) {
      if (0 <= page && page < this.totalPages) {
        this.requestPage = page
      }
    },
    changePopState() {
      this.popState = !this.popState
    },
    async getSellerProducts(page: number, size: number) {
      const toast = useToast()
      try {
        const data = await getProductListBySellerId(this.sellerId, page, size)
        if (data.code === 200) {
          const newItems = data.data.content
          newItems.forEach(
            (it, idx) =>
              (newItems[idx] = {
                ...newItems[idx],
                productPrice: it.productPrice ? it.productPrice.toLocaleString() : 0,
                stockQuantity: it.stockQuantity ? it.stockQuantity.toLocaleString() : 0,
                shortsId: it.shortsId ? it.shortsId : '-',
                isActivate: it.isActivate ? 'Y' : 'N',
                totalSalesCount: it.totalSalesCount ? it.totalSalesCount.toLocaleString() : 0
              })
          )
          this.items = newItems
          this.totalPages = data.data.totalPages
        }
      } catch (err) {
        toast.error(`상품 조회에 변경에 실패했어요.`, {
          timeout: 2000
        })
      }
    },
    async handleChangeVisibility(isActivate: boolean) {
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
        toast.error(`상품 공개 상태가 변경에 실패했어요.`, {
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
      isActivate: false,
      selectedProductId: '-1',
      header: [
        { text: '상품 이름', value: 'productName' },
        { text: '총 판매량', value: 'totalSalesCount' },
        { text: '개당 가격(원)', value: 'productPrice' },
        { text: '재고', value: 'stockQuantity' },
        { text: '리뷰 수', value: 'reviewCount' },
        { text: '쇼츠', value: 'shortsId' },
        { text: '공개 여부', value: 'isActivate' }
      ],
      items: [],
      page: 0,
      totalPages: 0,
      requestPage: 0,
      isLoading: false
    } as {
      sellerId: number
      popState: boolean
      modalTitle: string
      isActivate: boolean
      selectedProductId: string
      header: { text: string; value: string }[]
      items: GetProductListBySellerIdResponseData[]
      page: number
      totalPages: number
      requestPage: number
      isLoading: boolean
    }
  },
  mounted() {
    this.sellerId = Number(this.$route.params.sellerId)
    this.getSellerProducts(0, 6)
  },
  watch: {
    requestPage: function (value) {
      this.getSellerProducts(value, 6)
    }
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
  .jumo-product-list-table {
    width: 100%;
  }
}
</style>
