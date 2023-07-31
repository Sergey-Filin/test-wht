export interface CatsListI {
  readonly name: string;
  readonly temperament: string;
  readonly description: string;
  readonly image: CatImage;
  readonly reference_image_id: string;
  readonly id: string;
}

export class BreedCats {
  constructor(
    public readonly id: string,
    public readonly breedId: string,
    public readonly breed: string,
  ) {
  }
}

export class CatsTableList {
  constructor(
    public readonly name: string,
    public readonly temperament: string,
    public readonly description: string,
    public readonly image: CatImage,
  ) {
  }
}

export class CatsTableListData {
  constructor(
    public readonly catsList: CatsTableList[],
    public readonly pagination: Pagination,
  ) {
  }
}

export class CatsData {
  constructor(
    public readonly breedCats: BreedCats[],
    public readonly catsTableList: CatsTableList[],
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

export class CatsByBreed {
  constructor(
    public readonly name: string,
    public readonly temperament: string,
    public readonly description: string,
  ) {
  }
}

export interface BreedCatsI {
    readonly breeds: CatsByBreed[];
    readonly height: number;
    readonly url: string;
    readonly width: number;
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
    public readonly breed: string,
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

