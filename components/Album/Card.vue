<template>
  <fragment>
    <div class="row">
      <div class="col-12">
        <div class="card p-2">
          <div class="card-body">
            <div class="d-flex align-items-end">
              <div class="mr-4" style="width: 275px; height: 100%">
                <img :src="album.images[0].url" alt="Album cover" />
              </div>
              <div class="mr-2">
                <h6 class="mb-0">Album</h6>
                <h2 class="album-title">{{album.name}}</h2>
                <span>by</span>
                <h6 class="muted" v-html="$linkFactory(album.artists[0], 'albums')"></h6>
                <ul class="list-inline mb-0">
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
  props: ["album"],
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
    },
    stringify(artists) {
      const keys = artists.length;
      if (keys === 1) return this.createArtistLink(artists[0]);
      if (keys < 3)
        return artists.map(a => this.createArtistLink(a)).join(", ");
      artists = artists.slice(0, 2);
      return artists.map(a => this.createArtistLink(a)).join(", ") + "...";
    }
  }
};
</script>

<style scoped>
.album-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 0;
}
</style>