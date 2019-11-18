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
                <th>Duration</th>
                <th width="8%">Pop.</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(song, index) in songs" :key="index">
                <template v-if="song.track">
                  <td>
                    <i class="tim-icons icon-triangle-right-17"></i>
                  </td>
                  <td>
                    {{song.track.name}}&nbsp;
                    <span
                      v-if="song.track.explicit"
                      class="badge badge-outline badge-secondary"
                    >Explicit</span>
                  </td>
                  <td>
                    <span v-html="$options.filters.stringify(song.track.artists)"></span>
                  </td>
                  <td>
                    <nuxt-link
                      :to="`/albums/${song.track.album.id}`"
                      class="text-primary"
                    >{{song.track.album.name}}</nuxt-link>
                  </td>
                  <td>
                    <dropdown menu-on-right title-tag="a" class="nav-item" menu-classes="dropdown">
                      <a slot="title" data-toggle="dropdown" aria-expanded="true">
                        <button type="button" class="toggler">
                          <span class="toggler-bar toggler-kebab"></span>
                          <span class="toggler-bar toggler-kebab"></span>
                          <span class="toggler-bar toggler-kebab"></span>
                        </button>
                      </a>
                      <li class="nav-link">
                        <a
                          :href="`/artists/${song.track.artists[0].id}`"
                          class="nav-item dropdown-item"
                        >View artist</a>
                      </li>
                      <li class="nav-link">
                        <a
                          :href="`/albums/${song.track.album.id}`"
                          class="nav-item dropdown-item"
                        >View album</a>
                      </li>
                      <li class="nav-link">
                        <a
                          href="#"
                          class="nav-item dropdown-item"
                          @click.prevent="addToPlaylist(song.track)"
                        >Add to playlist</a>
                      </li>
                    </dropdown>
                  </td>
                  <td class="text-right">{{song.track.duration_ms | duration}}</td>
                  <td>
                    <div class="progress md-progress" style="height: 8px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        :style="{width: `${song.track.popularity}%`, height: '8px'}"
                        :aria-valuenow="song.track.popularity"
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

const createArtistLink = artist => {
  return `<a href="/artists/${artist.id}">${artist.name}</a>`;
};

export default {
  props: ["songs"],
  components: {
    Table
  },
  methods: {
    addToPlaylist(track) {
      this.$bus.$emit("add-to-playlist", track);
    }
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