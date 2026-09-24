export default {
  name: 'item-detail-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const route = VueRouter.useRoute();
    const selectedItem = Vue.computed(() => itemsStore.items.find((item) => item.id === route.params.id));
    return { itemsStore, selectedItem };
  },
  template: /* html */ `
    <section class="container py-4">
      <router-link to="/items" class="d-inline-block mb-4">← Back to Security Topics</router-link>
      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading topic guidance...
      </div>
      <div v-else-if="itemsStore.error" class="alert alert-warning" role="alert">
        <p class="mb-2">{{ itemsStore.error }}</p>
        <router-link to="/">Return Home</router-link>
      </div>
      <div v-else-if="!selectedItem" class="alert alert-warning" role="alert">
        Item not found.
      </div>
      <article v-else class="card">
        <img v-if="selectedItem.imageUrl" :src="selectedItem.imageUrl"
          :alt="selectedItem.name + ' topic illustration'" class="item-detail-image w-100 object-fit-cover" />
        <div class="card-body p-4">
          <p class="small text-muted mb-2">{{ selectedItem.category }}</p>
          <h1>{{ selectedItem.name }}</h1>
          <div class="d-flex flex-wrap align-items-center gap-3 mt-3">
            <button type="button" class="btn" :class="itemsStore.isPinned(selectedItem.id) ? 'btn-outline-primary' : 'btn-primary'"
              :aria-pressed="itemsStore.isPinned(selectedItem.id)" @click="itemsStore.togglePin(selectedItem.id)">
              {{ itemsStore.isPinned(selectedItem.id) ? 'Unpin topic' : 'Pin topic' }}
            </button>
            <span v-if="itemsStore.isPinned(selectedItem.id)" class="fw-bold" role="status">Pinned</span>
          </div>
          <p class="small text-muted mt-2">Pinning saves guidance for later in this browser. It does not fix a threat.</p>
          <p v-if="itemsStore.storageMessage" class="small" role="status">{{ itemsStore.storageMessage }}</p>
          <section class="mt-4">
            <h2>Overview</h2>
            <p>{{ selectedItem.description }}</p>
          </section>
          <section class="mt-4 warning-signs">
            <h2>Warning signs</h2>
            <ul><li v-for="sign in selectedItem.warningSigns" :key="sign">{{ sign }}</li></ul>
          </section>
          <section class="mt-4 guidance-actions">
            <h2>What to do now</h2>
            <ol><li v-for="action in selectedItem.recommendedActions" :key="action">{{ action }}</li></ol>
          </section>
          <section class="mt-4">
            <h2>Prevention tips</h2>
            <ul><li v-for="tip in selectedItem.preventionTips" :key="tip">{{ tip }}</li></ul>
          </section>
          <section class="mt-4">
            <h2>Trusted source</h2>
            <p>{{ selectedItem.sourceName }}</p>
            <a :href="selectedItem.sourceUrl" class="source-link">{{ selectedItem.sourceUrl }}</a>
          </section>
        </div>
      </article>
    </section>
  `,
};
