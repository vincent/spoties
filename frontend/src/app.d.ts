import PocketBase, { AuthRecord } from "pocketbase";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pb: PocketBase;
      user: AuthRecord | undefined;
    }
    // interface PageData {}
    interface PageState {
      selected: any;
    }
    // interface Platform {}
  }
}

export {};
