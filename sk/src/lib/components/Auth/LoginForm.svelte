<script lang="ts">
  import { goto } from "$app/navigation";
  import type { UsersResponse } from "$lib/pocketbase/generated-types";
  import { client, providerLogin } from "../../pocketbase";
  import { Label, Input, Button, Card } from 'flowbite-svelte';
  import { page } from "$app/stores";

  const { returnUrl, authCollection = 'users' } = $props();
  const collection = client.collection(authCollection);
 
  let forFormLink = returnUrl?.match(/^\/event\/\w/)
  let signup = $state(false);
  const form = $state({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    admin: false,
  });

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    let user: UsersResponse
    if (signup) {
      user = await collection.create({ ...form });
      await client.collection('teams').create({ owner: user.id });
    }
    // signin
    if (form.admin) {
      await client.admins.authWithPassword(form.email, form.password);
    } else {
      await collection.authWithPassword(form.email, form.password, { expand: 'teams' });
    }
    goto(returnUrl || '/welcome')
  }
</script>


<Card size={forFormLink ? 'lg' : 'sm'} class="flex flex-row p-6 space-y-6 shadow-xl mx-auto">
  {#if forFormLink}
    <figure class="w-3/5 mr-4 flex flex-col justify-center items-center p-6 pt-1 text-center border-gray-200 border-r dark:bg-gray-800 dark:border-gray-700">
      <blockquote class="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Hi, Thank you for checking us!</h3>
        <p class="my-4 font-light">To answer the form you've been invited, we need your email.</p>
        <p class="my-4 font-light">We promise we wont send you anything without your approval.</p>
      </blockquote>
      <figcaption class="flex justify-center items-center space-x-3 rtl:space-x-reverse">
        <img class="w-15 h-15 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="Karen profile" />
        <div class="space-y-0.5 font-medium dark:text-white text-left">
          <div>Vincent</div>
          <div class="text-sm font-light text-gray-500 dark:text-gray-400">RegSpot team</div>
        </div>
      </figcaption>
    </figure>
  {/if}
  <div class="w-100">
    {#await collection.listAuthMethods({ $autoCancel: false }) then methods}
      {#if methods.oauth2?.providers.length}
        <p class="font-semibold">Welcome, login with</p>
        <div class="flex flex-wrap space-y-4 space-x-0 md:flex-nowrap md:space-x-4 md:space-y-0">
          {#each methods.oauth2.providers as p}
            <button type="button" class="btn variant-ringed-surface w-full gap-2" onclick={() => providerLogin(p, collection)}>{p.name}</button>
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
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white p-0 mb-5">Sign in</h3>
        <div class="mb-6">
          <Label for="email" class="block mb-2">Your email</Label>
          <Input id="email" size="lg" placeholder="your-email@example.com" bind:value={form.email} required />
        </div>
        <div class="mb-6">
          <Label for="password" class="block mb-2">Your password</Label>
          <Input id="password" size="lg" placeholder="******" bind:value={form.password} required />
        </div>
        <div class="flex justify-between flex-wrap">
          <Button type="submit" class="w-full">Login</Button>
        </div>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Don't have an account? <a href="#" onclick={() => (signup = true)} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</a>
        </div>
      {:else}
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0 mb-5">Create an account</h3>
        <div class="mb-6">
          <Label for="email" class="block mb-2">Your email</Label>
          <Input id="email" size="lg" placeholder="your-email@example.com" bind:value={form.email} required />
        </div>
        <div class="mb-6">
          <Label for="password" class="block mb-2">Your password</Label>
          <Input id="password" size="lg" placeholder="******" bind:value={form.password} required />
        </div>
        <div class="mb-6">
          <Label for="password" class="block mb-2">Confirm password</Label>
          <Input id="password" size="lg" placeholder="******" bind:value={form.passwordConfirm} required />
        </div>
        <div class="mb-6">
          <Label for="email" class="block mb-2">Name</Label>
          <Input id="email" size="lg" placeholder="Your name" bind:value={form.name} required />
        </div>
        <div class="flex items-start">
          <label class="text-sm rtl:text-right font-medium text-gray-900 dark:text-gray-300 flex items-center">
            <input type="checkbox" value="on" class="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 me-2 dark:bg-gray-700 dark:border-gray-600 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600">
              I accept the <a class="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">Terms and Conditions</a>
          </label>
        </div>
        <input type="hidden" name="register" value={true} />
        <div class="flex justify-between flex-wrap">
          <p class="text-sm unstyled py-2 text-slate-500">
            <button type="button" onclick={() => (signup = false)}>Back to login</button>
          </p>
          <Button type="submit" class="w-full">Register</Button>
        </div>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already have an account? <a href="#" onclick={() => (signup = false)} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
        </div>
      {/if}
    </form>
  </div>
</Card>
