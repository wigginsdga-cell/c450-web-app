export default {
  name: 'navbar-component',
  template: /* html */ `
    <nav class="navbar bg-white border-bottom px-3 gap-3" aria-label="Main navigation">
      <router-link to="/" class="navbar-brand fw-bold mb-0">CyberGuide</router-link>
      <div class="d-flex flex-wrap gap-2">
        <router-link class="btn btn-outline-primary" to="/">Home</router-link>
        <router-link class="btn btn-outline-primary" to="/items">Security Topics</router-link>
        <router-link class="btn btn-outline-primary" to="/about">About</router-link>
      </div>
    </nav>
  `,
};
