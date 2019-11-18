<template>
  <div class="row">
    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <table class="table tablesorter">
            <thead>
              <tr>
                <th width="5%"></th>
                <th>Title</th>
                <th width="5%"></th>
                <th width="8%" class="text-right">Duration</th>
                <th width="5%">Popularity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(track, index) in songs" :key="index">
                <template v-if="track">
                  <td>
                    <template v-if="nowPlaying(track.id)">
                      <i class="tim-icons icon-triangle-right-17"></i>
                    </template>
                    <template v-else>
                      <i class="tim-icons icon-button-pause"></i>
                    </template>
                  </td>
                  <td>
                    {{track.name}}&nbsp;
                    <span
                      v-if="track.explicit"
                      class="badge badge-outline badge-secondary"
                    >Explicit</span>
                  </td>
                  <td class="text-right">
                    <nuxt-link :to="`/tracks/${track.id}`">
                      <i class="tim-icons icon-chart-bar-32 text-primary"></i>
                    </nuxt-link>
                  </td>
                  <td class="text-right">{{track.duration_ms | duration}}</td>
                  <td>
                    <div class="progress md-progress" style="height: 8px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        :style="{width: `${track.popularity}%`, height: '8px'}"
                        :aria-valuenow="track.popularity"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { Table } from "~/ui";

export default {
  props: ["tracks"],
  components: {
    Table
  },
  data() {
    return {
      data: {
        songs: []
      }
    };
  },
  async mounted() {
    const { data } = await this.$axios.get(
      "https://api.spotify.com/v1/tracks",
      {
        params: {
          ids: this.trackIDs()
        }
      }
    );
    this.data.songs = data.tracks;
  },
  methods: {
    trackIDs() {
      return this.tracks.map(track => track.id).join(",");
    },
    nowPlaying(id) {
      return this.$store.nowPlaying == id;
    }
  },
  computed: {
    songs() {
      return this.data.songs;
    }
  },
  filters: {
    duration(time) {
      let duration = moment.duration(time);
      return moment.utc(duration.asMilliseconds()).format("mm:ss");
    }
  }
};
</script>

<style>
.card:hover > .card-img {
  opacity: 0.5;
}

.toggler {
  display: block;
  padding: 0.25rem 0.75rem;
  font-size: 0.99925rem;
  line-height: 1;
  background-color: transparent;
  border: 0.0625rem solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
}

.toggler-bar {
  display: block;
  position: relative;
  width: 22px;
  height: 1px;
  border-radius: 1px;
  background: #ffffff;
}

.toggler-kebab {
  margin-top: 0px;
  height: 4px;
  width: 4px;
  margin-bottom: 3px;
  border-radius: 50%;
}
</style>