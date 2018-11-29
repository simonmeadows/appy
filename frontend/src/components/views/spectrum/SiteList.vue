<template>
<section class="content site" @loaded="onLoaded">
  <div>
    <box :classes="['box', 'box-info']" :canCollapse="false" :canClose="false" :disableFooter="true">
      <div slot="header">
        {{ event.Name }}
      </div>
      <div class="table" slot="body">
        <div class="row">
          <div class="cell">
            <div>
              <button v-on:click="refreshSite">Refresh Sites</button>
              <button v-on:click="addSite">Add Site</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <div class="table">
              <div class="row">
                <div class="cell columnName">Site Name</div>
                <div class="cell columnAddress">Address</div>
                <div class="cell columnDelete">Delete</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-for="(site,index) in sites">
          <div class="cell">
            <div class="table">
              <div class="row">
                <div class="cell columnName">
                  <input class="input"
                v-model="site.Name"
                  @input="updateSite(index,site._id)"></input>
                </div>
                <div class="cell columnAddress">
                  <input class="input"
                    v-model="site.Address"
                    @input="updateSite(index,site._id)"></input>
                </div>
                <div class="cell columnDelete">
                  <button class="input"
                v-on:click="deleteSite(site)">Delete</button>
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
  name: 'SiteList',
  props: ['event'],
  components: {},
  data() {
    return {
      sites: {},
    };
  },
  computed: {
    Event_id() {
      return this.event ? this.event._id : false
    },
  },
  mounted: function () {
    this.onLoaded();
  },
  methods: {
    addSite() {
      console.log(this.Event_id)
      this.$siteRepository.create({
        Name: "New Site Name",
        Address: "New Site Address",
        Event_id: this.Event_id
      });
      this.$siteRepository.list({
        Event_id: this.Event_id
      }).then((response) => {
        this.sites = response.data.docs
      });
    },
    refreshSite() {
      this.$siteRepository.list({
        Event_id: this.Event_id
      }).then((response) => {
        this.sites = response.data.docs
      });
    },

    updateSite(index, _id) {
      this.$siteRepository.update(_id, this.sites[index])
        .then(this.$siteRepository.list({
          Event_id: this.Event_id
        }).then((response) => {
          this.sites = response.data.docs
        }));
    },

    deleteSite(site) {
      this.$siteRepository.deleteOne(site._id);
      this.$siteRepository.list({
        Event_id: this.Event_id
      }).then((response) => {
        this.sites = response.data.docs
      });
    },

    onLoaded() {
      this.$siteRepository.list({
        Event_id: this.Event_id
      }).then((response) => {
        this.sites = response.data.docs
      });
    }
  },
};
</script>

<style lang="scss">
.site {
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

  .columnName {
    width: 35%;
  }

  .columnDescription {
    width: 50%;
  }

  .columnDelete {
    width: 15%;
  }
}
</style>
