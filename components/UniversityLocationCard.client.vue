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
const assetUrl = (path: string) =>
  `${useRuntimeConfig().app.baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
const mapContainer = useTemplateRef<HTMLDivElement>('mapContainer');
const venueCoordinates: [number, number] = [100.32278, 13.79552];

let map: MapLibreMap | undefined;
let resizeObserver: ResizeObserver | undefined;

onMounted(async () => {
  await nextTick();

  if (!mapContainer.value) return;

  map = new MapLibreMap({
    container: mapContainer.value,
    style: openStreetMapStyle,
    center: venueCoordinates,
    zoom: 15.2,
    attributionControl: false,
    cooperativeGestures: true,
    dragRotate: false,
    pitchWithRotate: false,
    touchPitch: false,
  });

  map.touchZoomRotate.disableRotation();
  map.addControl(
    new NavigationControl({ showCompass: false, visualizePitch: false }),
    'top-right',
  );
  map.addControl(new AttributionControl({ compact: true }), 'bottom-right');

  const markerElement = document.createElement('span');
  markerElement.className = 'university-map-marker grid size-8 place-items-center rounded-full border-2 border-default bg-inverted text-inverted shadow-lg';
  markerElement.setAttribute('aria-hidden', 'true');
  markerElement.textContent = '•';

  new MapLibreMarker({ element: markerElement, anchor: 'bottom' })
    .setLngLat(venueCoordinates)
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
  <UCard
    variant="subtle"
    class="mx-auto w-full max-w-6xl"
    :ui="{ body: 'p-0 sm:p-0' }"
  >
    <div class="university-location-layout">
      <div class="flex flex-col items-start justify-center gap-6 p-6 sm:p-7">
        <h2 id="university-location-heading" class="text-balance text-xl font-medium text-highlighted sm:text-2xl">
          {{ t('venue') }}
        </h2>
        <p class="text-sm leading-6 text-muted">
          {{ t('universityLocation.address') }}
        </p>

        <UButton
          to="https://www.google.com/maps/search/?api=1&query=Prince%20Mahidol%20Hall%2C%20Mahidol%20University"
          external
          target="_blank"
          rel="noopener noreferrer"
          color="neutral"
          variant="outline"
          icon="logos:google-maps"
          :label="t('openInGoogleMaps')"
        />
      </div>

      <img
        class="university-location-image"
        :src="assetUrl('images/university/prince-mahidol-hall.png')"
        :alt="t('universityLocation.photoAlt')"
      >
      <div
        ref="mapContainer"
        class="university-map"
        :aria-label="t('universityLocation.mapLabel')"
      />
    </div>
  </UCard>
</template>

<style scoped>
.university-location-layout {
  display: grid;
  grid-template-columns: minmax(15rem, 0.9fr) repeat(2, minmax(0, 1fr));
  min-height: 16rem;
}

.university-location-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.university-map {
  min-height: 16rem;
}

:deep(.university-map-marker) {
  font: 700 1.25rem/1 sans-serif;
}

:deep(.maplibregl-ctrl-group) {
  overflow: hidden;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: none;
}

@media (width < 56rem) {
  .university-location-layout {
    grid-template-columns: 1fr;
  }

  .university-location-image,
  .university-map {
    min-height: 14rem;
  }
}
</style>
