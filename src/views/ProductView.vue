<template>
  <div>
    <label for="sellerSelect">주모를 선택해주세요</label>
    <template v-if="sellers">
      <select :value="selectedSeller" @change="setSelect($event)" class="select">
        <option id="sellerSelect" v-for="seller in sellers" :key="seller.value" :value="seller.value">
          {{ seller.label }}
        </option>
      </select>
    </template>
    <CustomTable :headers="header" :items="items" @rowClick="handleClickRow"></CustomTable>
  </div>
  <div v-if="isLoading">
    <img src="../assets/loading.gif" alt="loading" />
  </div>
  <CustomModal v-if="popState" :modalTitle="this.modalTitle" btnText1="비공개로 바꾸기" btnText2="공개로 바꾸기"
    @btnClick1="() => handleChangeVisibility(false)" @btnClick2="() => handleChangeVisibility(true)"></CustomModal>
</template>

<script lang="ts" scoped>
import { useMyInfoStore } from '@/stores/myInfo'
import CustomTable from '@/components/common/CustomTable.vue'
import CustomModal from '@/components/common/CustomModal.vue'
import { useToast } from 'vue-toastification'
import { getProductListBySellerId } from '@/api/search/searchAPIService.ts'
import type { GetProductListBySellerIdResponseData } from '@/api/search/searchAPIService.types'
import { updateProductVisibility } from '@/api/product/productAPIService.ts'

export default {
  components: {
    CustomTable,
    CustomModal
  },
  methods: {
    getSellerName() {
      const idx = this.sellers.findIndex(
        (seller) => Number(seller.value) === Number(this.selectedSeller)
      )
      return this.sellers[idx].label
    },
    setSelect(event) {
      this.selectedSeller = event.target.value
    },
    changePopState() {
      this.popState = !this.popState
    },
    handleClickRow(items: GetProductListBySellerIdResponseData) {
      this.changePopState()
      this.modalTitle = items.productName
      this.isActivate = items.isActivate
      this.selectedProductId = items.productId
    },

    async handleChangeVisibility(isActivate: boolean) {
      const toast = useToast()
      try {
        const data = await updateProductVisibility(this.selectedProductId, { isActivate })
        if (data.code === 200) {
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
    async getProductListBySellerId(sellerId: number, page: number, size: number) {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getProductListBySellerId(sellerId, page, size)
        if (data.code === 200) {
          const newItems = data.data.content
          newItems.forEach(
            (it: GetProductListBySellerIdResponseData, idx: number) =>
              (newItems[idx] = { ...newItems[idx], sellerName: this.getSellerName() })
          )
          this.items = newItems
          this.isLoading = false
        }
      } catch (error) {
        toast.error(`주문의 상품내역을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      }
    }
  },
  data() {
    return {
      selectedSeller: -1,
      header: [
        { text: '주모 이름', value: 'sellerName' },
        { text: '상품 이름', value: 'productName' },
        { text: '판매량', value: 'totalSalesCount' },
        { text: '총 가격', value: 'productPrice' },
        { text: '재고', value: 'stockQuantity' },
        { text: '리뷰 개수', value: 'reviewCount' },
        { text: '쇼츠', value: 'shortsId' },
        { text: '공개 여부', value: 'isActivate' }
      ],
      items: [],
      sellers: [],
      isLoading: true,
      modalTitle: '',
      isActivate: false,
      selectedProductId: '-1',
      popState: false
    } as {
      selectedSeller: number
      header: { text: string; value: string }[]
      items: GetProductListBySellerIdResponseData[]
      sellers: { value: number; label: string }[]
      isLoading: boolean
      modalTitle: string
      isActivate: boolean
      selectedProductId: string
      popState: boolean
    }
  },
  mounted() {
    const myInfo = useMyInfoStore()
    this.sellers = myInfo.getSellers()
    console.log(this.sellers)
    this.selectedSeller = this.sellers ? this.sellers[0].value : -1
    this.getProductListBySellerId(this.selectedSeller, 0, 10)
  },
  watch: {
    selectedSeller: function (value) {
      this.getProductListBySellerId(value, 0, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
select::-ms-expand {
  display: none;
}

.select {
  font-family: 'BMDOHYEON';
  margin-left: 1rem;
  margin-bottom: 1rem;
  background-size: 20px;
  padding: 5px 30px 5px 10px;
  border-radius: 4px;
  outline: 0 none;
  background: url('@/assets/arrow.jpeg') no-repeat 95% 50%;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.select option {
  background: black;
  color: #fff;
  padding: 3px 0;
  font-family: 'BMDOHYEON';
}

select:hover {
  border-color: #888;
}

select:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}

select:disabled {
  opacity: 0.5;
}

label {
  margin-bottom: 1rem;
  font-family: 'BMDOHYEON';
}

option {
  font-family: 'BMDOHYEON';
}
</style>
