<template>
  <div class="row">
    <div class="col-lg-3" v-for="(chart,index) in chartlist" :key="index">
      <a :href="`/categories/${chart.id}`" class="card bg-dark text-white text-center">
        <img class="card-img" :src="chart.icons[0].url" alt="Card image" />
        <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
          <h3 class="card-title">{{chart.name}}</h3>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { charts: [] };
  },
  async mounted() {
    this.$axios.$get("/browse/categories/").then(({ categories }) => {
      const { items } = categories;
      console.log(items);
      this.charts = items;
    });
  },
  computed: {
    chartlist() {
      return this.charts;
    }
  }
};
</script>

<style scoped>
.card:hover > .card-img {
  /* scale(1.2,1.2) */
  opacity: 0.5;
}
</style>