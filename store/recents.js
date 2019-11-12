export const state = () => ({
  recents: []
})

export const mutations = {
  add(state, recent) {
    state.recents.push(recent);
  },
  remove(state, recent) {
    state.recents.splice(state.recents.indexOf(recent), 1);
  },
  set(state, recents) {
    state.recents = recents;
  }
}
