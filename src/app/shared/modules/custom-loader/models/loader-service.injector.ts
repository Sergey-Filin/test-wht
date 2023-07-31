import {Injector, isDevMode} from '@angular/core';

import {LoaderService} from '../service/loader.service';

export let LoaderServiceInjector: Injector;

export function setLoaderServiceInjector(injector: Injector): void {
  if (LoaderServiceInjector) {
    console.error('Programming error: AppInjector was already set');
  } else {
    LoaderServiceInjector = injector;
  }
}

export const getLoaderServiceInjector = (): LoaderService | null => {
  try {
    return LoaderServiceInjector && LoaderServiceInjector.get(LoaderService)
  } catch (e) {
    if (isDevMode()) {
      console.error(e);
    }
    return null;
  }
};
