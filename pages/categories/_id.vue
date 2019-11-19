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
    <category :id="id"></category>
  </fragment>
</template>

<script>
import Category from "~/components/Category/Index.vue";
export default {
  layout: "dashboard",
  components: {
    Category
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/browse/categories/${params.id}`);
    return data;
  }
};
</script>