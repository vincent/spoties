<script lang="ts">
  import type { PlaceResult, ComponentOptions, RequestParams } from 'places-autocomplete-svelte/interfaces'; 
  import { PlaceAutocomplete } from 'places-autocomplete-svelte';
  import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
  import { t } from '$lib/i18n';

  let {
    textValue = $bindable<string>(),
    geoValue = $bindable<string>(),
  } = $props();

  let fullResponse: PlaceResult | null = $state(null);
  let placesError = $state('');
  
  const handleResponse = (response: any) => {
    fullResponse = response;
    placesError = '';
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
    region: 'ES', // Example: Bias results to Great Britain
    language: 'es-ES',
    includedRegionCodes: ['ES'], // Example: Only show results in the specified regions,
    // includedPrimaryTypes: ['address'], // Example: Only show addresses
  });
  
  // Control which data fields are fetched for Place Details (affects cost!)
  const fetchFields: string[] = $state(['formattedAddress', 'displayName', 'location']);
  
  // Control component appearance and behavior
  const options: Partial<ComponentOptions> = $derived({
    placeholder: textValue || $t('event.form.geo_search'),
    debounce: 300, // Debounce input by 200ms (default is 100ms)
    distance: true, // Show distance if origin is provided in requestParams
    classes: {
      container: 'relative z-10 transform',
      input: 'ps-10 w-full text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-hidden focus:ring-0 peer border-gray-300 dark:border-gray-600 dark:focus:border-primary-500 focus:border-primary-600', // Example: Override input styling and highlight class
      highlight: '', // Customize suggestion highlighting
    }
  });
</script>

<PlaceAutocomplete
  {PUBLIC_GOOGLE_MAPS_API_KEY}
  {requestParams}
  {fetchFields}
  {options}
  onResponse={handleResponse}
  onError={handleError}
/>

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
  :global(section .pointer-events-none.absolute) {
    color: var(--color-primary-500)
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