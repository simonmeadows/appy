<template>
<section class="content graph">
    <apexcharts width="100%" :type="type" :options="chartOptions" :series="series"></apexcharts>
</section>
</template>

<script>
import LineChart from '../../utilities/LineChart.vue';
import VueApexCharts from 'vue-apexcharts';
import Vue from 'vue';
import axios from 'axios';

export default {
    name: 'Graph',
    components: {
        apexcharts: VueApexCharts,
    },
    data() {
        return {
            info: null,
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
                    type: 'linear',
                },
                yaxis: {
                    min: -100,
                    max: 20,
                    seriesname: 'series-1',
                    logarithmic: false
                },
            },
            series: [{
                name: 'series-1',
                data: [30, 40, 45, 50, 49, 60, 70, 91],
            }, ],
        };
    },
    computed: {},
    methods: {
        updateChart() {
            console.log(this.$freqscanRepository);
            this.$freqscanRepository.find()
                .then((result) => {
                    console.log(result)
                });

            axios.get('http://localhost:8080/freqscan').then(response => {
                this.info = response.data.docs[0].ScanData;
                this.series = [{
                    name: 'series-1',
                    data: response.data.docs[0].ScanData,
                }, ];
            });
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
        },
    },
};
</script>

<style lang="scss">
.dashboard {
    .users-list {
        &>li img {
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
