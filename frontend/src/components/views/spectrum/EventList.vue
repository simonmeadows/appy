<template>
<section class="content event" @loaded="onLoaded">
  <div>
    <box :classes="['box-solid', 'box-primary']" :canCollapse="true" :canClose="true" :disableFooter="true">
      <div slot="header">
        Events List
      </div>
      <div class="table" slot="body">
        <div class="row">
          <div class="cell">
            <button v-on:click="refreshEvent">Refresh Events</button>
            <button v-on:click="addEvent">Add Event</button>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <div class="table">
              <div class="row">
                <div class="cell columnExpand">Sites</div>
                <div class="cell columnName">Event Name</div>
                <div class="cellcolumnDescription">Description</div>
                <div class="cell columnDelete">Delete</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-for="(event,index) in events">
          <div class="cell">
            <div class="table">
              <div class="row">
                <div class="cell columnExpand">
                  <button v-if="event.Expand" class="input" v-on:click="expandEvent(event)">-</button>
                  <button v-else class="input" v-on:click="expandEvent(event)">+</button>
                </div>
                <div class="cell columnName">
                  <input class="input" v-model="event.Name" @input="updateEvent(index,event._id)"></input>
                </div>
                <div class="cell columnDescription">
                  <input class="input" v-model="event.Description" @input="updateEvent(index,event._id)"></input>
                </div>
                <div class="cell columnDelete">
                  <button class="input" v-on:click="deleteEvent(event)">Delete</button>
                </div>
              </div>
            </div>
            <div class="table" v-if="event.Expand">
              <div class="row">
                <div class="cell">
                  <siteList :event="event"></siteList>
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
import SiteList from './SiteList.vue';

export default {
  name: 'EventList',
  components: {
    siteList: SiteList,
  },
  data() {
    return {
      events: {},
    };
  },
  computed: {},
  mounted: function () {
    this.onLoaded();
  },
  methods: {
    addEvent() {
      this.$eventRepository.create({
        Name: "New Event Name",
        Description: "New Event Description",
      });
      this.$eventRepository.list().then((response) => {
        this.events = response.data.docs
      });
    },
    refreshEvent() {
      this.$eventRepository.list().then((response) => {
        this.events = response.data.docs
      });
    },

    expandEvent(event) {
      this.$eventRepository.update(event._id, {
          Expand: !event.Expand
        })
        .then(this.$eventRepository.list()
          .then((response) => {
            this.events = response.data.docs
          }));

    },

    updateEvent(index, _id) {
      this.$eventRepository.update(_id, this.events[index])
        .then(this.$eventRepository.list()
          .then((response) => {
            this.events = response.data.docs
          }));
    },

    deleteEvent(event) {
      this.$eventRepository.deleteOne(event._id);
      this.$siteRepository.list({
        Event_id: event._id
      }).then((response) => {
        console.log(response)
        response.data.docs.forEach((doc) => {
          this.$siteRepository.deleteOne(doc._id).then((response) => {
            console.log(response)
          })
        })

      });
      this.$eventRepository.list().then((response) => {
        this.events = response.data.docs
      });
    },

    onLoaded() {
      this.$eventRepository.list().then((response) => {
        this.events = response.data.docs
      });
    }
  },
};
</script>

<style lang="scss">
.event {
  hr {
    border: solid black 2px;
  }

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

  .columnExpand {
    width: 5%;
  }

  .columnName {
    width: 30%;
  }

  .columnDescription {
    width: 50%;
  }

  .columnDelete {
    width: 15%;
  }
}
</style>
