export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ commit }) {
    if (this.$auth.loggedIn) {
      const [tracks, artists, playlists] = await Promise.all([
        this.$axios.get('/me/top/tracks?limit=5'),
        this.$axios.get('/me/top/artists?limit=5'),
        this.$axios.get(`/users/${this.$auth.$state.user.id}/playlists`),
      ])
      console.log(playlists.data.items.length)
      commit('top/setTracks', tracks.data.items)
      commit('top/setArtists', artists.data.items)
      commit('playlists/setPlaylists', playlists.data.items)
    }
  },
}