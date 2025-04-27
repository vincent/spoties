<button
  type="button"
  class="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0 dark:focus:ring-gray-600"
  id="user-menu-button"
  aria-expanded="false"
  data-dropdown-toggle="dropdown"
>
  <span class="sr-only">Open user menu</span>
  <img
    class="h-8 w-8 rounded-full"
    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
    alt="user photo"
  />
</button>
<!-- Dropdown menu -->
<div
  class="z-50 my-4 hidden w-56 list-none divide-y divide-gray-100 rounded rounded-xl bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
  id="dropdown"
>
  <div class="px-4 py-3">
    <span class="block text-sm font-semibold text-gray-900 dark:text-white"
      >Neil Sims</span
    >
    <span class="block truncate text-sm text-gray-900 dark:text-white"
      >name@flowbite.com</span
    >
  </div>
  <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
    <li>
      <a
        href="#"
        class="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
        >My profile</a
      >
    </li>
    <li>
      <a
        href="#"
        class="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
        >Account settings</a
      >
    </li>
  </ul>
  <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
    <li>
      <a
        href="#"
        class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        ><svg
          class="mr-2 h-5 w-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
          ></path>
        </svg>
        My likes</a
      >
    </li>
    <li>
      <a
        href="#"
        class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        ><svg
          class="mr-2 h-5 w-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
          ></path>
        </svg>
        Collections</a
      >
    </li>
    <li>
      <a
        href="#"
        class="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <span class="flex items-center">
          <svg
            aria-hidden="true"
            class="text-primary-600 dark:text-primary-500 mr-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Pro version
        </span>
        <svg
          aria-hidden="true"
          class="h-5 w-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </li>
  </ul>
  <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
    <li>
      <a
        href="#"
        class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >Sign out</a
      >
    </li>
  </ul>
</div>
