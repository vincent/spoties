import { derived, writable } from "svelte/store";
import translations, { type Lang, type Translations } from "./translations";

export const locale = writable<Lang>("en");
export const locales = Object.keys(translations);

export function translate(
  locale: Lang,
  key: keyof Translations,
  vars: Record<string, any> = {}
) {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // Grab the translation from the translations object.
  let text = (translations as any)[locale][key];

  if (!text) throw new Error(`no translation found for ${locale}.${key}`);

  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(
  locale,
  ($locale) =>
    (key: keyof Translations, vars = {}) =>
      translate($locale as any, key, vars)
);

export function stripTags(input: string) {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}
