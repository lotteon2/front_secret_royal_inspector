<template>
  <div v-if="!this.isStreaming" class="preview-screen">
    <div class="preview-screen__header">
      <h2>미리 보기 화면</h2>
      <CustomButton btnText="방송 시작하기" @click="startStream"></CustomButton>
    </div>
    <div>카메라와 마이크를 확인해주세요</div>
  </div>
  <div v-else>
    <div class="close__btn">
      <div v-if="this.bidInfo">현재 호가 | {{ this.bidInfo.askingPrice }}</div>
      <CustomButton btnText="방송 종료하기" btnType="negative" @click="finishStream"></CustomButton>
      <input v-model="askingPrice" type="number" placeholder="호가를 입력해주세요" />
      <CustomButton @click="changeAskingPrice" btnText="입력"></CustomButton>
      <div class="stream-right">
        <CustomButton @click="confirmBid" btnText="낙찰(테스트)"></CustomButton>
      </div>
    </div>
  </div>
  <video id="video" ref="video"></video>
  <!-- <div v-if="this.isStreaming" class="stream"> -->
  <div v-if="this.isStreaming" class="chat">
    <div v-for="(item, idx) in recvList" :key="idx" class="chat-box">
      <CustomAvatar :imgSrc="item.memberProfileImage" />
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
  <!-- </div> -->

  <div v-if="this.isStreaming" class="stream">
    <div class="stream-right">
      <div v-if="bidInfo">
        <div class="messageBox" v-for="(item, idx) in bidInfo.bidHistory" :key="idx">
          <CustomAvatar alt="profileImg" :src="item.profileImage" />
          <h3>이름: {{ item.nickname }}</h3>
          <h3>메시지: {{ item.bidPrice }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/common/CustomButton.vue'
import CustomAvatar from '@/components/common/CustomAvatar.vue'
import { useToast } from 'vue-toastification'
import {
  startStream,
  finishStream,
  updateAskingPrice,
  confirmBidForAuction
} from '@/api/auction/auctionAPIService.ts'
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
export default {
  components: { CustomButton, CustomAvatar },
  data() {
    return {
      isStreaming: false,
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
      bidInfo: null,
      askingPrice: null
    }
  },
  mounted() {
    this.auctionId = this.$route.params.auctionId
    this.video = this.$refs.video
    this.canvas = this.$refs.canvas
    this.getMediaStream()
    this.connect()
  },
  methods: {
    getMediaStream() {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          this.video.srcObject = stream
          this.video.play()
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
      }
    },
    connect() {
      const serverURL = 'https://api.jeontongju.shop/auction-service'
      let socket = new SockJS(`${serverURL}/chat`)
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect(
        {},
        (frame) => {
          this.stompClient.connected = true
          console.log('CHAT | INFO 소켓 연결 성공', frame)
          this.stompClient.subscribe(`/sub/chat/${this.auctionId}`, (res) => {
            console.log('CHAT | INFO구독으로 받은 메시지 입니다.', res.body)
            this.recvList.push(JSON.parse(res.body))
            console.log(this.recvList)
          })
        },
        (error) => {
          console.log('소켓 연결 실패', error)
          this.stompClient.connect = false
        }
      )
    },
    connectAuctionInfo() {
      console.log('here')
      const serverURL = 'https://api.jeontongju.shop/auction-service'
      let socket = new SockJS(`${serverURL}/chat`)
      this.stompClient = Stomp.over(socket)
      console.log(
        `BID INFO | 소켓 연결을 시도합니다. 서버 주소: ${serverURL}/chat/sub/chat/${this.auctionId}`
      )
      this.stompClient.connect(
        {},
        (frame) => {
          this.stompClient.connected = true
          console.log('BID INFO 소켓 연결 성공', frame)
          this.stompClient.subscribe(`/sub/bid-info/${this.auctionId}`, (res) => {
            console.log('BID INFO 구독으로 받은 메시지 입니다.', res.body)
            this.bidInfo = JSON.parse(res.body)
            console.log('HERE')
            console.log(this.bidInfo)
          })
        },
        (error) => {
          // 소켓 연결 실패
          console.log('BID INFO 소켓 연결 실패', error)
          this.stompClient.connected = false
        }
      )
    },
    connectRoomInfo() {
      const serverURL = 'https://api.jeontongju.shop/auction-service'
      let socket = new SockJS(`${serverURL}/chat`)
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect(
        {},
        (frame) => {
          this.connected = true
          console.log('[ROOM RESULT] 구독으로 받은 메시지 입니다', frame)
          this.stompClient.subscribe(`/sub/auction-numbers/${this.auctionId}`, (res) => {
            console.log('ROOM INFO 구독으로 받은 메시지 입니다.', res.body)
            const test = JSON.parse(res.body)
            console.log(test)
          })
        },
        (error) => {
          // 소켓 연결 실패
          console.log('ROOM INFO 소켓 연결 실패', error)
          this.connected = false
        }
      )
    },
    connectBidInfo() {
      const serverURL = 'https://api.jeontongju.shop/auction-service'
      let socket = new SockJS(`${serverURL}/chat`)
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect(
        {},
        (frame) => {
          this.connected = true
          console.log('[BID RESULT] 구독으로 받은 메시지 입니다', frame)
          this.stompClient.subscribe(`/sub/bid-info/${this.auctionId}`, (res) => {
            console.log('BID INFO 구독으로 받은 메시지 입니다.', res.body)
            const test = JSON.parse(res.body)
            console.log(test)
          })
        },
        (error) => {
          // 소켓 연결 실패
          console.log('BID INFO 소켓 연결 실패', error)
          this.connected = false
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
    async startStream() {
      const toast = useToast()
      try {
        const data = await startStream(this.auctionId)
        if (data.code === 200) {
          this.isStreaming = true
          this.connect()
          this.connectAuctionInfo()
          this.connectBidInfo()
          this.connectRoomInfo()
          toast.success(`성공적으로 방송이 시작됐어요.`, {
            timeout: 2000
          })
        }
      } catch (err) {
        toast.error('방송 시작에 실패했어요.', {
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
video,
#local-video {
  border-radius: 12px;
}

.preview-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

video {
  width: 600px;
}

.preview-screen__header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

li {
  list-style-type: none;
}

#local-container {
  margin-top: 0.5rem;
}

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
  font-family: 'BMDOHYEON';
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
  position: relative;
  max-height: 30%;
  height: 40%;
  width: 600px;
  overflow-y: scroll;
}

<!-- .chat-box {
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

  .chat-input {
    position: absolute;
    bottom: 5%;
  }

  .chat-name {
    font-weight: 800;
  }

  .chat-message {
    font-weight: 700;
  }
}

.chat {
  display: flex;
  flex-direction: column;
}

.chat-box::before {
  content: '';
  display: block;
  flex: 1;
}
-- > .chat {
  position: relative;
  max-height: 300px;
  height: 300px;
  width: 600px;
  overflow-y: scroll;

  input {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
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

  .chat-input {
    position: sticky;
    bottom: 0;
  }

  .chat-name {
    font-weight: 800;
  }

  .chat-message {
    font-weight: 700;
  }
}

.chat {
  display: flex;
  flex-direction: column;
}

.chat-box::before {
  content: '';
  display: block;
  flex: 1;
}
</style>
