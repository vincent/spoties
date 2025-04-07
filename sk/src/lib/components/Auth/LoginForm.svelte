<script lang="ts">
  import { client, providerLogin } from "../../pocketbase";

  const { authCollection = "users" } = $props();
  const collection = client.collection(authCollection);

  let signup = $state(false);
  const form = $state({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    admin: false,
  });

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    if (signup) {
      await collection.create({ ...form });
    }
    // signin
    if (form.admin) {
      await client.admins.authWithPassword(form.email, form.password);
    } else {
      await collection.authWithPassword(form.email, form.password);
    }
  }
</script>


<div class="card p-6 space-y-6 shadow-xl w-100 mx-auto">
  {#await collection.listAuthMethods({ $autoCancel: false }) then methods}
    {#if methods.authProviders.length}
      <p class="font-semibold">Welcome, login with</p>
      <div class="flex flex-wrap space-y-4 space-x-0 md:flex-nowrap md:space-x-4 md:space-y-0">
        {#each methods.authProviders as p}
          <button type="button" class="btn variant-ringed-surface w-full gap-2" onclick={() => providerLogin(p, collection)}
            >{p.name}</button
          >
        {/each}
      </div>
      <div class="text-center">
        <hr class="-mb-4" />
        <span class="bg-surface-100-800-token p-2 text-sm">Or continue with email</span>
      </div>
    {/if}
    {:catch}
    <!-- pocketbase not working -->
  {/await}

  <form class="space-y-4" onsubmit={submit}>
    {#if !signup}
      <label class="label">
        <span>Email</span>
        <input type="email" placeholder="your-email@example.com" class="input" bind:value={form.email} required />
      </label>
      <label class="label">
        <span>Password</span>
        <input type="password" placeholder="Your password" class="input" bind:value={form.password} />
      </label>
      <div class="flex justify-between flex-wrap">
        <p class="text-sm unstyled py-2 text-slate-500">
          Don't have an account? <button type="button" onclick={() => (signup = true)}>Register</button>
        </p>
        <button class="btn variant-filled-primary">Login</button>
      </div>
    {:else}
      <label class="label">
        <span>Email</span>
        <input type="email" placeholder="your-email@example.com" class="input" bind:value={form.email} required />
      </label>
      <label class="label">
        <span>Password</span>
        <input type="password" placeholder="Your password" class="input" bind:value={form.password} />
      </label>
      <label class="label">
        <span class="label-text">Confirm password</span>
        <input class="input" required type="password" placeholder="Your password again" bind:value={form.passwordConfirm} />
      </label>
      <label class="label">
        <span class="label-text">Name</span>
        <input class="input" required type="text" placeholder="Your name" bind:value={form.name} />
      </label>
      <input type="hidden" name="register" value={true} />
      <div class="flex justify-between flex-wrap">
        <p class="text-sm unstyled py-2 text-slate-500">
          <button type="button" onclick={() => (signup = false)}>Back to login</button>
        </p>
        <button class="btn variant-filled-primary">Register</button>
      </div>
    {/if}
  </form>
</div>
