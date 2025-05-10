<script lang="ts">
  import { stripTags, t } from "$lib/i18n";
  import { Card, Hr, Toggle } from "flowbite-svelte";
  import { formatDate } from "$lib/utils/dates.svelte";

  let { responses, event } = $props();

  let options = $state({
    userName: true,
    userEmail: true,
    ...(event.locations.reduce((acc, l) => ({
      ...acc,
      ...(l.slots.reduce((acc, s) => ({
        ...acc,
        [s.id]: true,
      }), {}))
    }), {}))
  })
</script>

<div class="flex justify-between items-start">
  <section class="paper">
    <div class="header">
      <img src="/api/placeholder/200/100" alt="Event Logo" class="logo">
      <h1 class="event-title">{event.title}</h1>
      <div class="date">April 26, 2025</div>
      <div class="contact">
        <p><strong>Media Contact:</strong> [Contact Name]</p>
        <p><strong>Phone:</strong> [Phone Number]</p>
        <p><strong>Email:</strong> [Email Address]</p>
      </div>
    </div>

    <div class="event-details">
      <p>[Brief description of the event - what it is, why it's significant, and what attendees can expect]</p>
    </div>

    <div class="organizer">
      <h3><strong>About the Organizer</strong></h3>
      <p>[Description of the organizing entity - who they are, their mission, and their role in the event]</p>
    </div>

    <div class="locations">
      <h3><strong>Event Schedule & Locations</strong></h3>

      {#each event.locations as l}
        {#if l.slots.length}
          <div class="location-item">
            <div class="location-name">{@html l.name}</div>
            {#each l.slots as s}
              {#if options[s.id]}
                <div class="slot-item">
                  <div class="flex justify-between">
                    <div class="location-name">{@html s.label}</div>
                    <div class="time"><strong>{formatDate(s.starts_at)}</strong></div>
                  </div>
                  <div class="participants">
                    {#each responses as r, i}
                      {#if r.bookings.includes(s.id)}
                        {#if options.userName}{r.user.name}{/if}
                        {#if options.userEmail}{r.user.email}{/if}
                        <br>
                      {/if}
                    {/each}
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        {/if}
      {/each}
    </div>
    
    <div class="additional-info">
      <h3><strong>Additional Information</strong></h3>
      <p>[Any other important details - ticket information, registration process, COVID protocols, etc.]</p>
    </div>
    
    <div class="footer">
      <p>For more information, visit [Website URL] or follow us on social media at [Social Media Handles]</p>
      <p>###</p>
    </div>
  </section>

  <div class="ml-3 sticky top-18">
    <Card class="p-3 space-y-2">
      <div class="text-gray-400">{$t('act.show')}</div>
      {#each event.locations as l}
        <div class="text-gray-500">{stripTags(l.name)}</div>
        {#each l.slots as s}
          <Toggle bind:checked={options[s.id]}>{stripTags(s.label)}</Toggle>
        {/each}
      {/each}
      <Hr/>
      <Toggle bind:checked={options.userName}>Include names</Toggle>
      <Toggle bind:checked={options.userEmail}>Include emails</Toggle>
      <Hr/>
    </Card>
  </div>
</div>

<style>
  .paper {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    color: #333;
  }
  .paper .header {
    text-align: center;
    margin-bottom: 30px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 20px;
  }
  .paper .logo {
    max-width: 200px;
    height: auto;
    margin-bottom: 20px;
  }
  .paper h1 {
    margin: 5em auto;
    color: #2c3e50;
  }
  .paper .date {
    font-style: italic;
    color: #7f8c8d;
    margin-bottom: 20px;
  }
  .paper .contact {
    margin-top: 10px;
    font-size: 0.9em;
  }
  .paper .event-details {
    margin-bottom: 30px;
  }
  .paper .organizer {
    margin-bottom: 30px;
  }
  .paper .locations {
    margin-bottom: 30px;
  }
  .paper .location-item {
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #222;
  }
  .paper .slot-item {
    padding-left: 1em;
    border-bottom: 1px solid #eee;
  }
  .paper .location-item:last-child {
    border-bottom: none;
  }
  .paper .location-name {
    font-weight: bold;
    color: #2980b9;
    margin-bottom: 5px;
  }
  .paper .time, .paper .participants {
    margin-top: 10px;
    text-align: right;
  }
  .paper .footer {
    font-size: 0.9em;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
    text-align: center;
  }
</style>
