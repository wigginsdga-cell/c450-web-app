export default {
  name: 'collection-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const searchText = Vue.ref('');
    const searchField = Vue.ref(null);
    function clearFilters() {
      searchText.value = '';
      selectedCategory.value = '';
      searchField.value?.focus();
    }
    const selectedCategory = Vue.ref('');
    const categories = Vue.computed(() => [...new Set(itemsStore.items.map((item) => item.category))].sort());
    const filteredItems = Vue.computed(() => {
      const query = searchText.value.trim().toLowerCase();
      return itemsStore.items.filter((item) => {
        const matchesText = [item.name, item.description, item.category].some((value) => value.toLowerCase().includes(query));
        const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value;
        return matchesText && matchesCategory;
      });
    });
    return { itemsStore, searchText, searchField, selectedCategory, categories, filteredItems, clearFilters };
  },
  template: /* html */ `
    <section class="container py-4">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 class="mb-0">Security Topics</h1>
        <span class="text-muted" role="status">{{ filteredItems.length }} topics</span>
      </div>
      <p>Choose a topic to see warning signs and practical next steps.</p>

      <div class="row g-3 mb-4">
        <div class="col-12 col-md-6">
          <label for="topic-search" class="form-label">Search topics</label>
          <input ref="searchField" id="topic-search" type="search" class="form-control" v-model="searchText"
            placeholder="Search a topic, description, or category" />
        </div>
        <div class="col-12 col-md-4">
          <label for="topic-category" class="form-label">Category</label>
          <select id="topic-category" class="form-select" v-model="selectedCategory">
            <option value="">All</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="col-12 col-md-2 d-flex align-items-end">
          <button type="button" class="btn btn-outline-primary w-100" @click="clearFilters">Clear</button>
        </div>
      </div>

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
      <div v-else-if="filteredItems.length === 0" class="alert alert-secondary" role="status">
        <p>No topics match your search. Clear the filters to try again.</p>
        <button type="button" class="btn btn-outline-primary" @click="clearFilters">Clear filters</button>
      </div>
      <div v-else class="row g-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="item in filteredItems" :key="item.id">
          <article class="card h-100">
            <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name + ' topic illustration'"
              class="card-img-top collection-card-image object-fit-cover" />
            <div class="card-body d-flex flex-column">
              <p class="small text-muted mb-2">{{ item.category }}</p>
              <h2 class="h5 card-title">{{ item.name }}</h2>
              <p v-if="itemsStore.isPinned(item.id)" class="small fw-bold">Pinned</p>
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
