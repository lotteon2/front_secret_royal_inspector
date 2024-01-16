<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script lang="ts" scoped>
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        chart: null,
        ageData: {
          labels: ['10s', '20s', '30s', '40s', '50s'],
          datasets: [
            {
              label: '연령별 데이터',
              data: [30, 45, 60, 25, 10], // 실제 데이터에 맞게 변경
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
    methods: {
      renderChart() {
        const ctx = this.$refs.chartCanvas.getContext('2d');
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
  