import {CommonModule} from '@angular/common';
import {Injector, NgModule, Optional, SkipSelf} from '@angular/core';
import {
  LoaderServiceInjector,
  setLoaderServiceInjector,
} from '@shared/modules/custom-loader/models/loader-service.injector';
import {LoaderComponent} from './components/loader/loader.component';
import {LoaderService} from './service/loader.service';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
  ],
  exports: [LoaderComponent],
})
export class CustomLoaderModule {

  constructor(
    private readonly injector: Injector,
    @Optional() @SkipSelf() private parentModule: CustomLoaderModule,
  ) {
    this.setLoaderInjector();
  }

  private setLoaderInjector(): void {
    if (!this.parentModule && !LoaderServiceInjector) {
      setLoaderServiceInjector(this.injector);
    }
  }
}
