<script setup lang="ts">
import {
  AttributionControl,
  LngLatBounds,
  Map as MapLibreMap,
  Marker as MapLibreMarker,
  NavigationControl,
  Popup as MapLibrePopup,
  setWorkerUrl,
} from 'maplibre-gl';
import mapLibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import { openStreetMapStyle } from '~/utils/openStreetMapStyle';

setWorkerUrl(mapLibreWorkerUrl);

interface Hotel {
  id: string;
  name: string;
  mapsUrl: string;
  coordinates: readonly [number, number];
  image: string;
}

const props = defineProps<{
  hotels: readonly Hotel[];
}>();

const { t } = useI18n();
const mapContainer = ref<HTMLDivElement>();
const query = ref('');
const selectedId = ref('');
const googleMapsIconBody = `<path fill="#34a853" d="M70.585 271.865a371 371 0 0 1 28.911 42.642c7.374 13.982 10.448 23.463 15.837 40.31c3.305 9.308 6.292 12.086 12.714 12.086c6.998 0 10.173-4.726 12.626-12.035c5.094-15.91 9.091-28.052 15.397-39.525c12.374-22.15 27.75-41.833 42.858-60.75c4.09-5.354 30.534-36.545 42.439-61.156c0 0 14.632-27.035 14.632-64.792c0-35.318-14.43-59.813-14.43-59.813l-41.545 11.126l-25.23 66.451l-6.242 9.163l-1.248 1.66l-1.66 2.078l-2.914 3.319l-4.164 4.163l-22.467 18.304l-56.17 32.432z"/><path fill="#fbbc04" d="M12.612 188.892c13.709 31.313 40.145 58.839 58.031 82.995l95.001-112.534s-13.384 17.504-37.662 17.504c-27.043 0-48.89-21.595-48.89-48.825c0-18.673 11.234-31.501 11.234-31.501l-64.489 17.28z"/><path fill="#4285f4" d="M166.705 5.787c31.552 10.173 58.558 31.53 74.893 63.023l-75.925 90.478s11.234-13.06 11.234-31.617c0-27.864-23.463-48.68-48.81-48.68c-23.969 0-37.735 17.475-37.735 17.475v-57z"/><path fill="#1a73e8" d="M30.015 45.765C48.86 23.218 82.02 0 127.736 0c22.18 0 38.89 5.823 38.89 5.823L90.29 96.516H36.205z"/><path fill="#ea4335" d="M12.612 188.892S0 164.194 0 128.414c0-33.817 13.146-63.377 30.015-82.649l60.318 50.759z"/>`;

const filteredHotels = computed(() => {
  const normalizedQuery = query.value.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return props.hotels;
  }

  return props.hotels.filter((hotel) =>
    hotel.name.toLocaleLowerCase().includes(normalizedQuery),
  );
});

let map: MapLibreMap | undefined;
let activePopup: MapLibrePopup | undefined;
let resizeObserver: ResizeObserver | undefined;
const markers = new Map<string, MapLibreMarker>();

const updateMarkerSelection = () => {
  markers.forEach((marker, hotelId) => {
    marker
      .getElement()
      .classList.toggle('is-selected', hotelId === selectedId.value);
  });
};

const buildPopupContent = (hotel: Hotel) => {
  const content = document.createElement('div');
  content.className = 'hotel-popup';

  const name = document.createElement('strong');
  name.textContent = hotel.name;

  const image = document.createElement('img');
  image.src = hotel.image;
  image.alt = hotel.name;
  image.className = 'hotel-popup-image';

  const location = document.createElement('span');
  location.textContent = t('stays.nearCampus');

  const link = document.createElement('a');
  link.className = 'hotel-popup-directions';
  link.href = hotel.mapsUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  const mapIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  mapIcon.classList.add('hotel-popup-maps-logo');
  mapIcon.setAttribute('viewBox', '0 0 256 367');
  mapIcon.setAttribute('aria-hidden', 'true');
  mapIcon.innerHTML = googleMapsIconBody;
  link.append(mapIcon, document.createTextNode(t('stays.directions')));

  content.append(image, name, location, link);
  return content;
};

