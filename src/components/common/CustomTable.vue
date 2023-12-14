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
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="key in headerKey" :key="key + index" @click="$emit('rowClick', item)">
            <CustomAvatar
              v-if="key === 'storeImageUrl' || key === 'thumbnail' || key === 'productImageUrl'"
              :imgSrc="item[key]"
            />
            <span v-else-if="key === 'status'" @click="changePopState">{{ item[key] }}</span>
            <span v-else>{{ item[key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script scoped>
import CustomAvatar from '@/components/common/CustomAvatar.vue'
export default {
  name: 'CustomTable',
  components: {
    CustomAvatar
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
  methods: {},
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

  tr:hover {
    background-color: #fafafa;
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
