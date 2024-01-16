<template>
    <div>
    <div>{{ label }}</div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script lang="ts" scoped>
  import Chart from 'chart.js/auto';
  
  export default {
    props:{
        label:{type:String, default:'유저'},
        chartData: {type: Object, default: () => ({})}
    },
    data() {
      return {
        userChart: null,
        ageData: {
          labels: Object.keys(this.$props.chartData),
          datasets: [
            {
              label: this.$props.label,
              data: Object.values(this.$props.chartData),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
      };
    },
    mounted() {
      console.log(this.chartData)
      // this.updateChart()
      this.renderChart();
    },
    watch:{
        chartData: {
            handler: 'updateChart',
            deep: true,
        }
    },
    methods: {
      updateChart() {
        console.log("실행");
        console.log(Object.keys(this.$props.chartData));
        console.log(Object.values(this.$props.chartData));
        if (this.$refs.chartCanvas) {
          if (this.userChart) {
                  this.userChart.destroy(); // 기존 차트 제거
            }
            this.renderChart();
        }
        // this.ageData.labels = Object.keys(this.$props.chartData);
        // this.ageData.datasets[0].data = Object.values(this.$props.chartData);
        // this.renderChart();
      },
      renderChart() {
        const ctx = this.$refs.chartCanvas.getContext('2d');
        if (this.userChart) {
            this.userChart.destroy(); // 기존 차트 제거
        }
        this.userChart = new Chart(ctx, {
          type: 'bar', // 차트 유형 선택 (bar, line, pie 등)
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
  