import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatsListNgxsComponent } from "./components/cats-list-ngxs/cats-list-ngxs.component";

const routes: Routes = [
  {
    path: '',
    component: CatsListNgxsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatsListNgxsRoutingModule { }
