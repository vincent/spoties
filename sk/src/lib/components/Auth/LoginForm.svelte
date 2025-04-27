<script lang="ts">
  import { goto } from "$app/navigation";
  import type { UsersResponse } from "$lib/pocketbase/generated-types";
  import { client, providerLogin } from "../../pocketbase";
  import { Label, Input, Button, Card, Alert } from 'flowbite-svelte';
	import { t } from "$lib/i18n";

  const { returnUrl, authCollection = 'users' } = $props();
  const collection = client.collection(authCollection);
 
  let forFormLink = returnUrl?.match(/^\/event\/\w/);
  let signup = $state(false);
  let issue = $state(null);

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

    try {
      if (signup) {
        user = await collection.create({ ...form });
      }

      user = (await collection.authWithPassword<UsersResponse>(form.email, form.password, { expand: 'teams' })).record;

      if (signup) {
        const team = await client.collection('teams').create({ owner: user.id });
        await collection.update(user.id, { ...user, teams: [team.id] });
      }

      goto(returnUrl || '/welcome')

    } catch (error: any) {
      console.log(error)
      issue = error.toString()
    }
  }
</script>


<Card size={forFormLink ? 'lg' : 'sm'} class="flex flex-row p-6 space-y-6 shadow-xl mx-auto">
  {#if forFormLink}
    <figure class="w-3/5 mr-4 flex flex-col justify-center items-center p-6 pt-1 text-center border-gray-200 border-r dark:bg-gray-800 dark:border-gray-700">
      <blockquote class="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$t('login.welcome_1')}</h3>
        <p class="my-4 font-light">{$t('login.welcome_2')}</p>
        <p class="my-4 font-light">{$t('login.welcome_3')}</p>
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
        <p class="font-semibold">{$t('login.login_with')}</p>
        <div class="flex flex-wrap space-y-4 space-x-0 md:flex-nowrap md:space-x-4 md:space-y-0">
          {#each methods.oauth2.providers as p}
            <button type="button" class="btn variant-ringed-surface w-full gap-2" onclick={() => providerLogin(p, collection)}>{p.name}</button>
          {/each}
        </div>
        <div class="text-center">
          <hr class="-mb-4" />
          <span class="bg-surface-100-800-token p-2 text-sm">{$t('login.with_email')}</span>
        </div>
      {/if}
    {:catch}
      <!-- pocketbase not working -->
    {/await}
    <form class="space-y-4" onsubmit={submit}>
      {#if !signup}
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white p-0 mb-5">{$t('login.sign_in')}</h3>
        <div class="mb-6">
          <Label for="email" class="block mb-2">{$t('login.your_email')}</Label>
          <Input id="email" size="lg" placeholder="your-email@example.com" bind:value={form.email} required />
        </div>
        <div class="mb-6">
          <Label for="password" class="block mb-2">{$t('login.your_password')}</Label>
          <Input id="password" type="password" size="lg" placeholder="******" bind:value={form.password} required />
        </div>
        <div class="flex justify-between flex-wrap">
          <Button type="submit" class="w-full">{$t('login.login')}</Button>
        </div>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          {$t('login.no_account')} <a href="#" onclick={() => (signup = true)} class="font-medium text-primary-600 hover:underline dark:text-primary-500">{$t('login.register_here')}</a>
        </div>
      {:else}
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0 mb-5">{$t('login.create_an_account')}</h3>
        <div class="mb-6">
          <Label for="email" class="block mb-2">{$t('login.your_email')}</Label>
          <Input id="email" size="lg" placeholder="your-email@example.com" bind:value={form.email} required />
        </div>
        <div class="mb-6">
          <Label for="password" class="block mb-2">{$t('login.your_password')}</Label>
          <Input id="password" type="password" size="lg" placeholder="******" bind:value={form.password} required />
        </div>
        <div class="mb-6">
          <Label for="password" class="block mb-2">{$t('login.confirm_password')}</Label>
          <Input id="password" type="password" size="lg" placeholder="******" bind:value={form.passwordConfirm} required />
        </div>
        <div class="mb-6">
          <Label for="email" class="block mb-2">{$t('login.your_name')}</Label>
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
          <Button type="submit" class="w-full">{$t('login.register')}</Button>
        </div>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          {$t('login.have_an_account')} <a href="#" onclick={() => (signup = false)} class="font-medium text-primary-600 hover:underline dark:text-primary-500">{$t('login.login_here')}</a>
        </div>
      {/if}

      {#if issue}
        <Alert color="red">
          {$t('login.error')}
        </Alert>
      {/if}
    </form>
  </div>
</Card>
