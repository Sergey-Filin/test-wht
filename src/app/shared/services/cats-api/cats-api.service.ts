import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BreedCats, BreedCatsFilterDto, BreedCatsI, CatBreedsI, CatsListI, PaginatorData } from "@shared/models";
import { loader } from "@shared/modules/custom-loader/models/decorators";


export interface CatsApiServiceI {
  getCatsList(params: PaginatorData): Observable<CatsListI[]>,

  getCatBreeds(): Observable<CatBreedsI[]>,

  getCatByBreed(params: BreedCatsFilterDto): Observable<BreedCatsI[]>,
}

@Injectable()
export class CatsApiService implements CatsApiServiceI {

  private readonly apiUrl = 'api/';

  constructor(private readonly http: HttpClient) {
  }

  @loader()
  getCatsList(params: PaginatorData): Observable<CatsListI[]> {
    return this.http.get<CatsListI[]>(`${this.apiUrl}breeds?limit=${params?.limit}&page=${params?.page}`);
  }

  @loader()
  getCatBreeds(): Observable<CatBreedsI[]> {
    return this.http.get<CatBreedsI[]>(`${this.apiUrl}breeds?limit=100`);
  }

  @loader()
  getCatByBreed(params: BreedCatsFilterDto): Observable<BreedCatsI[]> {
    const { breed, pagination} = params;
    const { limit, page} = pagination;
    return this.http.get<BreedCatsI[]>(`${this.apiUrl}images/search?breed_ids=${breed}&limit=${limit}&page=${page}`);
  }
}
