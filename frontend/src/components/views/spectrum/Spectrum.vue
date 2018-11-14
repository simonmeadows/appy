<template>
  <section class="content spectrum">
    <div>{{namey}}</div>
    <div>{{adder}}</div>
    <button class="btn btn-primary" v-on:click="addUp">Adder</button>
    <line-chart :chartData="chartDataVar" :options="chartOptions" />
  </section>
</template>

<script>
import LineChart from '../../utilities/LineChart.vue'
import Vue from 'vue';

  export default {
    name: 'Spectrum',
    components: {
      LineChart
    },
    data () {
      return {
        newMembers: {},
        client: null,
        stats: {},
        statsLoading: true,
        namey: "namey wamey",
        adder: 0,
        count: 1,
        chartD: {},
        chartDataVar:{
          labels: [0],
          datasets: [
            { 
              label: 'GitHub Commits',
              yAxisID: 'first-y-axis',
              pointRadius: 0,
              data: [0]
            }
          ]
        },
        chartOptions: {

        scales: {
            yAxes: [{
                id: 'first-y-axis',
                type: 'logarithmic'
            }]
        }
    }
        }
      
    },
    computed: {
    },
    methods: {
      addUp(){
        this.count = 470.000
        var i;
        for(i = 0; i < 1500; i++){
        this.adder = Math.random()*100;
        this.chartDataVar.datasets[0].data.push(this.adder);
        this.chartDataVar.labels.push(this.count);
        this.count += 0.25;
        this.chartDataVar.datasets.label = this.chartDataVar.datasets.label & this.count;
        this.chartD = this.chartDataVar;
        this.chartDataVar = {},
        this.chartDataVar = this.chartD;
        }
      }
    }
  }
</script>

<style lang="scss">
  .dashboard {
    .users-list {
      & > li img {
        height: 128px;
      }
    }
    .info-box {
      cursor: pointer;
    }
    .info-box-content {
      text-align: center;
      vertical-align: middle;
      display: inherit;
    }
    .fullCanvas {
      width: 100%;
    }
    .pad canvas {
      border: 0px;
    }

    .chart-responsive {
      canvas {
        border: 0px;
      }
      padding-bottom: 10px;
    }

    .small-box.visitor-box {
      height: 375px;
      margin-bottom: 0px;
      .inner {
        padding-top: 100px;
      }
      .icon {
        position: static;
      }
    }
  }
</style>
