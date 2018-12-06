<template>
  <section class="content graph">
    <IEcharts :option="scan" :loading="loading" @ready="onReady" @click="onClick"/>
  </section>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js';
import Vue from 'vue';

export default {
  name: 'Graph',
  components: {
    IEcharts: IEcharts,
  },
  mounted: function() {
    this.onLoaded();
  },

  props: ['propData', 'limits'],
  data() {
    return {
      loading: true,
      scan: {
        title: {
          text: 'ECharts Hello World',
        },
        toolbox: {
          show: true,
        },
        axisPointer: {
          show: true,
          type: 'line',
          triggerTooltip: false,

        },
        dataZoom: [
          {
            type: 'inside',
            show: true,
          },
          {
            type: 'slider',
            show: true,
          },
        ],
        tooltip: {},
        xAxis: {
          name: 'Frequency (MHz)',
          min: 20,
          max: 2700,
        },
        yAxis: {
          name: 'Power (dBm)',
          min: -110,
          max: 20,
        },
        series: this.propData,
      },
    };
  },
  computed: {},
  methods: {
    doRandom() {
      const that = this;
      let data = [];
      for (let i = 0, min = 5, max = 99; i < 6; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min));
      }
      that.loading = !that.loading;
      that.bar.series[0].data = data;
    },
    onReady(instance, ECharts) {
      console.log(instance, ECharts);
    },
    onClick(event, instance, ECharts) {
      console.log(arguments);
    },
    onLoaded: function() {
      this.loading = !this.loading;
    },
  },
};
</script>

<style lang="scss">
.content {
  .graph {
    width: 100%;
    height: 500px;
  }
}
</style>
