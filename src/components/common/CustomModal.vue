<template>
  <div class="modal-wrap">
    <div class="modal-container">
      MODAL
      <div class="modal-btn">
        <button @click="$emit('btnClick1', false)">{{ btnText1 }}</button>
        <button @click="$emit('btnClick2', false)">{{ btnText2 }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" scoped>
export default {
  name: 'CustomModal',
  props: {
    btnText1: { type: String },
    btnText2: { type: String }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
