<template>
<section class="content scan" @loaded="onLoaded">
  <div>
    <box :classes="['box', 'box-info']" :canCollapse="false" :canClose="false" :disableFooter="true">
      <div slot="header">
        Scans
      </div>
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
                <div class="cell columnStartMHZ">
                  {{ scan.StartMHZ }}
                </div>
                <div class="cell columnStopMHZ">
                  {{ scan.StopMHZ }}
                </div>
                <div class="cell columnTime">
                  {{ scan.Time }}
                </div>
                <div class="cell columnScanner">
                  {{ scan.Scanner_id }}
                </div>
                <div class="cell columnEvent">
                  {{ scan.Event_id }}
                </div>
                <div class="cell columnSite">
                  {{ scan.Site_id }}
                </div>
                <div class="cell columnGPS">
                  {{ scan.GPS }}
                </div>
                <div class="cell columnDelete">
                  <button class="input"
                v-on:click="deleteScan(site)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </box>
  </div>
</section>
</template>

<script>
export default {
  name: 'ScanList',
  props: ['Scanner_id', 'Location_id', 'Event_id'],
  components: {},
  data() {
    return {
      scanners: [],
      events: [],
      sites: [],
      scans: []
    }
  },
  computed: {

  },
  mounted: function () {
    this.onLoaded();
  },
  methods: {
    refreshScan() {
      this.$scanRepository.list().then((response) => {this.sites = response.data.docs});
    },

    deleteScan(scan) {
      this.$ScanRepository.deleteOne(scan._id);
    },

    onLoaded() {
      this.$scanRepository.list().then((result) => {
        this.scans = result.data.docs
      })
      this.$scannerRepository.list().then((result) => {
        this.scanners = result.data.docs
      })
      this.$eventRepository.list().then((result) => {
        this.events = result.data.docs
      })
      this.$siteRepository.list().then((result) => {
        this.sites = result.data.docs
      })

    }
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
    width: 15%;
  }

  .columnDelete {
    width: 5%;
  }
}
</style>
