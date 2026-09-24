export default {
  name: 'collection-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    return { itemsStore };
  },
  template: /* html */ `
    <section class="container py-4">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 class="mb-0">Security Topics</h1>
        <span class="text-muted">{{ itemsStore.items.length }} topics</span>
      </div>
      <p>Choose a topic to see warning signs and practical next steps.</p>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading security topics...
      </div>
      <div v-else-if="itemsStore.error" class="alert alert-warning" role="alert">
        <p class="mb-2">{{ itemsStore.error }}</p>
        <router-link to="/">Return Home</router-link>
      </div>
      <div v-else-if="itemsStore.items.length === 0" class="alert alert-warning" role="status">
        <p>No topic guides are available right now.</p>
        <router-link to="/">Return Home</router-link>
      </div>
      <div v-else class="row g-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="item in itemsStore.items" :key="item.id">
          <article class="card h-100">
            <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name + ' topic illustration'"
              class="card-img-top collection-card-image object-fit-cover" />
            <div class="card-body d-flex flex-column">
              <p class="small text-muted mb-2">{{ item.category }}</p>
              <h2 class="h5 card-title">{{ item.name }}</h2>
              <p class="card-text flex-grow-1">{{ item.description }}</p>
              <router-link :to="'/items/' + item.id" class="btn btn-outline-primary">
                View guidance<span class="visually-hidden"> for {{ item.name }}</span>
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
};