const selectHotel = (hotel: Hotel) => {
  selectedId.value = hotel.id;
  updateMarkerSelection();

  if (!map) {
    return;
  }

  activePopup?.remove();

  activePopup = new MapLibrePopup({
    anchor: 'bottom',
    closeButton: false,
    closeOnClick: true,
    offset: 18,
    maxWidth: '15rem',
  })
    .setLngLat([...hotel.coordinates])
    .setDOMContent(buildPopupContent(hotel))
    .addTo(map);

  map.flyTo({
    center: [...hotel.coordinates],
    zoom: 16,
    offset: [
      0,
      mapContainer.value?.clientWidth && mapContainer.value.clientWidth < 480
        ? 72
        : 48,
    ],
    duration: 850,
    essential: false,
  });
};

const selectFirstResult = () => {
  const firstHotel = filteredHotels.value[0];
  if (firstHotel) {
    selectHotel(firstHotel);
  }
};

const getHotelNumber = (hotelId: string) =>
  props.hotels.findIndex((hotel) => hotel.id === hotelId) + 1;

const clearSearch = () => {
  query.value = '';
};

const showAllHotels = (animated = true) => {
  if (!map || props.hotels.length === 0) {
    return;
  }

  selectedId.value = '';
  activePopup?.remove();
  updateMarkerSelection();

  const bounds = new LngLatBounds();
  props.hotels.forEach((hotel) => bounds.extend([...hotel.coordinates]));

  map.fitBounds(bounds, {
    padding: 64,
    maxZoom: 14.5,
    duration: animated ? 700 : 0,
  });
};

onMounted(async () => {
  await nextTick();

  if (!mapContainer.value) {
    return;
  }

  map = new MapLibreMap({
    container: mapContainer.value,
    style: openStreetMapStyle,
    center: [100.3205, 13.7988],
    zoom: 14,
    attributionControl: false,
    cooperativeGestures: true,
    dragRotate: false,
    pitchWithRotate: false,
    touchPitch: false,
  });

  map.touchZoomRotate.disableRotation();
  map.addControl(
    new NavigationControl({
      showCompass: false,
      visualizePitch: false,
    }),
    'top-right',
  );
  map.addControl(
    new AttributionControl({ compact: true }),
    'bottom-right',
  );

  props.hotels.forEach((hotel, index) => {
    const markerElement = document.createElement('button');
    markerElement.type = 'button';
    markerElement.className = 'hotel-map-marker';
    markerElement.setAttribute(
      'aria-label',
      `${hotel.name}. ${t('stays.selectHotel')}`,
    );

    // MapLibre updates this element's transform on every map movement. Keep
    // visual transitions on a child so marker coordinates remain in sync.
    const markerDot = document.createElement('span');
    markerDot.className = 'hotel-map-marker-dot';
    markerDot.textContent = String(index + 1);
    markerDot.setAttribute('aria-hidden', 'true');
    markerElement.append(markerDot);

    markerElement.addEventListener('click', () => selectHotel(hotel));

    const marker = new MapLibreMarker({
      element: markerElement,
      anchor: 'center',
    })
      .setLngLat([...hotel.coordinates])
      .addTo(map!);

    markers.set(hotel.id, marker);
  });

  map.once('load', () => showAllHotels(false));

  resizeObserver = new ResizeObserver(() => map?.resize());
  resizeObserver.observe(mapContainer.value);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  activePopup?.remove();
  markers.clear();
  map?.remove();
});
</script>

