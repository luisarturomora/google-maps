import { Router, CanActivate } from '@angular/router';

import { ProvincesComponent } from "./pages/provinces/provinces.component";
import { MapComponent } from "./pages/map/map.component";
import { LoginComponent } from "./pages/login/login.component";
import { ProfileComponent } from './pages/profile/profile.component';

import { AuthGuard } from './authguard.service';

export const routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent},
  { path: "provinces", component: ProvincesComponent, canActivate: [AuthGuard] },
  { path: "map", component: MapComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] }
];

export const authProviders = [
  AuthGuard
]

export const navigatableComponents = [
  ProvincesComponent,
  MapComponent,
  LoginComponent,
  ProfileComponent
];