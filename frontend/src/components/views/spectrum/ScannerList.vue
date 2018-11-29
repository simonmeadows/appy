<template>
<section class="content scannerList" @loaded="onLoaded">
  <div>
    <box :classes="['box-solid', 'box-primary']" :canCollapse="false" :canClose="false" :disableFooter="true">
      <div slot="header">
        Scanners List
      </div>
      <div class="table" slot="body">
        <div class="row">
          <div class="cell">
            <div>
              <button v-on:click="refreshScanner">Refresh Scanners</button>
              <button v-on:click="addScanner">Add Acanner</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <div class="table">
              <div class="row header">
                <div class="cell columnName">Scanner Name</div>
                <div class="cell columnSite">Event</div>
                <div class="cell columnSite">Site</div>
                <div class="cell columnGPS">GPS Location</div>
                <div class="cell columnStartMHZ">Start (MHZ)</div>
                <div class="cell columnStopMHZ">Stop (MHZ)</div>
                <div class="cell columnSteps">Scan Steps</div>
                <div class="cell columnDelete">Delete</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-for="(scanner,index) in scanners">
          <div class="cell">
            <div class="table">
              <div class="row">
                <div class=" cellcolumnName">
                  <input class="input"
                    v-model="scanner.Name"
                    @input="updateScanner(index,scanner._id)">
                  </input>
                </div>
                <div class="cell columnEvent">
                  <select
                    class="input"
                    v-model="scanner.Event_id"
                    @input="updateScanner(index,scanner._id)"
                    :selected="scanner.Event_id">
                      <option v-for="event in events" :value="event._id">{{ event.Name }}</option>
                  </select>
                </div>
                <div class="cell columnSite">
                  <select
                    class="input"
                    v-if="scanner.Event_id != '' && events.length != 0"
                    v-model="scanner.Site_id"
                    :selected="scanner.Site_id"
                    @input="updateScanner(index,scanner._id)">
                      <option v-for="site in events.find((obj) => obj._id === scanner.Event_id).sites" :value="site._id">{{ site.Name }}</option>
                  </select>
                </div>
                <div class="cell columnGPS">
                  Lat:- {{ scanner.GPS.Lat }} / Lon:- {{ scanner.GPS.Lon }}
                </div>
                <div class="cell columnStartMHZ">
                  <input class="input"
                    v-model="scanner.StartMHZ"
                    @input="updateSite(index,scanner._id)">
                  </input>
                </div>
                <div class="cell columnStopMHZ">
                  <input class="input"
                    v-model="scanner.StopMHZ"
                    @input="updateSite(index,scanner._id)">
                  </input>
                </div>
                <div class="cell columnSteps">
                  <input class="input"
                    v-model="scanner.Steps"
                    @input="updateSite(index,scanner._id)">
                  </input>
                </div>
                <div class="cell columnDelete">
                  <button class="input"
                    v-on:click="deleteScanner(scanner)">Delete</button>
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
  name: 'ScannerList',
  components: {},
  data() {
    return {
      scanners: [],
      events: [],
    };
  },
  computed: {},
  mounted: function () {
    this.onLoaded();
  },
  methods: {
    addScanner() {
      this.$scannerRepository.create({
        Name: "New Scanner Name",
        Event_id: "",
        Site_id: "",
        GPS: {
          Lat: 0,
          Lon: 0
        },
        StartMHZ: 470,
        StopMHZ: 865,
        Steps: 10,
      }).then(
        this.$scannerRepository.list()
        .then((response) => {
          this.scanners = response.data.docs
        }))
    },
    refreshScanner() {
      this.$scannerRepository.list()
        .then((response) => {
          this.scanners = response.data.docs
        });
    },

    updateScanner(index, _id, scanner) {
      this.$scannerRepository.update(_id, this.scanners[index])
        .then(this.$scannerRepository.list()
          .then((response) => {
            this.scanners = response.data.docs
          }));
    },

    deleteScanner(scanner) {
      this.$scannerRepository.deleteOne(scanner._id);
      this.$scannerRepository.list()
        .then((response) => {
          this.scanners = response.data.docs
        });
    },

    onLoaded() {
      this.$eventRepository.list()
        .then((response) => {
          this.events = response.data.docs
        }).then((response) => {
          this.events.forEach(event => {
            this.$siteRepository.list({
                Event_id: event._id
              })
              .then((response) => {
                event.sites = response.data.docs
              })
          })
        }).then((response) => {
          this.$scannerRepository.list()
            .then((response) => {
              this.scanners = response.data.docs
            })
        })
    },
  }
};
</script>

<style lang="scss">
.scannerList {
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

  .header {
    font-weight: bold;
  }

  .input {
    width: 100%;
  }

  .columnName {
    width: 20%;
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

  .columnStartMHZ {
    width: 10%;
  }

  .columnStopMHZ {
    width: 10%;
  }

  .columnSteps {
    width: 10%;
  }

  .columnDelete {
    width: 5%;
  }

}
</style>
