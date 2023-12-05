<template>
  <div>
    충전, 사용 내역 날짜, 사용금(+, -), - => 경매 낙찰시 사용, + -> 충전
    <CustomTable :headers="header" :items="items"></CustomTable>
  </div>
</template>

<script>
import CustomTable from '@/components/common/CustomTable.vue'
export default {
  components: {
    CustomTable
  },
  data() {
    return {
      header: [
        { text: '날짜', value: 'date' },
        { text: '금액', value: 'total' },
        { text: '내역', value: 'desc' }
      ],
      items: [
        {
          date: '2020-11-26',
          total: '-3000',
          desc: '경매시 크레딧 사용'
          // desc: this.total > 0 ? '크레딧 충전' : '경매시 크레딧 사용'
        },
        {
          date: '2020-11-26',
          total: '+3000',
          desc: '크레딧 충전'
          // desc: this.total > 0 ? '크레딧 충전' : '경매시 크레딧 사용'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
