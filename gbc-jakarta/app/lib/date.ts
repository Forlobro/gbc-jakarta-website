/**
 * Date/time utilities for GBC Jakarta.
 *
 * All timestamps are stored in Supabase as timestamptz but entered as
 * "naive" local Jakarta time (no offset). We therefore read the raw
 * ISO string directly instead of converting through the JS Date UTC
 * machinery, which would shift the time by +7 hours.
 *
 * Example: "2026-06-11T09:00:00+00:00" → displayed as "09:00 WIB"
 */

/**
 * Format the date portion of an ISO timestamp string.
 * e.g. "2026-06-11T09:00:00+00:00" → "11 June 2026"
 */
export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—"
  const localPart = dateStr.slice(0, 10) // "2026-06-11"
  const [year, month, day] = localPart.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/**
 * Format the date portion with short month for compact displays (e.g. admin tables).
 * e.g. "2026-06-11T09:00:00+00:00" → "11/06/2026"
 */
export function formatDateShort(dateStr: string | null | undefined): string {
  if (!dateStr) return "—"
  const localPart = dateStr.slice(0, 10)
  const [year, month, day] = localPart.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })
}

/**
 * Format a date range from start to end.
 * - Same day        → "11 June 2026"
 * - Same month/year → "11 – 13 June 2026"
 * - Same year       → "28 June – 3 July 2026"
 * - Different years → "30 December 2025 – 2 January 2026"
 */
export function formatDateRange(
  startStr: string | null | undefined,
  endStr: string | null | undefined,
): string {
  if (!startStr) return "—"
  if (!endStr) return formatDate(startStr)

  const [sy, sm, sd] = startStr.slice(0, 10).split("-").map(Number)
  const [ey, em, ed] = endStr.slice(0, 10).split("-").map(Number)

  // Same day
  if (sy === ey && sm === em && sd === ed) return formatDate(startStr)

  const startDate = new Date(sy, sm - 1, sd)
  const endDate = new Date(ey, em - 1, ed)

  // Same month and year → "11 – 13 June 2026"
  if (sy === ey && sm === em) {
    return `${sd} – ${endDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`
  }

  // Same year → "28 June – 3 July 2026"
  if (sy === ey) {
    return `${startDate.toLocaleDateString("en-GB", { day: "numeric", month: "long" })} – ${endDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`
  }

  // Different years → "30 December 2025 – 2 January 2026"
  return `${formatDate(startStr)} – ${formatDate(endStr)}`
}

/**
 * Format the time portion of an ISO timestamp string, appending "WIB".
 * e.g. "2026-06-11T09:00:00+00:00" → "09:00 WIB"
 */
export function formatTime(dateStr: string | null | undefined): string {
  if (!dateStr) return "—"
  return dateStr.slice(11, 16)
}
