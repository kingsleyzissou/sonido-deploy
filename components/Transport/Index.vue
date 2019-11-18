<template>
  <fragment>
    <div class="d-flex align-content-around" v-if="!loading">
      <div class="d-flex align-items-end pr-4">
        <div class="mr-4" style="width: 50px; height: 50px">
          <img :src="image" alt="Album cover" />
        </div>
        <div class="mr-2">
          <h5
            class="mb-0"
            v-html="$options.filters.stringify($store.state.transport.nowPlaying.artists)"
          ></h5>
          <h6
            class="album-title"
            v-if="$store.state.transport.nowPlaying.name"
          >{{$store.state.transport.nowPlaying.name}}</h6>
        </div>
      </div>
      <div class="text-center flex-grow-1">
        <div class="row">
          <div class="col-12 pb-2">
            <button class="btn btn-link">
              <span class="text-white">Repeat</span>
            </button>
            <button class="btn btn-link">
              <i class="tim-icons icon-minimal-left text-white"></i>
            </button>
            <template v-if="progress == 0">
              <button
                v-if="!isPlaying"
                @click="play($store.state.transport.nowPlaying)"
                class="btn btn-link"
              >
                <i class="tim-icons tim-icons-24 icon-triangle-right-17 text-white"></i>
              </button>
              <button v-else @click="pause" class="btn btn-link">
                <i class="tim-icons tim-icons-24 icon-button-pause text-white"></i>
              </button>
            </template>
            <template v-else>
              <button v-if="!isPlaying" @click="unpause" class="btn btn-link">
                <i class="tim-icons tim-icons-24 icon-triangle-right-17 text-white"></i>
              </button>
              <button v-if="isPlaying" @click="pause" class="btn btn-link">
                <i class="tim-icons tim-icons-24 icon-button-pause text-white"></i>
              </button>
            </template>
            <button class="btn btn-link">
              <i class="tim-icons icon-minimal-right text-white"></i>
            </button>
            <button class="btn btn-link">
              <span class="text-white">Shuffle</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-1">{{playhead}}</div>
          <div class="col-10" style="width: 100%">
            <div class="progress md-progress" style="height: 4px">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                :style="{width: `${progress}%`, height: '4px'}"
                :aria-valuenow="progress"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="col-1">{{ currentTrack.duration_ms | toTime}}</div>
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
  data() {
    return {
      loading: true,
      track: {},
      playing: false,
      meta: {
        progress: 0,
        progress_ms: 0,
        playhead: moment(0)
      },
      duration: "",
      interval: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("transport/poll");
      this.track = this.$store.state.transport.nowPlaying;
      this.playing = this.$store.state.transport.isPlaying;
      this.meta.progress = this.$store.state.transport.progress;
      this.duration = moment.duration(this.track.duration_ms);
      this.meta.progress_ms =
        (this.track.duration_ms * this.meta.progress) / 100;
      this.meta.playhead = !this.meta.progress_ms
        ? moment.utc().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        : moment(this.meta.progress_ms);
      if (this.playing) this.counter();
      this.loading = false;
    },
    update() {
      setTimeout(() => {
        this.init();
      }, 500);
    },
    counter() {
      this.interval = setInterval(() => {
        this.meta.playhead = moment(this.meta.playhead.add(1, "seconds"));
        this.meta.progress_ms += 1000;
        this.meta.progress = (this.meta.progress_ms / this.duration) * 100;
      }, 1000);
    },
    stopCounter() {
      clearInterval(this.interval);
    },
    play(track) {
      this.$play(track, this.$store, this.$axios);
      this.counter();
    },
    pause() {
      this.$pause(this.$store, this.$axios);
      this.stopCounter();
    },
    unpause() {
      this.$unpause(this.$store, this.$axios);
      this.counter();
    }
  },
  computed: {
    progress() {
      if (this.meta.progress < 100) return this.meta.progress;
      this.stopCounter();
      this.update();
    },
    playhead() {
      return this.meta.playhead.format("mm:ss");
    },
    image() {
      if (!this.loading) {
        let album = this.$store.state.transport.nowPlaying.album;
        return album && album.images.length > 0
          ? album.images[0].url
          : "/img/placeholder-square.png";
      }
    },
    currentTrack() {
      return this.$store.state.transport.nowPlaying;
    },
    isPlaying() {
      return this.$store.state.transport.isPlaying;
    }
  },
  filters: {
    stringify(artists) {
      if (artists) {
        const keys = artists.length;
        if (keys === 1) return createArtistLink(artists[0]);
        if (keys < 3) return artists.map(a => createArtistLink(a)).join(", ");
        artists = artists.slice(0, 2);
        return artists.map(a => createArtistLink(a)).join(", ") + "...";
      }
    },
    toTime(time) {
      let t = moment(time);
      return t.format("mm:ss");
    }
  }
};
</script>