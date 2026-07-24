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
const mapContainer = ref<HTMLDivElement>();
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
  markerElement.className = 'university-map-marker';
  markerElement.setAttribute('aria-hidden', 'true');

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
  <article class="university-location-card">
    <div class="university-location-copy">
      <p class="university-location-label">{{ t('universityLocation.label') }}</p>
      <h2>{{ t('venue') }}</h2>
      <a
        class="university-directions"
        href="https://www.google.com/maps/search/?api=1&query=Prince%20Mahidol%20Hall%2C%20Mahidol%20University"
        target="_blank"
        rel="noopener noreferrer"
      >
        <UIcon
          name="logos:google-maps"
          mode="svg"
          class="maps-logo"
          aria-hidden="true"
        />
        {{ t('openInGoogleMaps') }}
      </a>
    </div>
    <img
      class="university-photo"
      :src="assetUrl('images/university/prince-mahidol-hall.png')"
      :alt="t('universityLocation.photoAlt')"
    />
    <div
      ref="mapContainer"
      class="university-map"
      :aria-label="t('universityLocation.mapLabel')"
    />
  </article>
</template>
