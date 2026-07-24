<script setup lang="ts">
import {
  AttributionControl,
  Map as MapLibreMap,
  Marker as MapLibreMarker,
  NavigationControl,
  setWorkerUrl,
} from 'maplibre-gl';
import mapLibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import { openStreetMapStyle } from '~/utils/openStreetMapStyle';

setWorkerUrl(mapLibreWorkerUrl);

const { t } = useI18n();
const mapContainer = ref<HTMLDivElement>();
const universityCoordinates: [number, number] = [100.32278, 13.79552];

let map: MapLibreMap | undefined;
let resizeObserver: ResizeObserver | undefined;

onMounted(async () => {
  await nextTick();
  if (!mapContainer.value) return;

  map = new MapLibreMap({
    container: mapContainer.value,
    style: openStreetMapStyle,
    center: universityCoordinates,
    zoom: 14.2,
    attributionControl: false,
    cooperativeGestures: true,
    dragRotate: false,
    pitchWithRotate: false,
    touchPitch: false,
  });

  map.touchZoomRotate.disableRotation();
  map.addControl(new NavigationControl({ showCompass: false, visualizePitch: false }), 'top-right');
  map.addControl(new AttributionControl({ compact: true }), 'bottom-right');

  const markerElement = document.createElement('span');
  markerElement.className = 'restaurant-map-marker';
  markerElement.setAttribute('aria-hidden', 'true');

  new MapLibreMarker({ element: markerElement, anchor: 'bottom' })
    .setLngLat(universityCoordinates)
    .addTo(map);

  resizeObserver = new ResizeObserver(() => map?.resize());
  resizeObserver.observe(mapContainer.value);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  map?.remove();
});
</script>

<template>
  <div
    ref="mapContainer"
    class="restaurant-map"
    :aria-label="t('restaurants.mapLabel')"
  />
</template>

<style scoped>
.restaurant-map {
  position: relative;
  height: 21rem;
  margin-top: 1.25rem;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-soft);
}

:deep(.restaurant-map-marker) {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 3px solid var(--surface);
  border-radius: 50% 50% 50% 0;
  background: var(--page-foreground);
  box-shadow: 0 2px 10px rgb(0 0 0 / 22%);
  transform: rotate(-45deg);
}
</style>
