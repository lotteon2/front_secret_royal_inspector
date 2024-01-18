<template>
  <div class="close__btn">
    <div v-if="this.currentUser">{{ this.currentUser || 1 }} 명 동시 시청중</div>
    <div>현재 호가 | {{ this.bidInfo?.askingPrice || 0 }}원</div>
    <CustomButton btnText="방송 종료하기" btnType="negative" @click="finishStream"></CustomButton>
    <input v-model="askingPrice" type="number" placeholder="호가를 입력해주세요" />
    <CustomButton @click="changeAskingPrice" btnText="입력"></CustomButton>
    <div class="stream-right">
      <CustomButton @click="confirmBid" btnText="낙찰(테스트)"></CustomButton>
    </div>
  </div>
  <div class="live-body">
    <div>
      <video id="video" ref="video"></video>
    </div>
    <div>
      <div v-if="this.bidResultInfo">
        <h2>현재 입찰 내역</h2>
        <div v-for="(auctionProduct, idx) in bidResultInfo" :key="idx">
          <div :key="idx">
            <div>{{ auctionProduct?.auctionProductName }}</div>
            <div>시작가 | {{ auctionProduct?.startingPrice }}원</div>
          </div>
        </div>
      </div>
      <div v-if="this.bidInfo.bidHistoryList" class="bidResultInfo">
        <div class="bidHeader">현재 입찰 내역</div>
        <div v-for="(bidHistory, idx) in bidInfo.bidHistoryList" :key="idx" class="chatMessage">
          <CustomAvatar :imgSrc="bidHistory.profileImage" />
          <div>{{ bidHistory.nickname }}</div>
          <div>{{ bidHistory.bidPrice }}</div>
        </div>
      </div>
      <div class="chat" ref="chatContainer">
        <div v-for="(item, idx) in recvList" :key="idx" class="chat-box">
          <CustomAvatar :imgSrc="item.profileImage" />
          <span class="chat-name">{{ item.memberNickname }}</span>
          <span class="chat-message">{{ item.message }}</span>
        </div>
        <input
          v-model="message"
          type="text"
          @keyup="sendMessage"
          class="chat-input"
          placeholder="전통주점 채팅"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/common/CustomButton.vue'
