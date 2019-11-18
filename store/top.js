export const state = () => ({
  tracks: [],
  artists: []
})

export const mutations = {
  setTracks(state, tracks) {
    state.tracks = tracks
  },
  setArtists(state, artists) {
    state.artists = artists
  }
}

export const actions = {
  updateTracks({ commit }, tracks) {
    commit('setTracks', tracks)
  },
  updateArtists({ commit }, artists) {
    commit('setArtists', artists)
  }
}