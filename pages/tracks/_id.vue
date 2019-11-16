<template>
  <fragment>
    <div class="row">
      <div class="col-12">
        <card type="plain" class="mb-0">
          <h2 class="card-title">Audio Analysis</h2>
        </card>
      </div>
    </div>
    <ul class="nav">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{'active': active[0]}"
          href="#home"
          @click.prevent="switchTab(0)"
        >Analysis</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{'active': active[1]}"
          href="#home"
          @click.prevent="switchTab(1)"
        >Features</a>
      </li>
    </ul>
    <div v-show="active[0]">
      <analysis :id="$route.params.id"></analysis>
    </div>
    <div v-show="active[1]">
      <features :id="$route.params.id"></features>
    </div>
  </fragment>
</template>

<script>
import Analysis from "~/components/Track/Analysis";
import Features from "~/components/Track/Features";

export default {
  layout: "dashboard",
  components: { Analysis, Features },
  data() {
    return {
      active: [true, false]
    };
  },
  methods: {
    switchTab(index) {
      this.active = this.active.map((tab, i) => i == index);
    }
  }
};
</script>