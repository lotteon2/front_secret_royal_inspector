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
}

.positive {
  background-color: #94e8b4;
}
.negative {
  background-color: #e89494;
}

button:disabled {
  background-color: #ccc;
}

.disabled-button {
  cursor: not-allowed;
}
</style>
