<template>
  <div>
    <label for="sellerSelect">주모를 선택해주세요</label>
    <template v-if="sellers">
      <select :value="selectedSeller" @change="setSelect($event)" class="select">
        <option
          id="sellerSelect"
          v-for="seller in sellers"
          :key="seller.value"
          :value="seller.value"
        >
          {{ seller.label }}
        </option>
      </select>
    </template>
    <CustomTable :headers="header" :items="items"></CustomTable>
  </div>
</template>

<script lang="ts" scoped>
import { useMyInfoStore } from '@/stores/myInfo'
import CustomTable from '@/components/common/CustomTable.vue'
import { useToast } from 'vue-toastification'
import { getProductListBySellerId } from '@/api/search/searchAPIService.ts'
import type { GetProductListBySellerIdResponseData } from '@/api/search/searchAPIService.types'

export default {
  components: {
    CustomTable
  },
  methods: {
    setSelect(event) {
      this.selectedSeller = event.target.value
    },
    async getProductListBySellerId(sellerId: number, page: number, size: number) {
      const toast = useToast()
      try {
        const data = await getProductListBySellerId(sellerId, page, size)
        if (data.code === 200) {
          toast.success(`주문내역을 성공적으로 불러왔어요.`, {
            timeout: 2000
          })
          const newItems = data.data.content
          newItems.forEach(
            (it: GetProductListBySellerIdResponseData, idx: number) =>
              (newItems[idx] = { ...newItems[idx], sellerName: this.sellers[0].label })
          )
          this.items = newItems
        }
      } catch (error) {
        toast.error(`주문내역을 불러오는데 실패했어요.`, {
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
      sellers: [
        {
          value: 1,
          label: '우리도가'
        }
      ]
    } as {
      selectedSeller: number
      header: { text: string; value: string }[]
      items: GetProductListBySellerIdResponseData[]
      sellers: { value: number; label: string }[]
    }
  },
  mounted() {
    const myInfo = useMyInfoStore()
    this.sellers = myInfo.sellers
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

<style lang="scss" scoped></style>
