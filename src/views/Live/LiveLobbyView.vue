<template>
  <div>
    <div v-if="!this.isStreaming">
      <div class="preview-screen__header">
        <h2>미리 보기 화면</h2>
        <CustomButton btnText="방송 시작하기" @click="startStream"></CustomButton>
      </div>
      <video id="video" ref="video" @canplay="playVideo"></video>
    </div>
    <div class="close__btn">
      <CustomButton
        v-if="this.isStreaming"
        btnText="방송 종료하기"
        btnType="negative"
        @click="finishStream"
      ></CustomButton>
    </div>
    <div id="local-container"></div>
    <div id="video-tag-id"></div>
  </div>
</template>

<script>
import CustomButton from '@/components/common/CustomButton.vue'
import ConnectLive from '@connectlive/connectlive-web-sdk'
import { useToast } from 'vue-toastification'
import { startStream, finishStream } from '@/api/auction/auctionAPIService.ts'
export default {
  components: { CustomButton },
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
      width: 320
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
        await this.room.connect(this.auctionId)
        if (this.localMedia) {
          await this.room.publish([this.localMedia])
          // addLog('Video Connected')
          try {
            const data = await startStream(this.auctionId)
            if (data.code === 200) {
              toast.success(`성공적으로 방송이 시작됐어요.`, {
                timeout: 2000
              })
              this.addLocalVideoNode(this.localMedia)
              this.isStreaming = true
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

      const videoItem = document.createElement('li')
      videoItem.id = 'local-video-item'

      const localVideo = localMedia.video?.attach()
      localVideo.id = 'local-video'

      videoItem.appendChild(localVideo)
      localContainer.appendChild(videoItem)
      document.getElementById('video-tag-id').srcObject = localMedia.video.getMediaStream()
    },
    removeLocalVideoNode() {
      const videoItem = document.querySelector('#local-video-item')
      if (videoItem) videoItem.remove()
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-screen__header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

li {
  list-style-type: none;
}

#local-container {
  margin-top: 0.5rem;
}

.close__btn {
  float: right;
  margin-bottom: 0.5rem;
}
</style>
