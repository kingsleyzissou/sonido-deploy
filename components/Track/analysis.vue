<template>
  <fragment>
    <div class="row">
      <div class="col-6">
        <card v-show="!loading">
          <template slot="header">
            <h5 class="card-category">Sample Rate</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-sound-wave text-primary"></i>
              {{ track.analysis_sample_rate + 'Hz' }}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-6">
        <card v-show="!loading">
          <template slot="header">
            <h5 class="card-category">Samples</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-chart-bar-32 text-success"></i>
              {{ track.num_samples }}
            </h3>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <card v-show="!loading">
          <template slot="header">
            <h5 class="card-category">Song Key</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-key-25 text-danger"></i>
              {{ track.key | keyLookup }}
              {{ track.mode | modeLookup}}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-4">
        <card v-show="!loading">
          <template slot="header">
            <h5 class="card-category">Average loudness</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-volume-98 text-info"></i>
              {{ track.loudness + 'dBs' }}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-4">
        <card v-show="!loading">
          <template slot="header">
            <h5 class="card-category">Bars</h5>
            <h3 class="card-title">
              <span class="tim-icons text-warning">#</span>
              {{ bars }}
            </h3>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6 text-left">
                <h2 class="card-title">{{categories[tab].title}}</h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle float-right" data-toggle="buttons">
                  <label
                    v-for="(category, index) in categories"
                    :key="index"
                    class="btn btn-sm btn-primary btn-simple"
                    :class="{active: tab === index}"
                  >
                    <input
                      type="radio"
                      @click="changeTab(index)"
                      name="options"
                      autocomplete="off"
                      :checked="tab === index"
                    />
                    {{category.name}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              ref="chart"
              chart-id="big-line-chart"
              :chart-data="chart.data"
              :gradient-colors="chart.gradientColors"
              :gradient-stops="chart.gradientStops"
              :extra-options="chart.extraOptions"
            ></line-chart>
          </div>
        </card>
      </div>
    </div>
  </fragment>
</template>

<script>
import LineChart from "~/ui/Charts/LineChart";
import * as chartConfigs from "~/ui/Charts/config";

export default {
  props: ["id"],
  components: {
    LineChart
  },
  data() {
    return {
      loading: true,
      tab: 0,
      categories: [
        { index: 0, name: "Loudness", title: "Loudness (in dBs)" },
        { index: 1, name: "Tempo", title: "Tempo (in bpm)" }
      ],
      chart: {
        data: { datasets: [{}] },
        extraOptions: chartConfigs.loudnessChartOptions,
        gradientColors: this.$config.colors.purpleGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      track: {},
      bars: Number,
      beats: Number,
      data: [
        {
          data: [],
          labels: []
        },
        {
          data: [],
          labels: []
        }
      ]
    };
  },
  async mounted() {
    const { data } = await this.$axios.get(`/audio-analysis/${this.id}`);
    const { track, sections, beats, bars } = data;
    const [loudness, dbLabels] = this.loudness(sections);
    const [tempo, bpmLabels] = this.tempo(sections);
    const dbChart = chartConfigs.chartData(this.$config, loudness, dbLabels);
    const bpmChart = chartConfigs.chartData(this.$config, tempo, bpmLabels);
    this.data = [dbChart, bpmChart];
    this.track = track;
    this.beats = beats.length;
    this.bars = bars.length;
    this.changeTab(this.tab);
    this.loading = false;
  },
  methods: {
    loudness(sections) {
      const loudness = sections.map(section => section.loudness);
      const labels = sections.map(section => section.loudness + " dBs");
      return [loudness, labels];
    },
    tempo(sections) {
      const loudness = sections.map(section => section.tempo);
      const labels = sections.map(section => section.tempo + " bpm");
      return [loudness, labels];
    },
    changeTab(index) {
      const chart = this.data[index];
      this.tab = index;
      this.$refs.chart.updateGradients(chart);
      this.chart.data = chart;
    }
  },
  computed: {
    features() {
      return this.data.features;
    }
  },
  filters: {
    keyLookup(key) {
      const keyTable = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B"
      ];
      return keyTable[key];
    },
    modeLookup(mode) {
      return mode === 0 ? "minor" : "";
    }
  }
};
</script>
