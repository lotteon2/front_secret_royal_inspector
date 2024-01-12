<template>
  <div v-if="!this.isStreaming" class="preview-screen">
    <div class="preview-screen__header">
      <h2>미리 보기 화면</h2>
      <CustomButton btnText="방송 시작하기" @click="startStream"></CustomButton>
    </div>
    <div>카메라와 마이크를 확인해주세요</div>
    <video id="video" ref="video" @canplay="playVideo"></video>
  </div>
  <div v-if="this.isStreaming" class="close__btn">
    <CustomButton btnText="방송 종료하기" btnType="negative" @click="finishStream"></CustomButton>
    <input v-model="askingPrice" type="number" placeholder="호가를 입력해주세요" />
    <CustomButton @click="changeAskingPrice" btnText="입력"></CustomButton>
  </div>
  <div class="stream">
    <div class="stream-left">
      <div id="local-container"></div>
      <div v-if="this.isStreaming" class="chat">
        <div v-for="(item, idx) in recvList" :key="idx" class="chat-box">
          <CustomAvatar :src="item.memberProfileImage" />
          <!-- <img alt="profileImg" :src="item.memberProfileImage" /> -->
          <span class="chat-name">{{ item.memberNickname }}</span>
          <span class="chat-message">{{ item.message }}</span>
        </div>
        <input v-model="message" type="text" @keyup="sendMessage" class="chat-input" />
      </div>
    </div>
    <div v-if="this.isStreaming" class="stream-right">
      내용: <input v-model="message" type="text" @keyup="sendMessage" />
      <div class="messageBox" v-for="(item, idx) in auctionList" :key="idx">
        <img alt="profileImg" :src="item.memberProfileImage" />
        <h3>이름: {{ item.memberNickname }}</h3>
        <h3>메시지: {{ item.message }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/common/CustomButton.vue'
import CustomAvatar from '@/components/common/CustomAvatar.vue'
import ConnectLive from '@connectlive/connectlive-web-sdk'
import { useToast } from 'vue-toastification'
import { startStream, finishStream, updateAskingPrice } from '@/api/auction/auctionAPIService.ts'
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
      auctionList: [],
      askingPrice: null
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
      console.log('here')
      const serverURL = 'https://api.jeontongju.shop/auction-service'
      let socket = new SockJS(`${serverURL}/chat`)
      this.stompClient = Stomp.over(socket)
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}/chat/sub/chat/${this.auctionId}`)
      this.stompClient.connect(
        {},
        (frame) => {
          // 소켓 연결 성공
          this.connected = true
          console.log('소켓 연결 성공', frame)
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe(`/sub/chat/${this.auctionId}`, (res) => {
            console.log('구독으로 받은 메시지 입니다.', res.body)
            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.recvList.push(JSON.parse(res.body))
          })
        },
        (error) => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error)
          this.connected = false
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
          // 소켓 연결 성공
          this.connected = true
          console.log('BID INFO 소켓 연결 성공', frame)
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe(`/sub/bid-info/${this.auctionId}`, (res) => {
            console.log('BID INFO 구독으로 받은 메시지 입니다.', res.body)
            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.auctionList.push(JSON.parse(res.body))
          })
        },
        (error) => {
          // 소켓 연결 실패
          console.log('BID INFO 소켓 연결 실패', error)
          this.connected = false
        }
      )
    },
    async connectKaKaoLive() {
      try {
        const LIVE_KEY = import.meta.env.VITE_LIVE_KEY
        const SERVICE_ID = import.meta.env.VITE_LIVE_SERVICE_ID
        console.log(SERVICE_ID)
        console.log(LIVE_KEY)
        await ConnectLive.signIn({
          serviceId: 'ICLEXMPLPUBL',
          serviceSecret: 'ICLEXMPLPUBL0KEY:YOUR0SRVC0SECRET'
        })
        this.connect()
        this.connectAuctionInfo()
      } catch (err) {
        console.error(err)
      }
    },
    async finishStream() {
      const toast = useToast()
      this.room?.disconnect()
      if (this.localMedia) {
        this.localMedia?.stop()
        this.localMedia = null
        this.removeLocalVideoNode()
      }
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
      console.log('연결중')
      try {
        await this.connectKaKaoLive()
        this.localMedia = await ConnectLive.createLocalMedia({
          audio: true,
          video: true
        })
        this.room = ConnectLive.createRoom()
        this.createConferenceHostOptions(this.room)
        if (!this.auctionId) throw new Error('No Conference to Connect')
        console.log(typeof this.auctionId)
        console.log(this.auctionId.replaceAll('-', ''))
        await this.room.connect(this.auctionId.replaceAll('-', ''))
        if (this.localMedia) {
          await this.room.publish([this.localMedia])
          // addLog('Video Connected')
          try {
            const data = await startStream(this.auctionId)
            if (data.code === 200) {
              toast.success(`성공적으로 방송이 시작됐어요.`, {
                timeout: 2000
              })
              this.isStreaming = true
              this.addLocalVideoNode(this.localMedia)
            }
          } catch (err) {
            toast.error('방송 시작에 실패했어요.', {
              timeout: 2000
            })
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    async createConferenceHostOptions(room) {
      room.on('participantEntered', (evt) => {
        // addLog(`${evt.remoteParticipant.id} joined`);
      })
    },
    addLocalVideoNode(localMedia) {
      const localContainer = document.querySelector('#local-container')

      const localVideo = localMedia.video?.attach()
      localVideo.id = 'local-video'
      localContainer.appendChild(localVideo)
      const localVideoTag = document.querySelector('#local-video')
      localVideoTag.style.borderRadius = '12px'
      localVideoTag.style.width = '100%'
    },
    removeLocalVideoNode() {
      const videoItem = document.querySelector('#local-video-item')
      if (videoItem) videoItem.remove()
    },
    async changeAskingPrice() {
      const toast = useToast()
      if (!this.askingPrice) {
        toast.fail('호가를 입력해주세요', { timeout: 1000 })
        return
      }
      try {
        const data = await updateAskingPrice(this.auctionId, this.askingPrice)
        if (data.code === 200) {
          toast.success('호가 수정에 성공했어요', { timeout: 2000 })
          this.askingPrice = null
        }
      } catch (err) {
        toast.fail('호가 수정에 실패했어요', { timeout: 2000 })
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
  video {
    width: 80%;
  }
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

.stream {
  display: flex;
  margin-top: 2rem;
  height: 100%;

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
    overflow: scroll;
  }

  input {
    width: 100%;
    position: absolute;
    bottom: 0;
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
}
</style>
