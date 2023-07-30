import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CatsState } from './cats/cats.state';
import { CatsApiService } from "@shared/services";
import { CatsFacade } from "./cats/cats.facade";

@NgModule({
  imports: [NgxsModule.forFeature([CatsState])],
  providers: [CatsFacade, CatsApiService]
})
export class CatsStateModule { }
