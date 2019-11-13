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
                <th>Artist</th>
                <th>Album</th>
                <th></th>
                <th>Plays</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(song, index) in songs" :key="index">
                <td>
                  <i class="tim-icons icon-triangle-right-17"></i>
                </td>
                <td>{{song.track.name}}</td>
                <td>
                  <span v-html="$options.filters.stringify(song.track.artists)"></span>
                </td>
                <td>{{song.track.album.name}}</td>
                <td>
                  <dropdown
                    menu-on-right
                    title-tag="a"
                    class="nav-item"
                    menu-classes="dropdown-navbar"
                  >
                    <a slot="title" data-toggle="dropdown" aria-expanded="true">
                      <button type="button" class="toggler">
                        <span class="toggler-bar toggler-kebab"></span>
                        <span class="toggler-bar toggler-kebab"></span>
                        <span class="toggler-bar toggler-kebab"></span>
                      </button>
                    </a>
                    <li class="nav-link">
                      <a href="#" class="nav-item dropdown-item">View artist</a>
                    </li>
                    <li class="nav-link">
                      <a href="#" class="nav-item dropdown-item">View album</a>
                    </li>
                    <li class="nav-link">
                      <a href="#" class="nav-item dropdown-item">Add to playlist</a>
                    </li>
                  </dropdown>
                </td>
                <td>{{song.track.duration_ms | duration}}</td>
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

const createArtistLink = artist => {
  return `<a href="/artists/${artist.id}">${artist.name}</a>`;
};

export default {
  props: ["songs"],
  components: {
    Table
  },
  mounted() {
    console.log(this.songs[0].track);
  },
  filters: {
    stringify(artists) {
      const keys = artists.length;
      if (keys === 1) return createArtistLink(artists[0]);
      if (keys < 3) return artists.map(a => createArtistLink(a)).join(", ");
      artists = artists.slice(0, 2);
      return artists.map(a => createArtistLink(a)).join(", ") + "...";
    },
    duration(time) {
      let duration = moment.duration(time);
      return moment.utc(duration.asMilliseconds()).format("mm:ss");
    }
  }
};
</script>

<style scoped>
.card:hover > .card-img {
  /* scale(1.2,1.2) */
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