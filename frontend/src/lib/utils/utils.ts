export function isTempEvent(eventId: string) {
  return eventId === "create" || eventId === "stored";
}
