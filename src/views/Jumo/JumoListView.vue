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
import { getSellerList } from '@/api/seller/sellerAPIService'
import { useToast } from 'vue-toastification'
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
        { text: '탈퇴 여부', value: 'isDeleted' }
      ],
      items: []
    }
  },
  methods: {
    goDetailJumo(item) {
      this.$router.push({
        path: `/jumo/jumoDetail/${item.sellerId}`
      })
    },
    async getSellerList() {
      const toast = useToast()
      try {
        const data = await getSellerList(0, 10)
        if (data.code === 200) {
          this.items = data.data.content
          toast.success('주모 정보를 불러왔어요.', {
            timeout: 2000
          })
        }
      } catch (err) {
        toast.error('주모 정보를 불러오는데 실패했어요.', {
          timeout: 2000
        })
      }
    }
  },
  mounted() {
    this.getSellerList()
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
