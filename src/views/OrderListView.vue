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
import { getOrderListBySellerId } from '@/api/order/orderAPIService'
import type { GetOrderListBySellerIdResponseData } from '@/api/order/orderAPIService.types'
import CustomTable from '@/components/common/CustomTable.vue'
import { useMyInfoStore } from '@/stores/myInfo'
import { defineComponent } from 'vue'
import { useToast } from 'vue-toastification'
export default defineComponent({
  components: {
    CustomTable
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
    async getOrderListBySellerId(sellerId: number, page: number, size: number) {
      const toast = useToast()
      try {
        const data = await getOrderListBySellerId(sellerId, page, size)
        if (data.code === 200) {
          toast.success(`주문내역을 성공적으로 불러왔어요.`, {
            timeout: 2000
          })
          const newItems = data.data.content
          newItems.forEach(
            (it: GetOrderListBySellerIdResponseData, idx: number) =>
              (newItems[idx] = { ...newItems[idx], sellerName: this.getSellerName() })
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
        { text: '판매량', value: 'productCount' },
        { text: '총 가격', value: 'productTotalAmount' },
        { text: '주문 날짜', value: 'orderDate' },
        { text: '결제 수단', value: 'paymentType' },
        { text: '배송 상태', value: 'orderStatus' },
        { text: '경매 여부', value: 'isAuction' }
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
      items: GetOrderListBySellerIdResponseData[]
      sellers: { value: number; label: string }[]
    }
  },
  mounted() {
    const myInfo = useMyInfoStore()
    this.sellers = myInfo.getSellers()
    this.selectedSeller = this.sellers ? this.sellers[0].value : -1
    this.getOrderListBySellerId(this.selectedSeller, 0, 10)
  },
  watch: {
    selectedSeller: function (value) {
      this.getOrderListBySellerId(value, 0, 10)
    }
  }
})
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
