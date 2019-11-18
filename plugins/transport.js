import Vue from 'vue'

Vue.prototype.$play = async (context, store, axios) => {
  let payload = (context.type === "track") ? { uris: [context.uri] } : { context_uri: context.uri };
  await axios.put('/me/player/play', payload)
  const { data } = await axios.get('me/player')
  const { is_playing, progress_ms, item } = data
  if (is_playing) {
    store.dispatch('transport/updateIsPlaying', true)
    store.dispatch('transport/updateNowPlaying', item)
    store.dispatch('transport/updateProgress', { progress: progress_ms, duration: item.duration_ms })
  }
}

Vue.prototype.$pause = async (store, axios) => {
  await axios.put('/me/player/pause')
  const { data } = await axios.get('me/player')
  let { is_playing, progress_ms } = data
  if (!is_playing) {
    store.dispatch('transport/updateIsPlaying', false)
    store.dispatch('transport/updateProgress', { progress: progress_ms, duration: store.state.transport.nowPlaying.duration_ms })
  }

}

Vue.prototype.$unpause = async (store, axios) => {
  await axios.put('/me/player/play')
  const { data } = await axios.get('me/player')
  let { is_playing, progress_ms } = data
  if (is_playing) {
    store.dispatch('transport/updateIsPlaying', true)
    store.dispatch('transport/updateProgress', { progress: progress_ms, duration: store.state.transport.nowPlaying.duration })
  }
}