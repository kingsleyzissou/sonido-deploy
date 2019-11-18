export const state = () => ({
  playlists: []
})

export const mutations = {
  setPlaylists(state, playlists) {
    state.playlists = playlists
  },
  addPlaylist(state, playlist) {
    state.playlists.push(playlist)
  }
}

export const actions = {
  async getPlaylists({ commit }) {
    if (this.$auth.loggedIn) {
      let { data } = await this.$axios.get(`/users/${this.$auth.$state.user.id}/playlists`);
      if (data) {
        commit('setPlaylists', data.items)
      }
    }
  },
  updatePlaylists({ commit }, playlists) {
    commit('setPlaylists', playlists)
  },
}