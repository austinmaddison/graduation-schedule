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

interface Restaurant {
  name: string;
  mapsUrl: string;
  coordinates: readonly [number, number];
}

const { restaurant } = defineProps<{
  restaurant: Restaurant;
}>();

const { t } = useI18n();
const mapContainer = useTemplateRef<HTMLDivElement>('mapContainer');

let map: MapLibreMap | undefined;
let resizeObserver: ResizeObserver | undefined;

onMounted(async () => {
  await nextTick();
  if (!mapContainer.value) return;

  map = new MapLibreMap({
    container: mapContainer.value,
    style: openStreetMapStyle,
    center: [...restaurant.coordinates],
    zoom: 15.5,
    attributionControl: false,
    cooperativeGestures: true,
    dragRotate: false,
    pitchWithRotate: false,
    touchPitch: false,
  });

  map.touchZoomRotate.disableRotation();
  map.addControl(new NavigationControl({ showCompass: false, visualizePitch: false }), 'top-right');
  map.addControl(new AttributionControl({ compact: true }), 'bottom-right');

  const markerElement = document.createElement('a');
  markerElement.className = 'restaurant-map-marker';
  markerElement.href = restaurant.mapsUrl;
  markerElement.target = '_blank';
  markerElement.rel = 'noopener noreferrer';
  markerElement.setAttribute('aria-label', `${restaurant.name}. ${t('restaurants.directions')}`);

  const markerDot = document.createElement('span');
  markerDot.className = 'restaurant-map-marker-dot';
  markerDot.setAttribute('aria-hidden', 'true');
  markerElement.append(markerDot);

  new MapLibreMarker({ element: markerElement, anchor: 'bottom' })
    .setLngLat([...restaurant.coordinates])
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
  background: var(--ui-bg-elevated);
}

:deep(.restaurant-map-marker) {
  display: block;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
}

:deep(.restaurant-map-marker-dot) {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border: 3px solid var(--ui-bg);
  border-radius: 50% 50% 50% 0;
  background: var(--ui-bg-inverted);
  box-shadow: 0 2px 10px rgb(0 0 0 / 22%);
  transform: rotate(-45deg);
  transition: transform 150ms ease;
}

:deep(.restaurant-map-marker:hover .restaurant-map-marker-dot) {
  transform: rotate(-45deg) scale(1.08);
}

:deep(.restaurant-map-marker-dot::after) {
  position: absolute;
  inset: 0.55rem;
  border-radius: 999px;
  background: var(--ui-bg);
  content: '';
}
</style>
