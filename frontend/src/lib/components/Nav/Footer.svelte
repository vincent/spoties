<script lang="ts">
  import {
    QuestionCircleOutline,
    UserCircleOutline,
  } from "flowbite-svelte-icons";
  import { GithubIcon, SpeakerIcon } from "lucide-svelte";

  const { siteName, siteLogo, siteUrl } = $props();
</script>

<footer class="bottom-0 w-full bg-white p-4 sm:p-6 dark:bg-gray-800">
  <div class="mx-auto max-w-screen-xl">
    <!--
        <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
                <a href={siteUrl} class="flex items-center">
                    <img src={siteLogo} class="mr-3 h-8" alt={`${siteName} Logo`} />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{siteName}</span>
                </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                    <ul class="text-gray-600 dark:text-gray-400">
                        <li class="mb-4">
                            <a href="https://flowbite.com" class="hover:underline">Flowbite</a>
                        </li>
                        <li>
                            <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                    <ul class="text-gray-600 dark:text-gray-400">
                        <li class="mb-4">
                            <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Github</a>
                        </li>
                        <li>
                            <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© {new Date().getFullYear()}
        <a href={siteUrl} class="hover:underline">{siteName}</a>. All Rights
        Reserved.
      </span>
      <div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
        <a
          href="/about"
          class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <QuestionCircleOutline />
        </a>
        <a
          target="_blank"
          href="https://spoti.featurebase.app"
          class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <UserCircleOutline />
        </a>
        <a
          target="_blank"
          href="https://github.com/vincent/spoties"
          class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <GithubIcon />
        </a>
      </div>
    </div>
  </div>
</footer>