<template>
  <div class="hotel-map-shell">
    <div class="hotel-map-toolbar">
      <div class="hotel-search">
        <span class="pi pi-search" aria-hidden="true" />
        <InputText
          v-model="query"
          :placeholder="t('stays.searchPlaceholder')"
          :aria-label="t('stays.searchLabel')"
          @keydown.enter="selectFirstResult"
        />
        <Button
          v-if="query"
          text
          rounded
          severity="secondary"
          icon="pi pi-times"
          :aria-label="t('stays.clearSearch')"
          @click="clearSearch"
        />
      </div>

      <Button
        outlined
        severity="secondary"
        size="small"
        icon="pi pi-expand"
        :label="t('stays.showAll')"
        @click="showAllHotels()"
      />
    </div>

    <div class="hotel-map-layout">
      <div
        ref="mapContainer"
        class="hotel-map-canvas"
        :aria-label="t('stays.mapTitle')"
      />

      <div
        class="hotel-results"
        role="listbox"
        :aria-label="t('stays.resultsLabel')"
      >
        <article
          v-for="hotel in filteredHotels"
          :key="hotel.id"
          class="hotel-result"
          :class="{ 'is-selected': selectedId === hotel.id }"
        >
          <button
            type="button"
            class="hotel-select"
            role="option"
            :aria-selected="selectedId === hotel.id"
            @click="selectHotel(hotel)"
          >
            <span class="hotel-list-number" aria-hidden="true">
              {{ getHotelNumber(hotel.id) }}
            </span>
            <span class="hotel-photo-wrap">
              <img
                :src="hotel.image"
                :alt="hotel.name"
                class="hotel-photo"
                loading="lazy"
              >
            </span>
            <span class="hotel-copy">
              <strong>{{ hotel.name }}</strong>
              <span>{{ t('stays.nearCampus') }}</span>
            </span>
          </button>

          <a
            :href="hotel.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hotel-directions"
            :aria-label="`${t('stays.directions')}: ${hotel.name}`"
            :title="`${t('stays.directions')}: ${hotel.name}`"
          >
            <UIcon
              name="logos:google-maps"
              mode="svg"
              class="hotel-maps-logo"
              aria-hidden="true"
            />
          </a>
        </article>

        <p v-if="filteredHotels.length === 0" class="hotel-empty">
          {{ t('stays.noResults') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hotel-map-shell {
  padding-top: 1.25rem;
}

.hotel-map-toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
}

.hotel-search {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
}

.hotel-search > .pi-search {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 0.85rem;
  color: var(--muted);
  font-size: 0.85rem;
  pointer-events: none;
  transform: translateY(-50%);
}

.hotel-search :deep(.p-inputtext) {
  width: 100%;
  padding-left: 2.35rem;
  padding-right: 2.65rem;
  border-color: var(--border);
  border-radius: 8px;
  background: var(--surface-soft);
}

.hotel-search :deep(.p-button) {
  position: absolute;
  top: 50%;
  right: 0.25rem;
  width: 2.25rem;
  height: 2.25rem;
  transform: translateY(-50%);
}

.hotel-map-layout {
  display: grid;
  gap: 1rem;
}

.hotel-map-canvas {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: clamp(21rem, 52vw, 28rem);
  min-height: 21rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-soft);
}

.hotel-results {
  display: grid;
  align-content: start;
}

.hotel-result {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
  border-bottom: 1px solid var(--border);
}

.hotel-result:last-child {
  border-bottom: 0;
}

.hotel-result.is-selected {
  background: var(--surface-soft);
}

.hotel-select {
  display: grid;
  grid-template-columns: 1.75rem 4.5rem minmax(0, 1fr);
  align-items: center;
  gap: 0.8rem;
  min-width: 0;
  border: 0;
  background: transparent;
  color: inherit;
  padding: 1rem 0.75rem 1rem 0;
  text-align: left;
  cursor: pointer;
}

.hotel-select:focus-visible,
.hotel-directions:focus-visible {
  outline: 2px solid var(--page-foreground);
  outline-offset: -2px;
}

.hotel-photo-wrap {
  position: relative;
  display: block;
  width: 4.5rem;
  height: 3.4rem;
}

