<script lang="ts">
  import type { UsersResponse } from "$lib/pocketbase/generated-types";
  import { Label, Input, Button, Card, Alert } from "flowbite-svelte";
  import PreFormSpotiesBlock from "./PreFormSpotiesBlock.svelte";
  import { client, providerLogin } from "../../pocketbase";
  import OnboardingBlock from "./OnboardingBlock.svelte";
  import { goto } from "$app/navigation";
  import { t } from "$lib/i18n";
  import type { RecordModel } from "pocketbase";

  const { siteName, returnUrl = "/", authCollection = "users" } = $props();
  const collection = client.collection(authCollection);

  let onboardingLink = returnUrl?.match(/^\/admin\/events\/stored/);
  let returnPath = returnUrl ? resolve_url(returnUrl).pathname : null;
  let forFormLink = returnPath?.match(/^\/event\/(\w*)/);
  let large = $derived(forFormLink || onboardingLink);
  let signup = $state(false);
  let issue = $state(null);

  const form = $state({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    admin: false,
  });

  let forForm = $state<RecordModel | null>(null);
  if (forFormLink)
    client
      .collection("events")
      .getOne(forFormLink?.[1])
      .then((e) => (forForm = e))
      .catch((_) => {
        // event does not exist or is not published
      });

  function resolve_url(url) {
    if (url instanceof URL) return url;

    let baseURI = document.baseURI;

    if (!baseURI) {
      const baseTags = document.getElementsByTagName("base");
      baseURI = baseTags.length ? baseTags[0].href : document.URL;
    }

    return new URL(url, baseURI);
  }

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    let user: UsersResponse;

    try {
      if (signup) {
        await collection.create(form);
        await collection.requestVerification(form.email);
      }

      user = (
        await collection.authWithPassword<UsersResponse>(
          form.email,
          form.password,
          { expand: "teams" }
        )
      ).record;

      goto(
        returnUrl
          ? returnUrl
          : user.teams?.length
            ? "/admin/events/list"
            : "/welcome"
      );
    } catch (error: any) {
      console.log(error);
      issue = error.toString();
    }
  }
</script>

<Card
  size={large ? "lg" : "sm"}
  class="mx-auto flex flex-col space-y-6 p-6 shadow-xl lg:flex-row"
>
  {#if onboardingLink}
    <OnboardingBlock {signup} {siteName} />
  {/if}
  <div class="w-auto lg:min-w-[300px]">
    <h3
      class="mb-3 p-0 text-center text-xl font-semibold text-gray-900 lg:text-start dark:text-white"
    >
      {$t("login.sign_in")}
    </h3>
    {#if forForm}
      <div
        class="mb-3 p-0 text-center text-sm text-gray-900 lg:text-start dark:text-white"
      >
        {@html $t("act.to_access_form", forForm)}
      </div>
    {/if}
    {#await collection.listAuthMethods({ $autoCancel: false }) then methods}
      {#if methods.oauth2?.providers.length}
        <p class="font-semibold">{$t("login.login_with")}</p>
        <div
          class="flex flex-wrap space-y-4 space-x-0 md:flex-nowrap md:space-y-0 md:space-x-4"
        >
          {#each methods.oauth2.providers as p}
            <button
              type="button"
              class="btn variant-ringed-surface w-full gap-2"
              onclick={() => providerLogin(p, collection)}>{p.name}</button
            >
          {/each}
        </div>
        <div class="text-center">
          <hr class="-mb-4" />
          <span class="bg-surface-100-800-token p-2 text-sm"
            >{$t("login.with_email")}</span
          >
        </div>
      {/if}
      {#if methods.otp?.enabled}
        <p class="font-semibold">{$t("login.login_with")}</p>
        <div
          class="flex flex-wrap space-y-4 space-x-0 md:flex-nowrap md:space-y-0 md:space-x-4"
        >
          TODO: Use OTP
        </div>
        <div class="text-center">
          <hr class="-mb-4" />
          <span class="bg-surface-100-800-token p-2 text-sm"
            >{$t("login.with_email")}</span
          >
        </div>
      {/if}
    {:catch}
      <!-- pocketbase not working -->
    {/await}
    <form class="space-y-4" onsubmit={submit}>
      {#if !signup}
        <div class="mb-6">
          <Label for="email" class="mb-2 block">{$t("login.your_email")}</Label>
          <Input
            id="email"
            size="lg"
            placeholder="your-email@example.com"
            bind:value={form.email}
            required
          />
        </div>
        <div class="mb-6">
          <Label for="password" class="mb-2 block"
            >{$t("login.your_password")}</Label
          >
          <Input
            id="password"
            type="password"
            size="lg"
            placeholder="******"
            bind:value={form.password}
            required
          />
        </div>
        <div class="flex flex-wrap justify-between">
          <Button type="submit" class="w-full">{$t("login.login")}</Button>
        </div>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          {$t("login.no_account")}
          <a
            href="#"
            onclick={() => (signup = true)}
            class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
            >{$t("login.register_here")}</a
          >
        </div>
      {:else}
        <h3 class="mb-5 p-0 text-xl font-medium text-gray-900 dark:text-white">
          {$t("login.create_an_account")}
        </h3>
        <div class="mb-6">
          <Label for="email" class="mb-2 block">{$t("login.your_email")}</Label>
          <Input
            id="email"
            size="lg"
            placeholder="your-email@example.com"
            bind:value={form.email}
            required
          />
        </div>
        <div class="mb-6">
          <Label for="password" class="mb-2 block"
            >{$t("login.your_password")}</Label
          >
          <Input
            id="password"
            type="password"
            size="lg"
            placeholder="******"
            bind:value={form.password}
            required
          />
        </div>
        <div class="mb-6">
          <Label for="password" class="mb-2 block"
            >{$t("login.confirm_password")}</Label
          >
          <Input
            id="password"
            type="password"
            size="lg"
            placeholder="******"
            bind:value={form.passwordConfirm}
            required
          />
        </div>
        <div class="mb-6">
          <Label for="email" class="mb-2 block">{$t("login.your_name")}</Label>
          <Input
            id="email"
            size="lg"
            placeholder="Your name"
            bind:value={form.name}
            required
          />
        </div>
        <input type="hidden" name="register" value={true} />
        <div class="flex flex-wrap justify-between">
          <Button type="submit" class="w-full">{$t("login.register")}</Button>
        </div>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          {$t("login.have_an_account")}
          <a
            href="#"
            onclick={() => (signup = false)}
            class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
            >{$t("login.login_here")}</a
          >
        </div>
      {/if}

      {#if issue}
        <Alert color="red">
          {$t("login.error")}
        </Alert>
      {/if}
    </form>
  </div>
  {#if forFormLink}
    <PreFormSpotiesBlock {signup} {siteName} />
  {/if}
</Card>
