<template>
  <button
    @click="handleClick"
    :disabled="disabled"
    :class="[btnType, { 'disabled-button': disabled }]"
  >
    {{ btnText }}
  </button>
</template>

<script scoped>
export default {
  name: 'CustomButton',
  props: {
    btnText: { type: String, default: '확인' },
    handleClick: { type: [Function, Promise] },
    disabled: { type: Boolean, default: false },
    btnType: { type: String, default: 'positive' }
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
  font-family: 'BMDOHYEON';
}

.positive {
  background-color: #94e8b4;
}

/* 추가 버튼 타입 및 배경색을 여기에 추가 */
.negative {
  background-color: #e89494;
}

/* 비활성화 상태일 때 배경색을 회색으로 설정 */
button:disabled {
  background-color: #ccc;
}

/* 비활성화 상태일 때의 스타일 */
.disabled-button {
  cursor: not-allowed;
}
</style>
