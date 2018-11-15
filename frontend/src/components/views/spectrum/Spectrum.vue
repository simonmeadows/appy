<template>
  <section class="content spectrum">
    <apexcharts width="100%" :type="type" :options="chartOptions" :series="series"></apexcharts>
     <div>
       <button v-on:click="updateChart">Update!</button>
    </div>
  </section>
</template>

<script>
import LineChart from '../../utilities/LineChart.vue';
import VueApexCharts from 'vue-apexcharts';
import Vue from 'vue';

export default {
  name: 'Spectrum',
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      newMembers: {},
      client: null,
      stats: {},
      statsLoading: true,
      type: 'area',
      chartOptions: {
        chart: {
          id: 'vuechart-example',
          zoom: {
            type: 'x',
            enabled: true,
          },
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
            autoSelected: 'zoom',
          },
        },
        xaxis: {
          type: "linear"
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  computed: {},
  methods: {
    updateChart() {
      const max = 90;
      const min = 20;
      let newData = [];
      let newXAxis = [];
      let freq = 470.0;
      for (let i = 0; i < 1000; i++) {
        freq = freq + 0.25;
        newData.push([freq, Math.floor(80 - Math.random() * 100)]);
      }
      const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];

      // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
      this.chartOptions = {
        colors: [colors[Math.floor(Math.random() * colors.length)]],
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          colors: undefined,
          width: 1,
          dashArray: 0,
        },
        chart: {
          id: 'vuechart-example',
          zoom: {
            type: 'x',
            enabled: true,
          },
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
            autoSelected: 'zoom',
          },
        },
      };
      // In the same way, update the series option
      this.series = [
        {
          data: newData,
        },
      ];
    },
  },
};
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
