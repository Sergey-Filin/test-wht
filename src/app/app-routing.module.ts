import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cats-list',
    loadChildren: () => import('./pages/cats-list/cats-list.module').then(m => m.CatsListModule),
  },
  {
    path: 'cats-list-ngxs',
    loadChildren: () => import('./pages/cats-list-ngxs/cats-list-ngxs.module').then(m => m.CatsListNgxsModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cats-list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
