<template>
  <div class="liveItem">
    <div class="title">{{ title }}</div>
    <div class="side">
      <AuctionState :state="status"></AuctionState>
      <div v-if="status === 'BEFORE'" class="side_team">
        <span>승인대기: {{ wait }}팀</span>
        <span>승인: {{ allow }}팀</span>
        <span>거절: {{ deny }}팀</span>
      </div>
      <div v-else class="side_team">
        <span>참여 주모: {{ participation }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AuctionState from './AuctionState.vue'

export default {
  name: 'LiveItem',
  components: { AuctionState },
  props: {
    title: String,
    description: String,
    status: String,
    wait: Number,
    allow: Number,
    deny: Number,
    participation: Number
  }
}
</script>

<style lang="scss" scoped>
.liveItem {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  min-width: 70vw;
  max-width: 70vw;
  min-height: 8rem;
  border-radius: 12px;
  background-color: #aab3ff;
  border: none;
  padding: 1rem 3rem;
  justify-content: space-between;
  box-sizing: border-box;
  .title {
    color: white;
    font-size: 2.5rem;
  }

  .side {
    .side_team {
      display: flex;
      gap: 0.3rem;
      flex-direction: column;
      color: white;
    }
  }
}
</style>
