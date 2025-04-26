import { locale } from "$lib/i18n";
import { get } from "svelte/store";

export function formatDate(d: Date) {
    return new Intl.DateTimeFormat(get(locale), { dateStyle: "full" }).format(new Date(d))
}