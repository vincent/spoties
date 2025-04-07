<script lang="ts">
    import LoginBadge from "./Auth/LoginBadge.svelte";

  const links = [
    ["/", "Home"],
    ["/posts/", "Posts"],
    ["/hello/", "Hello"],
  ];

  const { siteName } = $props();
  let isMenuOpen = $state(false);
</script>

<nav class="bg-white shadow">
  <div class="mx-1 px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex w-full">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <span class="text-xl font-bold text-indigo-600"><a href="/">{siteName}</a></span>
        </div>
        
        <!-- Navigation links - Desktop -->
        <div class="hidden sm:ml-auto sm:flex sm:space-x-8">
          <a href="/" class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Dashboard
          </a>
          <a href="/locations" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Locations
          </a>
          <a href="/bookings" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Bookings
          </a>
          <a href="/settings" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Settings
          </a>
        </div>
      </div>
      
      <!-- User menu -->
      <div class="flex items-center">
        <div class="ml-3 relative">
          <LoginBadge />
        </div>
        
        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden ml-3">
          <button 
            onclick={() => isMenuOpen = !isMenuOpen}
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Mobile menu -->
  {#if isMenuOpen}
    <div class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <a href="/" class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Dashboard</a>
        <a href="/locations" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Locations</a>
        <a href="/bookings" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Bookings</a>
        <a href="/settings" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Settings</a>
      </div>
    </div>
  {/if}
</nav>