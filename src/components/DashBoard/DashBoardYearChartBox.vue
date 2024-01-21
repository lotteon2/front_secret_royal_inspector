<template>
  <div class="canva">
    <canvas ref="chartYearCanvas" height="300" width="300"></canvas>
  </div>
</template>

<script lang="ts" scoped>
import Chart from 'chart.js/auto'

export default {
  props: {
    teen: { type: Number, default: 0 },
    twenty: { type: Number, default: 0 },
    thirty: { type: Number, default: 0 },
    forty: { type: Number, default: 0 }
  },
  data() {
    return {
      chart: null,
      ageData: {
        labels: ['10대', '20대', '30대', '40대 이상', '나이 미입력'],
        datasets: [
          {
            label: '연령별 데이터',
            data: [
              this.$props.teen,
              this.$props.twenty,
              this.$props.thirty,
              this.$props.forty,
              100 - this.$props.teen - this.$props.twenty - this.$props.thirty - this.$props.forty
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      }
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartYearCanvas.getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'pie', // 차트 유형 선택 (bar, line, pie 등)
        data: this.ageData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.canva {
  height: 300px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
