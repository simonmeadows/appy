<template>
  <section class="content scan" @loaded="onLoaded">
    <div>
      <box
        :classes="['box', 'box-info']"
        :canCollapse="false"
        :canClose="false"
        :disableFooter="true"
      >
        <div slot="header">Scans</div>
        <div class="table" slot="body">
          <div class="row">
            <div class="cell">
              <div>
                <button v-on:click="refreshScan">Refresh Scans</button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="cell">
              <div class="table">
                <div class="row">
                  <div class="cell columnShow">Show</div>
                  <div class="cell columnStartMHZ">Start (MHZ)</div>
                  <div class="cell columnStopMHZ">Stop (MHZ)</div>
                  <div class="cell columnTime">Time</div>
                  <div class="cell columnScanner">Scanner</div>
                  <div class="cell columnEvent">Event</div>
                  <div class="cell columnSite">Site</div>
                  <div class="cell columnGPS">GPS</div>
                  <div class="cell columnDelete">Delete</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-for="(scan,index) in scans">
            <div class="cell">
              <div class="table">
                <div class="row">
                  <div class="cell columnShow">
                    <button class="input" v-on:click="showScan(scan)">Graph</button>
                  </div>
                  <div class="cell columnStartMHZ">{{ scan.StartMHZ }}</div>
                  <div class="cell columnStopMHZ">{{ scan.StopMHZ }}</div>
                  <div class="cell columnTime">{{ scan.Time | moment("DD/MM/YY - hh:mm:ss")}}</div>
                  <div class="cell columnScanner">{{ scan.Extra.ScannerName }}</div>
                  <div class="cell columnEvent">{{ scan.Extra.EventName }}</div>
                  <div class="cell columnSite">{{ scan.Extra.SiteName }}</div>
                  <div class="cell columnGPS">
                    <a
                      :href="'https://www.google.com/maps/search/?api=1&query='+scan.GPS.Lat+','+scan.GPS.Lon"
                      target="_blank"
                    >Map</a>
                  </div>
                  <div class="cell columnDelete">
                    <button class="input" v-on:click="deleteScan(scan)">Delete</button>
                  </div>
                </div>
              </div>
              <div class="table">
                <div class="row">
                  <div class="cell" v-if="scan.Extra.Show">{{ scan._id }} -</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <graph :propData="graphs"></graph>
      </box>
    </div>
  </section>
</template>

<script>
import Graph from './Graph.vue';
// this.scanners.find((scanner)=>{return scanner.id === scan.Scanner_id}).Name

export default {
  name: 'ScanList',
  props: ['Scanner_id', 'Location_id', 'Event_id'],
  components: {
    graph: Graph,
  },
  data() {
    return {
      scanners: [],
      events: [],
      sites: [],
      scans: [],
      graphs: [],
    };
  },
  computed: {},
  mounted: function() {
    this.onLoaded();
  },
  methods: {
    refreshScan() {
      this.$scanRepository.list().then(response => {
        let tempScans = [];
        response.data.docs.forEach(scan => {
          scan.Extra = {};
          let extras = [];
          extras.push(this.$scannerRepository.find(scan.Scanner_id));
          extras.push(this.$eventRepository.find(scan.Event_id));
          extras.push(this.$siteRepository.find(scan.Site_id));
          Promise.all(extras).then(values => {
            scan.Extra.ScannerName = values[0].data.Name;
            scan.Extra.EventName = values[1].data.Name;
            scan.Extra.SiteName = values[2].data.Name;
            scan.Extra.Show = false;
            tempScans.push(scan);
          });
        });
        this.scans = tempScans;
      });
    },

    showScan(scan) {
      if (!scan.Extra.Show) {
        this.graphs.push({
          name: scan.Time,
          type: 'line',
          lineStyle:{
            width: 1,
          },
          data: scan.Data,
          symbol: 'none',
          sampling: 'max',
          animation: false,
        });
      } else  {
        this.graphs.splice(this.graphs.map(e=>{return e.name}).indexOf(scan.Time))
        let temp = this.graphs
        this.graphs = []
        this.graphs = temp
      }
      scan.Extra.Show = !scan.Extra.Show;
    },

    deleteScan(scan) {
      this.$scanRepository.deleteOne(scan._id).then(() => {
        this.refreshScan();
      });
    },

    onLoaded() {
      this.$scannerRepository.list().then(result => {
        this.scanners = result.data.docs;
      });
      this.$eventRepository.list().then(result => {
        this.events = result.data.docs;
      });
      this.$siteRepository.list().then(result => {
        this.sites = result.data.docs;
      });
      this.refreshScan();
    },
  },
};
</script>

<style lang="scss">
.scan {
  .table {
    display: table;
    width: 100%;
    margin-bottom: 0;
  }

  .row {
    display: table-row;
    width: 100%;
  }

  .cell {
    display: table-cell;
  }

  .input {
    width: 100%;
  }

  .columnShow {
    width: 5%;
  }

  .columnStartMHZ {
    width: 10%;
  }

  .columnStopMHZ {
    width: 10%;
  }

  .columnTime {
    width: 15%;
  }

  .columnScanner {
    width: 15%;
  }

  .columnEvent {
    width: 15%;
  }

  .columnSite {
    width: 15%;
  }

  .columnGPS {
    width: 10%;
  }

  .columnDelete {
    width: 5%;
  }
}
</style>
