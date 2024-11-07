<template>
  <div class="w-full flex flex-col items-center justify-center relative">
    <div id="map" class="w-full h-[500px] relative z-10">
    </div>
    <div class="lg:w-1/2 w-full">
      <h-text-field
      :trailing-icon="PlusIcon"
      v-model="value"
      name="Location"
      @location-add="addLocation"
      placeholder="Location Detail"
      class="text-sm w-full flex mx-auto py-2"
      rules="required"
    />
    </div>
    
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3" v-if="selectedAddress.length > 0">
      <div
        v-for="(location, index) in selectedAddress"
        :key="index"
        class="relative text-xs rounded-md bg-white p-4"
      >
        <p class="pr-7">{{ location.desc }}</p>
        <XCircleIcon class="absolute top-0 right-0 w-6 h-6 stroke-red" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { PlusIcon, XCircleIcon,ArrowsPointingOutIcon,ArrowsPointingInIcon} from "@heroicons/vue/24/outline";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as GeoSearch from "leaflet-geosearch";
import { OpenStreetMapProvider } from "leaflet-geosearch";
const expand = ref(false);
const emit = defineEmits(["locationAdd"]);
const center = ref();
const marker = ref();
const value = ref("");
const selectedAddress = ref([]);
var map = null;
function addLocation() {
  if (value.value) {
    selectedAddress.value.push({ desc: value.value, cords: center.value });
    emit("locationAdd", selectedAddress.value);
    value.value = "";
  }
}
const search = new GeoSearch.GeoSearchControl({
  provider: new GeoSearch.OpenStreetMapProvider(),
  style: "bar",
  autoComplete: true, // optional: true|false  - default true
  autoCompleteDelay: 250, // optional: true|false  - default true
  showPopup: true,
  showMarker: true,
});

onMounted(async () => {
  navigator.geolocation.getCurrentPosition((pos) => {
    center.value = [pos.coords.latitude, pos.coords.longitude];
    getMarker();
  });
});

function getMarker() {
  map = L.map("map").setView(center.value, 8);
  L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  marker.value = L.marker(center.value, {
    draggable: true,
    autoPan: true,
  }).addTo(map);
  map.addControl(search);
  map.on("geosearch/showlocation", getResult);
  marker.value.on("dragend", function (e) {
    center.value = [marker.value.getLatLng().lat, marker.value.getLatLng().lng];
    map.setView(center.value, 8);
  });
}
function getResult(e) {
  console.log(e);
  value.value = e.marker._popup._content;
  map.removeControl(marker.value);
  center.value = [e.marker._latlng.lat, e.marker._latlng.lng];
  marker.value = L.marker(center.value, {
    draggable: true,
    autoPan: true,
  }).addTo(map);
  marker.value.on("dragend", function (e) {
    center.value = [marker.value.getLatLng().lat, marker.value.getLatLng().lng];
    map.setView(center.value, 8);
  });
}
</script>
