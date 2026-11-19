/**
 * Spawns a compositor-friendly touch/click ripple inside any `relative overflow-hidden` control.
 * Respects `prefers-reduced-motion: reduce`.
 *
 * @param {React.PointerEvent<HTMLElement>} e
 */
export function triggerRipple(e) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const el = e.currentTarget;
  if (!el || el.disabled) return;

  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.9;
  const hasPointerCoords = typeof e.clientX === 'number' && e.clientX > 0;
  const x = (hasPointerCoords ? e.clientX - rect.left : rect.width / 2) - size / 2;
  const y = (hasPointerCoords ? e.clientY - rect.top : rect.height / 2) - size / 2;

  const span = document.createElement('span');
  span.className = 'kiosk-ripple';
  span.setAttribute('aria-hidden', 'true');
  span.style.width = `${size}px`;
  span.style.height = `${size}px`;
  span.style.left = `${x}px`;
  span.style.top = `${y}px`;

  el.appendChild(span);
  const cleanup = () => span.remove();
  span.addEventListener('animationend', cleanup, { once: true });
  window.setTimeout(cleanup, 650);
}
