<script lang="ts">
  import type {
    PlaceResult,
    ComponentOptions,
    RequestParams,
  } from "places-autocomplete-svelte/interfaces";
  import { PlaceAutocomplete } from "places-autocomplete-svelte";
  import { PUBLIC_GOOGLE_MAPS_API_KEY } from "$env/static/public";
  import { t } from "$lib/i18n";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";

  let {
    textValue = $bindable<string>(),
    geoValue = $bindable<string>(),
    locale = $bindable<string>("fr-FR"),
  } = $props();

  let fullResponse: PlaceResult | null = $state(null);
  let placesError = $state("");

  let country = $derived(locale.split("-")[1]);

  const ALL_LOCALES = [
    { locale: "ar-AE", label: "UAE" },
    { locale: "ar-EG", label: "Egypt" },
    { locale: "ar-SA", label: "Saudi Arabia" },
    { locale: "da-DK", label: "Denmark" },
    { locale: "de-AT", label: "Austria" },
    { locale: "de-CH", label: "Switzerland" },
    { locale: "de-DE", label: "Germany" },
    { locale: "en-AU", label: "Australia" },
    { locale: "en-CA", label: "Canada" },
    { locale: "en-GB", label: "United Kingdom" },
    { locale: "en-IE", label: "Ireland" },
    { locale: "en-NZ", label: "New Zealand" },
    { locale: "en-US", label: "United States" },
    { locale: "en-ZA", label: "South Africa" },
    { locale: "es-AR", label: "Argentina" },
    { locale: "es-CL", label: "Chile" },
    { locale: "es-CO", label: "Colombia" },
    { locale: "es-ES", label: "Spain" },
    { locale: "es-MX", label: "Mexico" },
    { locale: "es-PE", label: "Peru" },
    { locale: "es-VE", label: "Venezuela" },
    { locale: "fi-FI", label: "Finland" },
    { locale: "fr-BE", label: "Belgium" },
    { locale: "fr-CA", label: "Canada" },
    { locale: "fr-CH", label: "Switzerland" },
    { locale: "fr-FR", label: "France" },
    { locale: "hi-IN", label: "India" },
    { locale: "id-ID", label: "Indonesia" },
    { locale: "it-CH", label: "Switzerland" },
    { locale: "it-IT", label: "Italy" },
    { locale: "ja-JP", label: "Japan" },
    { locale: "ko-KR", label: "South Korea" },
    { locale: "ms-MY", label: "Malaysia" },
    { locale: "nl-BE", label: "Belgium" },
    { locale: "nl-NL", label: "Netherlands" },
    { locale: "no-NO", label: "Norway" },
    { locale: "pl-PL", label: "Poland" },
    { locale: "pt-BR", label: "Brazil" },
    { locale: "pt-PT", label: "Portugal" },
    { locale: "ru-RU", label: "Russia" },
    { locale: "sv-SE", label: "Sweden" },
    { locale: "th-TH", label: "Thailand" },
    { locale: "tr-TR", label: "Turkey" },
    { locale: "vi-VN", label: "Vietnam" },
    { locale: "zh-CN", label: "China (Simplified)" },
    { locale: "zh-HK", label: "Hong Kong" },
    { locale: "zh-TW", label: "Taiwan (Traditional)" },
  ];

  const handleResponse = (response: any) => {
    fullResponse = response;
    placesError = "";
    textValue = response.displayName;
    geoValue = `${response.location.lat},${response.location.lng}`;
  };

  const handleError = (error: string) => {
    placesError = error;
    fullResponse = null;
    geoValue = null;
  };

  // Control API request parameters
  const requestParams: Partial<RequestParams> = $derived({
    region: country, // Example: Bias results to Great Britain
    language: locale,
    includedRegionCodes: [country], // Example: Only show results in the specified regions,
    // includedPrimaryTypes: ['address'], // Example: Only show addresses
  });

  // Control which data fields are fetched for Place Details (affects cost!)
  const fetchFields: string[] = $state([
    "formattedAddress",
    "displayName",
    "location",
  ]);

  // Control component appearance and behavior
  const options: Partial<ComponentOptions> = $derived({
    placeholder: textValue || $t("event.form.geo_search"),
    debounce: 300, // Debounce input by 200ms (default is 100ms)
    distance: true, // Show distance if origin is provided in requestParams
    classes: {
      container: "relative z-10 transform",
      input:
        "ps-10 w-full text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-hidden focus:ring-0 peer border-gray-300 dark:border-gray-600 dark:focus:border-primary-500 focus:border-primary-600", // Example: Override input styling and highlight class
      highlight: "", // Customize suggestion highlighting
    },
  });
</script>

<div class="geo-location-search flex items-start">
  <Button outline class="p-2!">{country}</Button>
  <Dropdown simple class="h-48 w-48 overflow-y-auto p-0">
    {#each ALL_LOCALES as l}
      <DropdownItem class="w-full" onclick={() => (locale = l.locale)}
        >{l.label}</DropdownItem
      >
    {/each}
  </Dropdown>
  {#key locale}
    <PlaceAutocomplete
      {PUBLIC_GOOGLE_MAPS_API_KEY}
      {requestParams}
      {fetchFields}
      {options}
      onResponse={handleResponse}
      onError={handleError}
    />
  {/key}
</div>
{#if placesError}
  <div class="error-message" role="alert">
    Error: {placesError}
  </div>
{/if}

<!--
{#if fullResponse}
  <h2>Selected Place Details:</h2>
  <pre>{JSON.stringify(fullResponse, null, 2)}</pre>
  <pre>{JSON.stringify([textValue, geoValue], null, 2)}</pre>
{/if}
-->

<style>
  :global(.geo-location-search section) {
    flex-grow: 1;
  }
  :global(section .pointer-events-none.absolute) {
    color: var(--color-primary-500);
  }
  :global(.my-custom-input-class) {
    padding: 0.75rem;
    border-radius: 0.25rem;
    width: 100%;
    /* Add other styles */
  }
  .error-message {
    color: red;
    margin-bottom: 1rem;
  }
</style>
