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
    
    <label for="statusSelect">주문 상태를 선택해주세요</label>
    <select :value="selectedOrderStatus" @change="setSelectOrderStatus($event)" class="select">
      <option v-for="(label, value) in ORDER_STATE" :key="value" :value="label">
        {{ getOrderStatusLabel(label) }}
      </option>
    </select>

    <CustomTable :headers="header" :items="items"></CustomTable>
    <CustomPagination
      :on-change-page="onChangePage"
      :request-page="requestPage"
      :total-pages="totalPages"
    />
    <div v-if="isLoading">
      <img src="../assets/loading.gif" alt="loading" />
    </div>
  </div>
</template>

<script lang="ts" scoped>
import CustomPagination from '@/components/common/CustomPagination.vue'
import { getOrderListBySellerId } from '@/api/order/orderAPIService'
import type { GetOrderListBySellerIdResponseData } from '@/api/order/orderAPIService.types'
import CustomTable from '@/components/common/CustomTable.vue'
import { useMyInfoStore } from '@/stores/myInfo'
import { defineComponent } from 'vue'
import { useToast } from 'vue-toastification'
import { ORDER_STATE, translateOrderState } from '@/types/ORDER'
export default defineComponent({
  components: {
    CustomTable,
    CustomPagination
  },
  methods: {
    async onChangePage(page: number) {
      if (0 <= page && page < this.totalPages) {
        this.requestPage = page
      }
    },
    getSellerName() {
      const idx = this.sellers.findIndex(
        (seller) => Number(seller.value) === Number(this.selectedSeller)
      )
      return this.sellers[idx].label
    },
    setSelect(event) {
      this.selectedSeller = event.target.value
    },
    setSelectOrderStatus(event) {
    console.log(event.target);
      this.selectedOrderStatus = event.target.value
    },
    getOrderStatusLabel(orderStatus: keyof typeof ORDER_STATE) {
    return translateOrderState(orderStatus);
  },
    async getOrderListBySellerId(sellerId: number, page: number, size: number, orderStatus: keyof typeof ORDER_STATE | null) {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getOrderListBySellerId(sellerId, page, size, orderStatus)
        if (data.code === 200) {
          const newItems = data.data.content
          newItems.forEach(
            (it: GetOrderListBySellerIdResponseData, idx: number) =>
              (newItems[idx] = {
                ...newItems[idx],
                productTotalAmount: it.productTotalAmount
                  ? it.productTotalAmount.toLocaleString()
                  : 0,
                ordersId: it.isAuction ? `AU_${it.ordersId}` : `PR_${it.ordersId}`,
                isAuction: it.isAuction ? 'Y' : 'N',
                orderStatus: it.orderStatus ? translateOrderState(it.orderStatus) : '-'
              })
          )
          this.items = newItems
          this.totalPages = data.data.totalPages
        }
      } catch (error) {
        toast.error(`주문내역을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      } finally {
        this.isLoading = false
      }
    }
  },
  data() {
    return {
      selectedSeller: -1,
      header: [
        { text: '주모 이름', value: 'sellerName' },
        { text: '주문 번호', value: 'ordersId' },
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
      ],
      page: 0,
      totalPages: 0,
      requestPage: 0,
      isLoading: false,
      selectedOrderStatus: ORDER_STATE.ORDER,
      ORDER_STATE: ORDER_STATE
    } as {
      selectedSeller: number
      header: { text: string; value: string }[]
      items: GetOrderListBySellerIdResponseData[]
      sellers: { value: number; label: string }[]
      page: number
      totalPages: number
      requestPage: number
      isLoading: boolean
      selectedOrderStatus: keyof typeof ORDER_STATE | null
      ORDER_STATE: typeof ORDER_STATE
    }
  },
  mounted() {
    const myInfo = useMyInfoStore()
    this.sellers = myInfo.getSellers()
    this.selectedSeller = this.sellers ? this.sellers[0].value : -1
    this.getOrderListBySellerId(this.selectedSeller, 0, 10, this.selectedOrderStatus)
  },
  watch: {
    selectedOrderStatus: function (value) {
      console.log(value)
      this.getOrderListBySellerId(this.selectedSeller, 0, 10, value)
    },
    selectedSeller: function (value) {
      this.getOrderListBySellerId(value, 0, 10, this.selectedOrderStatus)
    },
    requestPage: function (value) {
      this.getOrderListBySellerId(this.selectedSeller, value, 10, this.selectedOrderStatus)
    }
  }
})
</script>

<style lang="scss" scoped>
select::-ms-expand {
  display: none;
}

.select {
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
}

option {
}
</style>
