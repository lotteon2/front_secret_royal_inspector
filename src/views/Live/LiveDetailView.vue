<template>
  <div class="live-detail">
    <div class="live-detail__title">{{ title }}</div>
    <div class="live-detail__desc">
      <div class="live-detail__desc__status">
        {{ description }} <AuctionState :state="this.status"></AuctionState>
      </div>
      <div class="live-detail__desc__date">{{ startDate }} - {{ endDate }}</div>
    </div>
    <div class="live-detail__btns">
      <CustomButton
        v-if="this.status !== 'AFTER'"
        btnText="수정하기"
        :handleClick="openEditModal"
      ></CustomButton>
      <CustomButton
        v-if="this.status !== 'AFTER'"
        btnText="삭제하기"
        :handleClick="deleteAuction"
      ></CustomButton>
      <CustomButton
        v-if="this.status !== 'AFTER'"
        btnText="방송하기"
        :handleClick="startStreaming"
      ></CustomButton>
    </div>
    <CustomTable :headers="header" :items="items" @rowClick="handleClickRow"></CustomTable>
    <CustomModal
      v-if="this.status === 'BEFORE' && popState"
      :modalTitle="this.modalTitle"
      btnText1="승인"
      btnText2="반려"
      @btnClick1="() => handleApprove('ALLOW')"
      @btnClick2="() => handleApprove('DENY')"
    ></CustomModal>
    <CustomModal
      v-if="this.status !== 'AFTER' && updateModalPopState"
      :canUpdate="true"
      :modalTitle="this.updateModalTitle"
      :modalDesc="this.updateModalDesc"
      @editTitle="handleChangeEditModalTitle"
      @editDesc="handleChangeEditModalDesc"
      btnText1="닫기"
      btnText2="수정"
      @btnClick1="() => changeEditModalPopState()"
      @btnClick2="() => editAuction()"
    ></CustomModal>
  </div>
</template>

<script scoped>
import AuctionState from '@/components/Auction/AuctionState.vue'
import CustomTable from '@/components/common/CustomTable.vue'
import CustomModal from '@/components/common/CustomModal.vue'
import CustomButton from '@/components/common/CustomButton.vue'
import {
  getAuctionDetailByAuctionId,
  approveAuctionByAuctionProductId,
  startStream,
  updateAuction,
  deleteAuction
} from '@/api/auction/auctionAPIService.ts'
import { useToast } from 'vue-toastification'
export default {
  name: 'LiveDetailView',
  components: {
    AuctionState,
    CustomTable,
    CustomModal,
    CustomButton
  },
  mounted() {
    this.auctionId = this.$route.params.auctionId
    this.status = this.$route.params.status
    this.getAuctionDetailByAuctionId()
  },
  data() {
    return {
      auctionId: -1,
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: '',
      auctionProductId: '',
      header: [],
      items: [],
      popState: false,
      modalTitle: '',
      updateModalPopState: false,
      updateModalTitle: '',
      updateModalDesc: ''
    }
  },
  methods: {
    changePopState() {
      this.popState = !this.popState
    },
    changeEditModalPopState() {
      this.updateModalPopState = !this.updateModalPopState
    },
    handleChangeEditModalTitle(title) {
      console.log(title)
      this.updateModalTitle = title
    },
    handleChangeEditModalDesc(desc) {
      this.updateModalDesc = desc
    },
    handleClickRow(items) {
      if (this.status === 'BEFORE') {
        if (items.status === 'WAIT') {
          this.changePopState()
          this.modalTitle = items.sellerName
          this.auctionProductId = items.auctionProductId
        }
      }
    },
    openEditModal() {
      this.changeEditModalPopState()
      this.updateModalTitle = this.title
      this.updateModalDesc = this.description
    },
    async deleteAuction() {
      const toast = useToast()
      try {
        const data = await deleteAuction(this.auctionId)
        if (data.code === 200) {
          this.$router.replace('/live')
        }
      } catch (err) {
        toast.error('경매 삭제에 실패했어요.', {
          timeout: 2000
        })
      }
    },
    async editAuction() {
      const toast = useToast()
      try {
        const data = await updateAuction(this.auctionId, {
          title: this.updateModalTitle,
          description: this.updateModalDesc
        })
        if (data.code === 200) {
          toast.success(`성공적으로 경매가 수정됐어요.`, {
            timeout: 2000
          })
          this.title = this.updateModalTitle
          this.description = this.updateModalDesc
          this.changeEditModalPopState()
        }
      } catch (err) {
        toast.error('경매 수정에 실패했어요.', {
          timeout: 2000
        })
      }
    },
    async startStreaming() {
      this.$router.replace(`/live/lobby/${this.auctionId}`)
    },
    async handleApprove(approvalState) {
      const toast = useToast()
      try {
        const data = await approveAuctionByAuctionProductId(this.auctionProductId, approvalState)
        if (data.code === 200) {
          toast.success(`성공적으로 ${approvalState === 'ALLOW' ? '승인' : '반려'}했어요.`, {
            timeout: 2000
          })

          const idx = this.items.findIndex(
            (item) => item.auctionProductId === this.auctionProductId
          )
          this.items[idx].status = approvalState
          this.changePopState()
        }
      } catch (error) {
        toast.error('승인 실패했어요.', {
          timeout: 2000
        })
      }
    },
    async getAuctionDetailByAuctionId() {
      const toast = useToast()
      try {
        const data = await getAuctionDetailByAuctionId(this.auctionId, this.status)
        if (data.code === 200) {
          const { title, description, startDate, endDate } = data.data.auction
          this.title = title
          this.description = description
          this.startDate = startDate.slice(0, 10)
          this.endDate = endDate ? endDate.slice(0, 10) : ''
          this.items = data.data.productList
          this.header =
            this.status === 'AFTER'
              ? [
                  { text: '', value: 'productImageUrl' },
                  { text: '주모 이름', value: 'sellerName' },
                  { text: '상품 이름', value: 'productName' },
                  { text: '상품이름', value: 'productName' },
                  { text: '시작가', value: 'startingPrice' },
                  { text: '낙찰가', value: 'lastBidPrice' },
                  { text: '낙찰자', value: 'consumerId' },
                  { text: '참여자수', value: 'totalBid' },
                  { text: '도수', value: 'alcoholDegree' },
                  { text: '용량', value: 'capacity' }
                ]
              : [
                  { text: '', value: 'productImageUrl' },
                  { text: '가게이름', value: 'sellerName' },
                  { text: '이메일', value: 'sellerEmail' },
                  { text: '대표자 이름', value: 'businessmanName' },
                  { text: '신청일자', value: 'createdAt' },
                  { text: '상품이름', value: 'productName' },
                  { text: '도수', value: 'alcoholDegree' },
                  { text: '용량', value: 'capacity' },
                  { text: '시작가', value: 'startingPrice' },
                  { text: '승인여부', value: 'status' }
                ]
        }
      } catch (err) {
        toast.error('라이브경매 상세 정보를 불러오는데 실패했어요.', {
          timeout: 2000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.live-detail {
  margin-top: 1rem;

  .live-detail__title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .live-detail__btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
  }

  .live-detail__desc {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;

    .live-detail__desc__status {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .live-detail__desc__date {
      text-align: end;
      height: 1.5rem;
      color: #e6e6e6;
    }
  }
}
</style>
