<script>
  import Nav from "$lib/components/Nav/Nav.svelte";
  const { data } = $props();
  const { name: siteName, logo: siteLogo } = $derived(data.config.site ?? {});
</script>

<section
  class="mx-auto flex min-h-screen w-full max-w-(--breakpoint-2xl) flex-col"
>
  <Nav {siteName} {siteLogo} />

  <div class="p-4 md:p-8 lg:p-16 dark:bg-gray-800">
    <h1
      class="mb-6 text-3xl leading-tight font-bold tracking-tight text-gray-900 dark:text-white"
    >
      How to Create Multi-Location Event Forms: The Complete Guide for Event
      Organizers
    </h1>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      Managing volunteers and staff across multiple event locations can be
      overwhelming. Whether you're organizing a music festival, conference, or
      community event, coordinating people across different venues requires the
      right tools. This comprehensive guide shows you how to create professional
      event forms with multiple locations using Spoti.es, the event staffing
      platform.
    </p>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      What is Multi-Location Event Management?
    </h2>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Multi-location event management involves coordinating staff, volunteers,
      and participants across several venues simultaneously. This approach is
      common for:
    </p>
    <ul class="mb-6 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>Culture festival across multiple places and dates</li>
      <li>Music festivals with multiple stages</li>
      <li>Corporate conferences with breakout rooms</li>
      <li>Community events spanning different neighborhoods</li>
      <li>Trade shows with various exhibition areas</li>
      <li>Sports tournaments at multiple facilities</li>
    </ul>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      The key challenge is ensuring each location has adequate staffing while
      maintaining clear communication across all venues.
    </p>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      Why Choose Spoti.es for Multi-Location Events?
    </h2>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Spoti.es is specifically designed for event organizers who need to manage
      complex, multi-location events efficiently. Unlike generic form builders,
      Spoti.es offers location-specific features that streamline volunteer
      coordination and event staffing.
    </p>
    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Key Benefits:
    </h3>
    <ul class="mb-6 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Location-based organization</span>: Assign
        specific roles to different venues
      </li>
      <li>
        <span class="font-semibold">Slot management</span>: Control capacity and
        timing for each location
      </li>
      <li>
        <span class="font-semibold">Geo-location integration</span>: Precise
        venue mapping
      </li>
      <li>
        <span class="font-semibold">Real-time coordination</span>: Instant
        updates across all locations
      </li>
      <li>
        <span class="font-semibold">Professional presentation</span>: Clean,
        accessible forms that encourage participation
      </li>
    </ul>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      Step-by-Step Guide: Creating Your Multi-Location Event Form
    </h2>
    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Getting Started with Spoti.es
    </h3>
    <ol class="mb-6 list-inside list-decimal text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold"
          >Navigate to <a
            href="https://spoti.es"
            class="text-primary-700 hover:text-primary-900 underline"
            >https://spoti.es</a
          ></span
        >
      </li>
      <li>
        <span class="font-semibold">Create your event</span> by:
        <ul class="ml-6 list-inside list-disc">
          <li>Clicking the main button from the homepage, or</li>
          <li>Selecting "add new" from your existing events list</li>
        </ul>
      </li>
    </ol>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Setting Up Your Event Form
    </h3>
    <h4 class="mt-6 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Event Details
    </h4>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Start by establishing your event foundation:
    </p>
    <ul class="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Event Title</span>: Choose a clear,
        descriptive name that reflects your event's purpose
      </li>
      <li>
        <span class="font-semibold">Event Description</span>: Provide
        comprehensive details about your event, including:
        <ul class="ml-6 list-inside list-disc">
          <li>Date and duration</li>
          <li>Overall purpose and goals</li>
          <li>What participants can expect</li>
          <li>Any special requirements or preparations needed</li>
        </ul>
      </li>
    </ul>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      A well-written description increases participant engagement and helps you
      find the best staff organization for your event.
    </p>

    <h4 class="mt-6 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Creating Effective Questions
    </h4>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Questions gather essential information from all participants, regardless
      of their chosen location. Strategic questioning helps you:
    </p>
    <ul class="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>Collect contact information</li>
      <li>Understand participant experience levels</li>
      <li>Gather dietary restrictions or accessibility needs</li>
      <li>Assess availability and commitment levels</li>
    </ul>
    <p class="mb-2 font-semibold text-gray-700 dark:text-gray-300">
      Question Types Available:
    </p>
    <ul class="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Personal information</span>: Names, address
      </li>
      <li>
        <span class="font-semibold">Short Text</span>: Phone numbers, emergency
        contacts
      </li>
      <li>
        <span class="font-semibold">Long Text</span>: Experience descriptions,
        special requests, availability details
      </li>
      <li>
        <span class="font-semibold">Single Choice</span>: Preferred
        communication method, T-shirt sizes
      </li>
      <li>
        <span class="font-semibold">Multiple Choice</span>: Skills, previous
        event experience, interests
      </li>
      <li>
        <span class="font-semibold">Range</span>: Experience level (1-10),
        availability hours
      </li>
      <li>
        <span class="font-semibold">Rating</span>: Preference rankings, comfort
        levels with different tasks
      </li>
    </ul>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      <span class="font-semibold">Pro Tip</span>: Mark critical questions as
      required, but keep optional questions for gathering bonus information that
      could improve your event planning.
    </p>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Managing Multiple Locations
    </h3>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      The locations section is where Spoti.es truly shines for multi-location
      events. Each location represents a distinct venue or area within your
      event.
    </p>
    <h4 class="mt-6 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Location Setup
    </h4>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      For each venue, provide:
    </p>
    <ul class="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Location Label</span>: Short, memorable name
        (e.g., "Main Stage", "Registration Tent", "Food Court")
      </li>
      <li>
        <span class="font-semibold">Detailed Description</span>: Include
        specific instructions, amenities, and expectations
      </li>
      <li>
        <span class="font-semibold">Geo-location</span>: Precise mapping helps
        participants find venues and assists with logistics
      </li>
    </ul>

    <h4 class="mt-6 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Understanding Slots: The Key to Efficient Staffing
    </h4>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Slots represent specific opportunities within each location. They provide
      granular control over your event staffing:
    </p>
    <p class="mb-2 font-semibold text-gray-700 dark:text-gray-300">
      Time-based Slots:
    </p>
    <ul class="mb-2 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>"Morning Shift (8AM-12PM)"</li>
      <li>"Afternoon Coverage (12PM-5PM)"</li>
      <li>"Evening Setup (5PM-8PM)"</li>
    </ul>
    <p class="mb-2 font-semibold text-gray-700 dark:text-gray-300">
      Area-specific Slots:
    </p>
    <ul class="mb-2 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>"Front Entrance Security"</li>
      <li>"Backstage Coordination"</li>
      <li>"VIP Area Management"</li>
    </ul>
    <p class="mb-2 font-semibold text-gray-700 dark:text-gray-300">
      Capacity Management:
    </p>
    <ul class="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Limited Slots</span>: "Sound Booth (2 people
        max)"
      </li>
      <li>
        <span class="font-semibold">Unlimited Slots</span>: "General Volunteers
        (unlimited)"
      </li>
    </ul>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      This flexibility allows you to match exact staffing needs with volunteer
      availability while preventing overstaffing or understaffing issues.
    </p>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Location Management Strategies
    </h3>
    <ol class="mb-6 list-inside list-decimal text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Consistent Naming</span>: Use clear, logical
        names across all locations
      </li>
      <li>
        <span class="font-semibold">Detailed Descriptions</span>: Include
        parking information, nearby landmarks, and special instructions
      </li>
      <li>
        <span class="font-semibold">Realistic Capacity</span>: Set appropriate
        limits based on actual space and supervision capabilities
      </li>
      <li>
        <span class="font-semibold">Backup Planning</span>: Consider how you'll
        handle last-minute changes or no-shows
      </li>
    </ol>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Communication Excellence
    </h3>
    <ol class="mb-6 list-inside list-decimal text-gray-700 dark:text-gray-300">
      <li>
        <span class="font-semibold">Pre-event Coordination</span>: Send
        location-specific information to assigned participants
      </li>
      <li>
        <span class="font-semibold">Day-of Updates</span>: Use Spoti.es
        notification features for real-time communication
      </li>
      <li>
        <span class="font-semibold">Cross-location Coordination</span>: Maintain
        communication channels between venue coordinators
      </li>
    </ol>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Real-time Management
    </h3>
    <ul class="mb-6 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>View live registration counts by location</li>
      <li>Track capacity utilization across venues</li>
      <li>Receive instant notifications for new sign-ups or changes</li>
    </ul>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Post-Event Analysis
    </h3>
    <ul class="mb-6 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>Analyze participation patterns by location</li>
      <li>Review capacity utilization</li>
      <li>Collect feedback from participants</li>
    </ul>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      Common Multi-Location Event Challenges and Solutions
    </h2>
    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Challenge: Uneven Distribution
    </h3>
    <p class="mb-2 text-gray-700 dark:text-gray-300">
      <span class="font-semibold">Problem</span>: Some locations get too many
      volunteers while others are understaffed.<br />
      <span class="font-semibold">Solution</span>: Use Spoti.es capacity limits
      and provide clear descriptions of what each location involves.
    </p>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Challenge: Last-Minute Changes
    </h3>
    <p class="mb-2 text-gray-700 dark:text-gray-300">
      <span class="font-semibold">Problem</span>: Volunteers cancel or venue
      changes occur.<br />
      <span class="font-semibold">Solution</span>: Leverage Spoti.es
      notification system to quickly communicate updates to affected
      participants.
    </p>

    <h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Challenge: Complex Logistics
    </h3>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      <span class="font-semibold">Problem</span>: Coordinating across multiple
      venues becomes overwhelming.<br />
      <span class="font-semibold">Solution</span>: Use location-specific
      messaging and clear role definitions within each slot.
    </p>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      Success Stories: Multi-Location Events Using Spoti.es
    </h2>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Event organizers report significant improvements in coordination
      efficiency when using Spoti.es for multi-location events. Common benefits
      include:
    </p>
    <ul class="mb-6 list-inside list-disc text-gray-700 dark:text-gray-300">
      <li>Reduction in planning time</li>
      <li>Decreased no-show rates due to better communication</li>
      <li>Improved volunteer satisfaction through clear role definitions</li>
      <li>Enhanced event coordination across venues</li>
    </ul>

    <h2 class="mt-10 mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
      Getting Started Today
    </h2>
    <p class="text-gray-700 dark:text-gray-300">
      Ready to streamline your multi-location event management? Visit <a
        href="https://spoti.es"
        class="text-primary-700 hover:text-primary-900 underline"
        >https://spoti.es</a
      > and experience the difference professional event staffing tools can make.
      With intuitive form creation, powerful location management, and real-time coordination
      features, Spoti.es transforms complex multi-venue events into manageable, successful
      experiences.
    </p>
  </div>
</section>
