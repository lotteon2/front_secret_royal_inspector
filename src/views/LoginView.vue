<template>
    <div class="loginForm" style="height: 100vh">
      <img src="../assets/main_logo.png" alt="logo" width="200" />
      <label>이메일</label>
      <input v-model="email" placeholder="이메일을 입력해주세요" />
      <label>비밀번호</label>
      <input v-model="password" type="password" placeholder="비밀번호를 입력해주세요" />
      <CustomButton btnText="로그인" :handleClick="login" :disabled="isButtonDisabled"></CustomButton>
    </div>
  </template>
  <script lang="ts" scoped>
  import CustomButton from '@/components/common/CustomButton.vue'
  import { localLogin } from '@/api/authentication/authAPIService'
  import { useToast } from 'vue-toastification'
  export default {
    components: {
      CustomButton
    },
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async login() {
        const toast = useToast()
        try {
          const data = await localLogin({ email: this.email, password: this.password })
          if (data.code === 200) {
            this.$router.push('/')
            localStorage.setItem('accessToken', data.data.accessToken);
          }
        } catch (err) {
          toast.error('아이디와 비밀번호를 확인해주세요.', {
            timeout: 2000
          })
        }
      }
    },
    computed: {
      // email 또는 password 중 하나라도 비어 있으면 버튼 비활성화
      isButtonDisabled() {
        return this.email.length < 3 || this.password.length < 3
      }
    }
  }
  </script>
  <style scoped>
  .loginForm {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    width: 80vw;
    margin: 0 auto;
  }
  img {
    max-width: 40rem;
    margin: 0 auto;
  }
  input {
    border-radius: 8px;
    border: 1px solid lightgray;
    padding: 0.5rem;
  }
  </style>