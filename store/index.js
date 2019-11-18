export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ commit }) {
    if (this.$auth.loggedIn) {
      const [tracks, artists] = await Promise.all([
        this.$axios.get('/me/top/tracks?limit=5'),
        this.$axios.get('/me/top/artists?limit=5')
      ])
      commit('top/setTracks', tracks.data.items)
      commit('top/setArtists', artists.data.items)
    }
  },
}