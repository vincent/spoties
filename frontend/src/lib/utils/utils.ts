export function isTempEvent(eventId: string) {
  return eventId === "create" || eventId === "stored";
}

export function highlight(text: string) {
  return text
    .replaceAll("{{", '<span class="text-primary-600">')
    .replaceAll("}}", "</span>");
}
