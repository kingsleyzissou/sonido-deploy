<template>
  <fragment>
    <div class="row">
      <div class="col-12">
        <card type="plain">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6 text-left">
                <h2 class="card-title">{{name}}</h2>
              </div>
            </div>
          </template>
        </card>
      </div>
    </div>
    <songlist :songs="tracks.items"></songlist>
  </fragment>
</template>

<script>
import Songlist from "~/components/Songlist";
export default {
  layout: "dashboard",
  components: {
    Songlist
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/playlists/${params.id}`);
    return data;
  }
};
</script>