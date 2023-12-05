<template>
  <div class="customTable">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.text">
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터 바인딩 -->
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="key in headerKey" :key="key + index">
            <img
              v-if="key === 'storeImageUrl' || key === 'thumbnail'"
              :src="item[key]"
              style="width: 3rem; height: 3rem"
            />
            <span v-else-if="key === 'status'" @click="changePopState">{{ item[key] }}</span>
            <span v-else>{{ item[key] }}</span>
          </td>
          <CustomModal
            v-if="popState"
            :modalTitle="items[index].productName"
            :modalImg="items[index].productImageUrl"
            btnText1="반려"
            btnText2="승인"
            @btnClick1="handleDisapprove()"
            @btnClick2="handleApprove()"
          ></CustomModal>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script scoped>
import CustomModal from '@/components/common/CustomModal.vue'
export default {
  name: 'CustomTable',
  components: {
    CustomModal
  },
  props: {
    headers: { type: Array, required: true },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      popState: false
    }
  },
  methods: {
    changePopState() {
      this.popState = !this.popState
    },
    handleApprove() {
      //승인
      console.log('승인')
      this.changePopState()
    },
    handleDisapprove() {
      console.log('반려')
      this.changePopState()
    }
  },
  computed: {
    // value 순서에 맞게 테이블 데이터를 출력하기 위한 배열
    headerKey() {
      return this.headers.map((header) => header.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.customTable {
  width: 100%;
  table {
    width: 100%;
    text-align: center;
    border-radius: 12px;
  }

  th,
  td {
    border-bottom: 1px solid #f0f0f0;
    padding: 1rem 0;
  }

  th {
    background: #fafafa;
  }
}
</style>
