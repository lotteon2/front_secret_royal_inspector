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
      <tbody v-if="items.length > 0">
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="key in headerKey" :key="key + index" @click="$emit('rowClick', item)">
            <CustomAvatar v-if="key === 'storeImageUrl' || key === 'thumbnail' || key === 'productImageUrl'"
              :imgSrc="item[key]" />
            <span v-else-if="key === 'status'" @click="changePopState">{{ item[key] }}</span>
            <span v-else-if="key === 'settlementImgUrl'" @click="() => handleDownloadImg(item[key])">다운받기</span>
            <span v-else-if="key === 'createdAt'">{{ item[key].slice(0, 10) }}</span>
            <span v-else>{{ item[key] }}</span>
          </td>
        </tr>
      </tbody>
      <div v-else class="emptyDesc">데이터가 비어있어요!</div>
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
  methods: {
    handleDownloadImg(url) {
      window.open(url, '정산 내역')
    }
  },
  computed: {
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
    font-family: 'BMDOHYEON';
  }

  tr:hover {
    background-color: #fafafa;
  }

  th,
  td {
    border-bottom: 1px solid #f0f0f0;
    padding: 1rem 0;
    vertical-align: middle;
  }

  th {
    background: #fafafa;
    vertical-align: middle;
  }

  .emptyDesc {
    position: absolute;
    top: 50%;
    left: 40%;
  }
}
</style>
