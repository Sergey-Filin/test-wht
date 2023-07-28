import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BreedCats, BreedCatsFilterDto, BreedCatsI, CatBreedsI, PaginatorData } from "@shared/models";


export interface CatsApiServiceI {
  getCatsList(params: PaginatorData): Observable<BreedCats[]>,

  getCatBreeds(): Observable<CatBreedsI[]>,

  getCatByBreed(params: BreedCatsFilterDto): Observable<BreedCatsI[]>,
}

@Injectable()
export class CatsApiService implements CatsApiServiceI {

  private readonly apiUrl = 'api/';

  constructor(private readonly http: HttpClient) {
  }

  getCatsList(params: PaginatorData): Observable<BreedCats[]> {
    return this.http.get<BreedCats[]>(`${this.apiUrl}breeds?limit=${params?.limit}&page=${params?.page}`);
  }

  getCatBreeds(): Observable<CatBreedsI[]> {
    return this.http.get<CatBreedsI[]>(`${this.apiUrl}breeds?limit=100`);
  }

  getCatByBreed(params: BreedCatsFilterDto): Observable<BreedCatsI[]> {
    const { name, pagination} = params;
    const { limit, page} = pagination;
    return this.http.get<BreedCatsI[]>(`${this.apiUrl}images/search?breed_ids=${name}&limit=${limit}&page=${page}`);
  }
}
