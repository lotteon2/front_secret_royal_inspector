<template>
  <button @click="handleClick" :disabled="disabled" :class="{ 'disabled-button': disabled }">
    {{ btnText }}
  </button>
</template>

<script scoped>
export default {
  name: 'CustomButton',
  props: {
    btnText: { type: String, default: '확인' },
    handleClick: { type: Function },
    disabled: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
button {
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background-color: #94e8b4;
  color: white;
  cursor: pointer;
}

/* 비활성화 상태일 때 배경색을 회색으로 설정 */
button:disabled {
  background-color: #ccc;
}

/* 비활성화 상태일 때의 스타일 */
.disabled-button {
  cursor: not-allowed; /* 커서를 변경하여 비활성화 상태를 시각적으로 나타냄 */
}
</style>
