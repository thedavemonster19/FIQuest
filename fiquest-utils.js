/**
 * FIQuest shared utility helpers.
 *
 * Loaded before each page's inline script so these are available as globals.
 * Only helpers whose behavior is identical across every page live here. The
 * currency helpers (formatCurrency / formatCurrencyInput) intentionally remain
 * per-page for now because their implementations genuinely diverge (e.g. some
 * pages attach input listeners while others reformat immediately, and negative
 * formatting differs) — consolidating them needs a dedicated behavioral pass.
 */

// Insert thousands separators into a number (e.g. 1234567 -> "1,234,567").
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Parse a display string back to a number, tolerating "$" and "," (e.g.
// "$1,234" -> 1234). Returns 0 for blank/invalid input.
function unformatNumber(str) {
    return parseFloat(str.toString().replace(/[$,]/g, '')) || 0;
}

// Escape user-supplied text before injecting it into innerHTML, so values like
// a scenario name of `<img onerror=...>` cannot execute.
function escapeHtml(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
