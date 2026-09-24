export default {
  name: 'landing-page-component',
  template: /* html */ `
    <section class="container py-4">
      <h1>Simple help for common security questions</h1>
      <p class="lead mb-4">Find warning signs, steps to take now, and ways to stay safer online.</p>
      <router-link to="/items" class="btn btn-primary mb-4">View Security Topics</router-link>

      <h2 class="mb-3">Where would you like to start?</h2>
      <div class="row g-3">
        <div class="col-12 col-md-4">
          <router-link to="/items/phishing" class="card home-topic h-100 p-3">
            <h3 class="h5">Phishing</h3>
            <p>Received an unexpected email or message?</p>
            <span class="mt-auto">Read Phishing guidance →</span>
          </router-link>
        </div>
        <div class="col-12 col-md-4">
          <router-link to="/items/account-compromise" class="card home-topic h-100 p-3">
            <h3 class="h5">Account Compromise</h3>
            <p>Noticed account activity you do not recognize?</p>
            <span class="mt-auto">Read Account Compromise guidance →</span>
          </router-link>
        </div>
        <div class="col-12 col-md-4">
          <router-link to="/items" class="card home-topic h-100 p-3">
            <h3 class="h5">Prevention</h3>
            <p>Learn habits that help protect your accounts and devices.</p>
            <span class="mt-auto">Browse topics →</span>
          </router-link>
        </div>
      </div>
    </section>
  `,
};
