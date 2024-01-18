<template>
  <div class="livePage">
    <div v-if="!this.isStreaming" class="preview-screen">
      <div class="preview-screen__header">
        <h2>미리 보기 화면</h2>
        <CustomButton btnText="방송 시작하기" @click="startStream"></CustomButton>
      </div>
      <div>카메라와 마이크를 확인해주세요</div>
    </div>
    <video id="video" ref="video"></video>
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
    async startStream() {
      const toast = useToast()
      try {
        const data = await startStream(this.auctionId)
        if (data.code === 200) {
          this.isStreaming = true
          this.$router.replace(`/live/real/${this.auctionId}`)
          toast.success(`성공적으로 방송이 시작됐어요.`, {
            timeout: 2000
          })
        }
      } catch (err) {
        toast.error('방송 시작에 실패했어요.', {
          timeout: 2000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.livePage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

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
</style>
