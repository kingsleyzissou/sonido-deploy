export const state = () => ({
  playlists: []
})

export const mutations = {
  add(state, playlist) {
    state.playlists.push(playlist);
  },
  remove(state, playlist) {
    state.playlists.splice(state.playlists.indexOf(playlist), 1);
  },
  set(state, playlists) {
    state.playlists = playlists;
  }
}