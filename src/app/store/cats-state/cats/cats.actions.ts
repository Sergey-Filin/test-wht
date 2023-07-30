import { HttpErrorResponse } from "@angular/common/http";
import { BreedCatsFilterDto, CatsListI, PaginatorData } from "@shared/models";

export class CatsList {
  static readonly type = 'Cats List';

  constructor(public readonly params: PaginatorData) {}
}

export class CatsListSuccess {
  static readonly type = 'Cats List Success';

  constructor(public readonly success: boolean) {}
}

export class CatsListFailure {
  static readonly type = 'Cats List Failure';

  constructor(public readonly error: HttpErrorResponse) {}
}

export class BreedCats {
  static readonly type = 'Breed Cats';

  constructor(public readonly params: PaginatorData) {}
}

export class BreedCatsSuccess {
  static readonly type = 'Breed Cats Success';

  constructor(public readonly success: boolean) {}
}

export class BreedCatsFailure {
  static readonly type = 'Breed Cats Failure';

  constructor(public readonly error: HttpErrorResponse) {}
}

export class CatsListByBreed {
  static readonly type = 'Cats List By Breed';

  constructor(public readonly params: BreedCatsFilterDto) {}
}

export class CatsListByBreedSuccess {
  static readonly type = 'Cats List By Breed Success';

  constructor(public readonly success: boolean) {}
}

export class CatsListByBreedFailure {
  static readonly type = 'Cats List By Breed Failure';

  constructor(public readonly error: HttpErrorResponse) {}
}
