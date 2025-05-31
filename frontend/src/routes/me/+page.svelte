<script lang="ts">
  import DeleteButton from "$lib/components/Shared/DeleteButton.svelte";
  import Nav from "$lib/components/Nav/Nav.svelte";
  import { client } from "$lib/pocketbase";
  import { goto } from "$app/navigation";

  const { data } = $props();
  let user = client.authStore.record;

  function removeCurrentUserData() {
    client
      .send(`/api/user/delete`, { method: "post", body: {} })
      .then((_) => client.authStore.clear())
      .then((_) => goto("/"));
  }
</script>

<div
  class="mx-auto w-full max-w-(--breakpoint-2xl) bg-white p-5 dark:bg-gray-800"
>
  <div class="mb-8">
    <div class="mb-2 flex items-center gap-4">
      <span class="font-semibold text-gray-700">Nom</span>
      <span class="text-gray-800 dark:text-gray-400">{user?.name}</span>
    </div>
    <div class="flex items-center gap-4">
      <span class="font-semibold text-gray-700">Email</span>
      <span class="text-gray-800 dark:text-gray-400">{user?.email}</span>
    </div>
  </div>

  <!--
  <div class="mb-8">
    <div class="flex items-center gap-4">
      <span class="font-semibold text-gray-700">Événements créés</span>
      {#if data.createdEventsCount > 0}
        <span class="text-gray-800 dark:text-gray-400">{data.createdEventsCount}</span>
      {:else}
        <p class="text-gray-800 dark:text-gray-400">Aucun</p>
      {/if}
    </div>
  </div>
  -->

  <div class="mb-8">
    <h2 class="mb-2 text-lg font-semibold text-gray-700">
      Formulaires auxquels vous avez répondu
    </h2>
    <ul class="list-inside list-disc space-y-1">
      <li class="text-gray-800 dark:text-gray-400">
        {data.answeredEvents.answers} réponses
      </li>
      <li class="text-gray-800 dark:text-gray-400">
        {data.answeredEvents.bookings} lieux
      </li>
    </ul>
  </div>

  <div class="mt-10 flex justify-end">
    <DeleteButton
      size="xl"
      text={"Supprimer toutes mes données"}
      message={"Toutes vos réponses, tous vos évènements, ainsi que votre compte seront supprimés. Êtes-vous sûr ?"}
      confirm={() => removeCurrentUserData()}
    />
  </div>
</div>
