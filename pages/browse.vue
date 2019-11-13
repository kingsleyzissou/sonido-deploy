<template>
  <fragment>
    <div class="row">
      <div class="col-12">
        <card type="plain">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6 text-left">
                <h2 class="card-title">Browse</h2>
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
    <chartlist v-show="tab == 0"></chartlist>
  </fragment>
</template>
<script>
import Chartlist from "~/components/Chartlist";
export default {
  layout: "dashboard",
  components: {
    Chartlist
  },
  data() {
    return {
      tab: 0,
      categories: [
        { index: 0, name: "Charts" },
        { index: 1, name: "Featured" },
        { index: 2, name: "New Releases" },
        { index: 3, name: "Genre/Mood" }
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
<style>
</style>