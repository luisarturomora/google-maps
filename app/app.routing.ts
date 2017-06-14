import { ProvincesComponent } from "./pages/provinces/provinces.component";
import { MapComponent } from "./pages/map/map.component";

export const routes = [
  { path: "", component: ProvincesComponent },
  { path: "map", component: MapComponent }
];

export const navigatableComponents = [
  ProvincesComponent,
  MapComponent
];