import axios from 'axios'

export const state = () => ({
  nowPlaying: { id: '' },
  progress: {},
  isPlaying: false
})

export const mutations = {
  setNowPlaying(state, nowPlaying) {
    state.nowPlaying = nowPlaying
  },
  setProgress(state, { progress, duration }) {
    state.progress = (progress / duration) * 100
  },
  setIsPlaying(state, isPlaying) {
    state.isPlaying = isPlaying
  }
}

export const actions = {
  async poll({ commit, dispatch }) {
    if (this.$auth.loggedIn) {
      const { data } = await this.$axios.get('/me/player')
      if (data) {
        const { item, is_playing, progress_ms } = data
        commit('setNowPlaying', item)
        commit('setIsPlaying', is_playing)
        commit('setProgress', { progress: progress_ms, duration: item.duration_ms })
        // return
      }
      // dispatch('getPrevious')
    }
  },
  async getPrevious({ commit }) {
    if (this.$auth.loggedIn) {
      const { data } = await this.$axios.get('/me/player/recently-played?limit=1')
      if (data) {
        const { track } = data.items[0]
        commit('setNowPlaying', track)
        commit('setIsPlaying', false)
        commit('setProgress', { progress: 0, duration: track.duration_ms })
      }
    }
  },
  updateNowPlaying({ commit, state }, nowPlaying) {
    commit('setNowPlaying', nowPlaying)
    return state.nowPlaying
  },
  updateProgress({ commit, state }, payload) {
    commit('setProgress', payload)
    return state.progress
  },
  updateIsPlaying({ commit, state }, isPlaying) {
    commit('setIsPlaying', isPlaying)
    return state.isPlaying
  }
}