import { ProvincesComponent } from "./pages/provinces/provinces.component";
import { MapComponent } from "./pages/map/map.component";
import { LoginComponent } from "./pages/login/login.component";

export const routes = [
  {path: "", component: LoginComponent},
  { path: "provinces", component: ProvincesComponent },
  { path: "map", component: MapComponent }
];

export const navigatableComponents = [
  ProvincesComponent,
  MapComponent,
  LoginComponent
];