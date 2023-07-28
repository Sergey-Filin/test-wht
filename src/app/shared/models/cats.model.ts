export class BreedCats {
  constructor(
    public readonly name: string,
    public readonly temperament: string,
    public readonly description: string,
    public readonly image: CatImage,
  ) {
  }
}

export class CatImage {
  constructor(
    public readonly height: number,
    public readonly width: number,
    public readonly url: string,
  ) {
  }
}

export interface BreedCatsI {
    readonly breeds: BreedCats[];
    readonly height: number;
    readonly url: string;
    readonly width: number;
}

export class CatsTableDto {
  constructor(
    public readonly items: BreedCats[],
    public readonly pagination: Pagination,
    public readonly disabledPagination?: boolean,
  ) {
  }
}

export class Pagination {
  constructor(
    public readonly count: number,
    public readonly page: number,
    public readonly pages: number,
    public readonly per_page: number,
    public readonly total: number,
  ) {
  }
}

export class PaginatorData {
  constructor(
    public readonly limit: number,
    public readonly page: number,
  ) {
  }
}

export class BreedCatsFilterDto {
  constructor(
    public readonly name: string,
    public readonly pagination: PaginatorData,
  ) {
  }
}

export interface CatBreedsI {
  readonly id: string,
  readonly name: string,
}


export class CatBreeds {
  constructor(
    public readonly name: string,
    public readonly title: string,
  ) {
  }
}

