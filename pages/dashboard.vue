<template>
  <fragment>
    <div class="row">
      <div class="col-12">
        <card type="plain">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6 text-left">
                <h2 class="card-title">{{ categories[tab].title }}</h2>
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
        </card>
      </div>
    </div>
    <card type="plain">
      <div v-show="tab == 0">
        <chartlist />
      </div>
      <div v-show="tab == 1">
        <featured v-show="tab == 1" />
      </div>
      <div v-show="tab == 2">
        <recommendations />
      </div>
      <div v-show="tab == 3">
        <new-releases />
      </div>
    </card>
  </fragment>
</template>
<script>
import Chartlist from "~/components/Chartlist";
import Featured from "~/components/Featured";
import Recommendations from "~/components/Recommendations";
import NewReleases from "~/components/NewReleases";

export default {
  layout: "dashboard",
  components: {
    Chartlist,
    Featured,
    Recommendations,
    NewReleases
  },
  data() {
    return {
      tab: 0,
      categories: [
        { index: 0, name: "Genres & Moods", title: "Genres & Moods" },
        { index: 1, name: "Featured", title: "Editor's Picks" },
        { index: 2, name: "Recommendations", title: "For you" },
        { index: 3, name: "New Releases", title: "New Releases" }
      ]
    };
  },
  methods: {
    changeTab(index) {
      this.tab = index;
    }
  }
};
</script>