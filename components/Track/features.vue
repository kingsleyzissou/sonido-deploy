<template>
  <fragment>
    <div class="row">
      <div class="col-4">
        <card v-show="!loading">
          <template slot="header">
            <h5 class="card-category">Danceability</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-planet text-success"></i>
              {{ features.danceability | toPercentage }}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-4">
        <card v-show="!loading">
          <template slot="header">
            <h5 class="card-category">Energy</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bulb-63 text-info"></i>
              {{ features.energy | toPercentage }}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-4">
        <card v-show="!loading">
          <template slot="header">
            <h5 class="card-category">Mood</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-satisfied text-primary"></i>
              {{ features.valence | toMood }}
            </h3>
          </template>
        </card>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      loading: true,
      tab: 0,
      categories: [
        { index: 0, name: "Charts" },
        { index: 1, name: "Featured" },
        { index: 2, name: "New Releases" },
        { index: 3, name: "Genre/Mood" }
      ],
      data: {
        features: {}
      }
    };
  },
  async mounted() {
    const { data } = await this.$axios.get(`/audio-features/${this.id}`);
    this.data.features = data;
    this.loading = false;
  },
  methods: {
    changeTab(index) {
      this.tab = index;
    }
  },
  computed: {
    features() {
      return this.data.features;
    }
  },
  filters: {
    toPercentage(value) {
      return Math.round(value * 100, 2) + "%";
    },
    toMood(value) {
      return value > 0.5 ? "Happy" : "Sad";
    }
  }
};
</script>