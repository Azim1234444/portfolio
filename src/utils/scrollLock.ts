/**
 * Ref-counted page scroll lock.
 *
 * Several overlays need to freeze the page (lightbox, mobile menu). When each
 * one wrote `document.body.style.overflow` directly, the last writer won: close
 * the mobile menu while the lightbox is open and the page silently regained
 * scroll — or worse, an overlay unmounted and left the page frozen.
 *
 * Counting locks means the page unfreezes exactly when the final holder
 * releases. Lenis reads body overflow, so this drives smooth scroll too.
 */
let locks = 0;
let restore = "";

export function lockScroll() {
  if (locks === 0) {
    restore = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  locks += 1;
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks === 0) document.body.style.overflow = restore;
}
