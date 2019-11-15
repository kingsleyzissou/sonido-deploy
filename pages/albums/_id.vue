<template>
  <fragment>
    <div class="row" v-show="!loading">
      <div class="col-12">
        <div class="card p-2">
          <div class="card-body">
            <div class="d-flex align-items-end">
              <div class="mr-4" style="width: 220px; height: 100%">
                <img :src="album.images[0].url" alt="Album cover" />
              </div>
              <div class="mr-2">
                <h6>Album</h6>
                <h2 class="card-title">{{album.name}}</h2>
                <span>by</span>
                <h6 class="muted">{{album.artists[0].name}}</h6>
                <ul class="list-inline">
                  <li class="list-inline-item">{{ album.release_date | getYear }}&nbsp;&nbsp;|</li>
                  <li class="list-inline-item">{{ album.total_tracks | pluralise }}&nbsp;&nbsp;|</li>
                  <li class="list-inline-item">{{ album.tracks.items | getDuration }}</li>
                </ul>
                <button class="btn btn-primary">Stuff</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import moment, { duration } from "moment";
export default {
  layout: "dashboard",
  components: {},
  data() {
    return {
      loading: false
    };
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/albums/${params.id}`);
    return {
      album: data
    };
  },
  filters: {
    pluralise(total) {
      if (total == 1) return "1 song";
      return `${total} songs`;
    },
    getYear(date) {
      let d = moment(date, "YYYY-MM-DD");
      return d.year();
    },
    getDuration(tracks) {
      let total = 0;
      tracks.map(track => (total = total + track.duration_ms));
      return moment.duration(total).humanize();
    }
  }
};
</script>