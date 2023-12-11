<template>
  <div class="modal-wrap">
    <div class="modal-container">
      <div v-if="canUpdate === false">
        <h2>{{ modalTitle }}</h2>
        <h3>{{ modalDesc }}</h3>
      </div>
      <div v-else>
        <input :value="modalTitle" @input="$emit('editTitle', $event.target.value)" />
        <input :value="modalDesc" @input="$emit('editDesc', $event.target.value)" />
      </div>
      <img :src="modalImg" alt="modal Img" v-if="modalImg" />
      <div class="modal-btn">
        <button @click="$emit('btnClick1')" class="btn1">{{ btnText1 }}</button>
        <button @click="$emit('btnClick2', false)" class="btn2">{{ btnText2 }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" scoped>
export default {
  name: 'CustomModal',
  props: {
    modalTitle: { type: String },
    modalImg: { type: String },
    modalDesc: { type: String },
    btnText1: { type: String },
    btnText2: { type: String },
    canUpdate: { type: Boolean, default: false }
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

  img {
    width: 10rem;
    height: 10rem;
  }
  input {
    border-radius: 8px;
    border: 1px solid lightgray;
    padding: 0.5rem;
    width: 90%;
    box-sizing: border-box;
    margin: 0.5rem;
  }
}

.modal-btn {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  button {
    width: 30%;
    padding: 0.5rem 0;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 12px;
    border: none;
    cursor: pointer;
  }

  .btn2 {
    background-color: #aab3ff;
  }
}
</style>
