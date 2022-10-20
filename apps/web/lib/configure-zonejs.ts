export default function configureZonejs() {
  (window as any).__Zone_disable_requestAnimationFrame = true;
  (window as any).__Zone_disable_on_property = true;
  (window as any).__zone_symbol__UNPATCHED_EVENTS = [
    "scroll",
    "mousemove",
    "resize",
  ];
}
