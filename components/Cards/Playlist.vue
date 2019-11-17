<template>
  <fragment>
    <div class="row">
      <div class="col-12">
        <div class="card p-2">
          <div class="card-body">
            <div class="d-flex align-items-end">
              <div class="mr-4" style="width: 275px; height: 100%">
                <img :src="playlist.images[0].url" alt="Album cover" />
              </div>
              <div class="mr-2">
                <h6 class="mb-0">Playlist</h6>
                <h2 class="album-title">{{playlist.name}}</h2>
                <p class="card-text">{{playlist.description}}</p>
                <span>by</span>
                <h6 class="muted">
                  <nuxt-link :to="`/profile/${playlist.owner.id}`">{{ playlist.owner.display_name }}</nuxt-link>
                </h6>
                <ul class="list-inline mb-2">
                  <li class="list-inline-item">{{ playlist.tracks.items.length | pluralise }}</li>
                </ul>
                <button class="btn btn-primary">Play</button>
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

const createArtistLink = artist => {
  return `<a href="/artists/${artist.id}">${artist.name}</a>`;
};

export default {
  props: ["playlist"],
  filters: {
    pluralise(total) {
      if (total == 1) return "1 song";
      return `${total} songs`;
    },
    getYear(date) {
      let d = moment(date, "YYYY-MM-DD");
      return d.year();
    },
    stringify(artists) {
      const keys = artists.length;
      if (keys === 1) return createArtistLink(artists[0]);
      return artists.map(a => createArtistLink(a)).join(", ");
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