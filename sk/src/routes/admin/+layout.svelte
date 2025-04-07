<script lang="ts">
    import { Navigation } from "@skeletonlabs/skeleton-svelte";
    // Icons
    import IconMenu from "lucide-svelte/icons/menu";
    import IconCalendar from "lucide-svelte/icons/calendar-1";
    import IconMapPin from "lucide-svelte/icons/map-pin";
    import IconSettings from "lucide-svelte/icons/settings";
  
    const { children } = $props();

    let expanded = $state(true);
  
    function toggleExpanded() {
      expanded = !expanded;
    }
  </script>
  
  <div
    class="card border-surface-100-900 grid h-[760px] w-full grid-cols-[auto_1fr] border-[1px]"
  >
    <!-- Component -->
    <Navigation.Rail {expanded}>
      {#snippet header()}
        <Navigation.Tile
          labelExpanded="Menu"
          onclick={toggleExpanded}
          title="Toggle Menu Width"><IconMenu /></Navigation.Tile
        >
      {/snippet}
      {#snippet tiles()}
        <Navigation.Tile labelExpanded="Events" href="/admin/events">
            <IconCalendar />
        </Navigation.Tile>
        <Navigation.Tile labelExpanded="Locations" href="/admin/locations">
            <IconMapPin />
        </Navigation.Tile>
      {/snippet}
      {#snippet footer()}
        <Navigation.Tile
          labelExpanded="Settings"
          href="/settings"
          title="Settings"><IconSettings /></Navigation.Tile
        >
      {/snippet}
    </Navigation.Rail>
    <!-- Content -->
    {@render children()}
  </div>
  