import CustomAvatar from '@/components/common/CustomAvatar.vue'
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import { useToast } from 'vue-toastification'
import {
  finishStream,
  updateAskingPrice,
  confirmBidForAuction
} from '@/api/auction/auctionAPIService.ts'
export default {
  components: { CustomButton, CustomAvatar },
  data() {
    return {
      localMedia: null,
      room: null,
      auctionId: null,
      video: null,
      canvas: null,
      photoSrc: null,
      streaming: false,
      height: 0,
      width: 320,
      userName: '',
      message: '',
      recvList: [],
      bidInfo: { askingPrice: null, bidHistoryList: [], auctionProductList: [] },
      askingPrice: null,
      currentUser: 1,
      bidResultInfo: []
    }
  },
  mounted() {
    this.auctionId = this.$route.params.auctionId
    this.video = this.$refs.video
    this.canvas = this.$refs.canvas
    this.getMediaStream()
  },
  methods: {
    getMediaStream() {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          this.video.srcObject = stream
          this.video.play()
          this.connectChatSocket()
          this.connectBidInfoSocket()
          this.connectBidResultInfoSocket()
          this.connectRoomInfoSocket()
        })
        .catch((err) => {
          console.error(`error occurred : ${err}`)
        })
    },
    sendMessage(e) {
      if (e.keyCode === 13 && this.message !== '') {
        this.send()
        this.message = ''
      }
    },
    send() {
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          memberId: 0,
          message: this.message
        }
        this.stompClient.send(`/pub/chat/${this.auctionId}`, JSON.stringify(msg), {})
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer
      chatContainer.scrollTop = chatContainer.scrollHeight
    },
    connectBidResultInfoSocket() {
      const serverURL = 'https://api.jeontongju.shop/auction-service'
      const socket = new SockJS(`${serverURL}/chat`)
      const stompBidResultClient = Stomp.over(socket)
      console.log(
        `connectBidResultInfo| 소켓 연결을 시도합니다. 서버 주소: ${serverURL}/chat/sub/chat/${this.auctionId}`
      )
      stompBidResultClient.connect(
        {},
        (frame) => {
          console.log('BID RESULT INFO 소켓 연결 성공', frame)
          stompBidResultClient.subscribe(`/sub/bid-result/${this.auctionId}`, (res) => {
            console.log('BID RESULT INFO 구독으로 받은 메시지 입니다.', res.body)
            this.bidResultInfo = JSON.parse(res.body)
            console.log('HERE')
            console.log(this.bidResultInfo)
          })
        },
        (error) => {
          // 소켓 연결 실패
          console.log('BID RESULT INFO 소켓 연결 실패', error)
        }
      )
    },
    connectChatSocket() {
      const serverURL = 'https://api.jeontongju.shop/auction-service'
      const socket = new SockJS(`${serverURL}/chat`)
      const stompChatClient = Stomp.over(socket)
      stompChatClient.connect(
        {},
        (frame) => {
          console.log('CHAT | INFO 소켓 연결 성공', frame)
          stompChatClient.subscribe(`/sub/chat/${this.auctionId}`, (res) => {
            console.log('CHAT | INFO구독으로 받은 메시지 입니다.', res.body)
            this.recvList.push(JSON.parse(res.body))
            console.log(this.recvList)
          })
        },
        (error) => {
          console.log('소켓 연결 실패', error)
        }
      )
    },
    connectBidInfoSocket() {
      const serverURL = 'https://api.jeontongju.shop/auction-service'
      const socket = new SockJS(`${serverURL}/chat`)
      const stompBidInfoSocket = Stomp.over(socket)
      stompBidInfoSocket.connect(
        {},
        (frame) => {
          console.log('[BID INFO] 구독으로 받은 메시지 입니다', frame)
          stompBidInfoSocket.subscribe(`/sub/bid-info/${this.auctionId}`, (res) => {
            console.log('BID INFO 구독으로 받은 메시지 입니다.', res.body)
            this.bidInfo = JSON.parse(res.body)
          })
        },
        (error) => {
          console.log('BID INFO 소켓 연결 실패', error)
        }
      )
    },
    connectRoomInfoSocket() {
      const serverURL = 'https://api.jeontongju.shop/auction-service'
      const socket = new SockJS(`${serverURL}/chat`)
      const stompBidInfoSocket = Stomp.over(socket)
      stompBidInfoSocket.connect(
        {},
        (frame) => {
          console.log('[ROOM INFO] 구독으로 받은 메시지 입니다', frame)
          stompBidInfoSocket.subscribe(`/sub/auction-numbers/${this.auctionId}`, (res) => {
            console.log('ROOM INFO 구독으로 받은 메시지 입니다.', res.body)
            this.currentUser = Number(JSON.parse(res.body))
          })
        },
        (error) => {
          // 소켓 연결 실패
          console.log('BID INFO 소켓 연결 실패', error)
        }
      )
    },
    async finishStream() {
      const toast = useToast()
      try {
        const data = await finishStream(this.auctionId)
        if (data.code === 200) {
          toast.success(`성공적으로 방송이 종료됐어요.`, {
            timeout: 2000
          })
          this.isStreaming = false
          this.$router.replace(`/live/finish/${this.auctionId}`)
        }
      } catch (err) {
        toast.error('방송 종료에 실패했어요.', {
          timeout: 2000
        })
      }
    },
    async changeAskingPrice() {
      const toast = useToast()
      if (!this.askingPrice) {
        toast.error('호가를 입력해주세요', { timeout: 1000 })
        return
      }
      try {
        const data = await updateAskingPrice(this.auctionId, this.askingPrice)
        if (data.code === 200) {
          toast.success('호가 수정에 성공했어요', { timeout: 2000 })
          this.askingPrice = null
        }
      } catch (err) {
        toast.error('호가 수정에 실패했어요', { timeout: 2000 })
      }
    },
    async confirmBid() {
      const toast = useToast()
      try {
        const data = await confirmBidForAuction(this.auctionId)
        if (data.code === 200) {
          toast.success('낙찰에 성공했어요', { timeout: 2000 })
          this.askingPrice = null
        }
      } catch (err) {
        toast.error('낙찰에 실패했어요', { timeout: 2000 })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.close__btn {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    margin-top: 0;
  }
}

input {
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 0.5rem;
  box-sizing: border-box;
  margin-top: 0.3rem;
}

.stream {
  margin-left: 650px;
}

.stream-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.stream-right {
  flex: 1;
}

//css
.chat {
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 300px;
  height: 300px;
  width: 600px;
  overflow-y: scroll;
}

.chat-input {
  width: 100%;
  position: sticky;
  bottom: 0;
}

.chatMessage {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.chat-box {
  width: min-content;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: #ffe2e2;
  border-radius: 12px;
  padding: 0.5rem;
  margin: 0.2rem 0;
  gap: 1rem;

  span {
    white-space: nowrap;
  }

  .chat-name {
    font-weight: 800;
  }

  .chat-message {
    font-weight: 700;
  }
}

.chat-box::before {
  content: '';
  display: block;
  flex: 1;
}

.live-body {
  display: flex;
}

.bidResultInfo {
  border-radius: 12px;
  background-color: #ffe2e2;
  padding: 1rem;

  .bidHeader {
    font-size: 1.5rem;
  }
}
</style>
