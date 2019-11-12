<template>
  <nav class="navbar is-black main-navbar">
    <div class="container">
      <div class="navbar-brand">
        <a href="/" class="navbar-item">
          <i class="fas fa-anchor"></i>&nbsp;&nbsp;
          WEBMARK.IO
        </a>
        <span class="navbar-burger burger" :class="{'is-active': active}" @click="active = !active">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div class="navbar-menu" :class="{'is-active': active}">
        <div class="navbar-end">
          <a
            href="/categories"
            class="navbar-item"
            :class="{'is-active': current === 'dashboard'}"
          >Dashboard</a>
          <a href="/about" class="navbar-item" :class="{'is-active': current === 'about'}">About</a>
          <div class="navbar-item has-dropdown is-hoverable" v-if="authenticated">
            <a class="navbar-link">
              <!-- Docs&nbsp; -->
              <figure class="image is-24x24">
                <img :src="user.images[0].url" style="border-radius: 999px" alt="Placeholder image" />
              </figure>
              <span v-cloak>&nbsp;&nbsp;@{{ user.display_name }}</span>
            </a>
            <div class="navbar-dropdown is-right">
              <a class="navbar-item" href="/profile">View Profile</a>
              <hr class="navbar-divider" />
              <a class="navbar-item" href="/logout">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      authenticated: this.$auth.loggedIn,
      user: this.$auth.$state.user,
      current: false,
      active: false
    };
  }
};
</script>