<script>
import { Line, mixins } from 'vue-chartjs';

 
export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData:{
      labels: [0],
      datasets: [
        { 
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [0]
        }
      ]
    },
    options: {}
  },
  
  mounted () {
    this.renderChart(this.chartData, this.options);
    console.log(Line.options)
  }
}
</script>

