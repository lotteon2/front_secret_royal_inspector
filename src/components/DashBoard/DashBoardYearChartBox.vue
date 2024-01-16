<template>
    <div>
      <canvas ref="chartYearCanvas"></canvas>
    </div>
  </template>
  
  <script lang="ts" scoped>
  import Chart from 'chart.js/auto';
  
  export default {
    props: {
        teen: { type: Number, default: 0 },
        twenty: { type: Number, default: 0 },
        thirty: { type: Number, default: 0 },
        forty: { type: Number, default: 0 },
    },
    data() {
      return {
        chart: null,
        ageData: {
          labels: ['10대', '20대', '30대', '40대 이상'],
          datasets: [
            {
              label: '연령별 데이터',
              data: [this.$props.teen, this.$props.twenty, this.$props.thirty, this.$props.forty], // 실제 데이터에 맞게 변경
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
      };
    },
    mounted() {
      this.renderChart();
    },
    watch: {
        // teen: 'updateChart',
        // twenty: 'updateChart',
        // thirty: 'updateChart',
        // forty: 'updateChart',
    },
    methods: {
        updateChart() {
        // props로 받아온 데이터가 변경될 때마다 차트 업데이
            if (this.$refs.chartYearCanvas) {
                if (this.chart) {
                    this.chart.destroy(); // 기존 차트 제거
                }
                this.renderChart();
            }
        },
      renderChart() {
        const ctx = this.$refs.chartYearCanvas.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'pie', // 차트 유형 선택 (bar, line, pie 등)
          data: this.ageData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* 원하는 스타일링 추가 */
  </style>
  