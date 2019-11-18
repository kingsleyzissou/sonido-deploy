<template>
  <div class="table-full-width table-responsive">
    <table class="table table-borderless">
      <tbody>
        <nuxt-link
          tag="tr"
          style="cursor: pointer"
          :to="`/artists/${artist.id}`"
          v-for="(artist, index) in artists"
          :key="index"
        >
          <td>
            <div v-if="artist.images.length > 0">
              <img
                slot="card-image"
                :src="artist.images[0].url"
                class="rounded-circle"
                style="width: 40px; height: 40px"
                alt="Profile pic"
              />
            </div>
          </td>
          <td style="vertical-align: center">
            <h6 class="mb-0">{{artist.name}}</h6>
          </td>
        </nuxt-link>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["artists"]
};
</script>

<style scoped>
.table-borderless tr:hover {
  opacity: 0.8;
  background: #1e1e2f;
}
</style>