.hotel-photo {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: var(--surface-soft);
  object-fit: cover;
}

.hotel-list-number {
  display: grid;
  width: 1.6rem;
  height: 1.6rem;
  place-items: center;
  border: 2px solid var(--surface);
  border-radius: 50%;
  background: var(--page-foreground);
  box-shadow: 0 1px 4px rgb(0 0 0 / 16%);
  color: var(--surface);
  font-size: 0.65rem;
  font-weight: 750;
}

.hotel-result.is-selected .hotel-list-number {
  background: #52525b;
}

.hotel-copy {
  display: grid;
  min-width: 0;
  gap: 0.2rem;
}

.hotel-copy strong {
  overflow: hidden;
  font-size: 0.88rem;
  font-weight: 680;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hotel-copy span {
  color: var(--muted);
  font-size: 0.78rem;
}

.hotel-directions {
  display: grid;
  width: 2.75rem;
  place-items: center;
  color: var(--muted-strong);
  text-decoration: none;
}

.hotel-directions:hover {
  background: var(--surface-soft);
  color: var(--page-foreground);
}

.hotel-maps-logo {
  width: 1.15rem;
  height: 1.15rem;
}

.hotel-empty {
  margin: 0;
  padding: 2rem 1rem;
  color: var(--muted);
  font-size: 0.85rem;
  text-align: center;
}

:deep(.hotel-map-marker) {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

:deep(.hotel-map-marker-dot) {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  border: 3px solid var(--surface);
  border-radius: 50%;
  background: var(--page-foreground);
  box-shadow: 0 3px 12px rgb(0 0 0 / 20%);
  color: var(--surface);
  font: 700 0.72rem/1 -apple-system, BlinkMacSystemFont, sans-serif;
  transition:
    transform 160ms ease,
    background-color 160ms ease;
}

:deep(.hotel-map-marker:hover .hotel-map-marker-dot),
:deep(.hotel-map-marker.is-selected .hotel-map-marker-dot) {
  background: #52525b;
  transform: scale(1.14);
}

:deep(.hotel-map-marker:focus-visible) {
  outline: 2px solid var(--page-foreground);
  outline-offset: 2px;
}

:deep(.maplibregl-popup-content) {
  padding: 0.8rem 0.9rem;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 14%);
}

:deep(.hotel-popup) {
  display: grid;
  gap: 0.25rem;
  font-family: inherit;
}

:deep(.hotel-popup-image) {
  display: block;
  width: calc(100% + 1.8rem);
  height: 6rem;
  margin: -0.8rem -0.9rem 0.5rem;
  border-radius: 8px 8px 0 0;
  object-fit: cover;
}

:deep(.hotel-popup strong) {
  color: var(--page-foreground);
  font-size: 0.82rem;
}

:deep(.hotel-popup span) {
  color: var(--muted);
  font-size: 0.74rem;
}

:deep(.hotel-popup-directions) {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.3rem;
  color: var(--page-foreground);
  font-size: 0.76rem;
  font-weight: 650;
  text-underline-offset: 0.2rem;
}

:deep(.hotel-popup-maps-logo) {
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
}

:deep(.maplibregl-ctrl-group) {
  overflow: hidden;
  border: 1px solid rgb(0 0 0 / 8%);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

@media (min-width: 800px) {
  .hotel-map-layout {
    grid-template-columns: minmax(0, 2fr) minmax(15rem, 0.9fr);
    gap: 1.5rem;
  }

  .hotel-results {
    max-height: clamp(21rem, 52vw, 28rem);
    overflow-y: auto;
    border-top: 1px solid var(--border);
    scrollbar-gutter: stable;
  }
}

@media (max-width: 479px) {
  .hotel-map-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .hotel-map-toolbar > :deep(.p-button) {
    justify-content: center;
    width: 100%;
  }

  .hotel-map-canvas {
    height: 21rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  :deep(.hotel-map-marker-dot) {
    transition: none;
  }
}
</style>
