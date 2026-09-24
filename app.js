import LandingPageComponent from './components/landing-page-component.js';
import AboutPageComponent from './components/about-page-component.js';
import NavbarComponent from './components/navbar-component.js';
import CollectionPageComponent from './components/collection-page-component.js';
import ItemDetailPageComponent from './components/item-detail-page-component.js';

const routes = [
  {
    path: '/',
    component: LandingPageComponent,
  },
  {
    path: '/about',
    component: AboutPageComponent,
  },
  {
    path: '/items',
    component: CollectionPageComponent,
  },
  {
    path: '/items/:id',
    component: ItemDetailPageComponent,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const splitList = (value) => String(value || '').split('|').map((item) => item.trim()).filter(Boolean);

const app = Vue.createApp({
  setup() {
    const itemsStore = Vue.reactive({
      items: [],
      isLoading: true,
      error: '',
      pinnedIds: [],
      isPinned(id) {
        return this.pinnedIds.includes(id);
      },
      togglePin(id) {
        if (this.isPinned(id)) {
          this.pinnedIds = this.pinnedIds.filter((pinnedId) => pinnedId !== id);
        } else {
          this.pinnedIds.push(id);
        }
      },
    });

    fetch('items-template.csv')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load CSV data file.');
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data, errors, meta }) => {
            const requiredFields = ['id', 'name', 'description', 'category', 'warning_signs', 'recommended_actions', 'prevention_tips', 'source_name', 'source_url'];
            const hasFields = requiredFields.every((field) => meta.fields?.includes(field));
            const ids = data.map((row) => String(row.id || '').trim());
            const validIds = ids.every(Boolean) && new Set(ids).size === ids.length;
            if (errors.length > 0 || !hasFields || !validIds) {
              itemsStore.error = 'The topic guides could not be read. Return Home and try again later.';
              itemsStore.items = [];
            } else {
              itemsStore.items = data.map((row) => ({
                id: String(row.id || '').trim(),
                name: String(row.name || '').trim(),
                description: String(row.description || '').trim(),
                category: String(row.category || '').trim(),
                imageUrl: String(row.image_url || '').trim(),
                warningSigns: splitList(row.warning_signs),
                recommendedActions: splitList(row.recommended_actions),
                preventionTips: splitList(row.prevention_tips),
                sourceName: String(row.source_name || '').trim(),
                sourceUrl: String(row.source_url || '').trim(),
              }));
              itemsStore.error = '';
            }
            itemsStore.isLoading = false;
          },
          error: () => {
            itemsStore.error = 'The topic guides could not be read. Return Home and try again later.';
            itemsStore.items = [];
            itemsStore.isLoading = false;
          },
        });
      })
      .catch(() => {
        itemsStore.error = 'The topic guides could not load. Check your connection, then try again.';
        itemsStore.items = [];
        itemsStore.isLoading = false;
      });

    Vue.provide('itemsStore', itemsStore);

    return {};
  },
});

app.component('navbar-component', NavbarComponent);

app.use(router);
app.mount('#app');
