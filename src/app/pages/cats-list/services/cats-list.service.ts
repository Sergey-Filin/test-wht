import { Injectable } from '@angular/core';
import { CatsApiService } from "../../../shared/services";
import { map, Observable } from "rxjs";
import {
  BreedCats,
  BreedCatsFilterDto,
  BreedCatsI, CatBreeds, CatBreedsI,
  CatImage, CatsTableDto,
  Pagination, PaginatorData,
} from "@shared/models";

@Injectable()
export class CatsListService {

  constructor(private readonly catsApiService: CatsApiService) { }

  getCatsList(params: BreedCatsFilterDto): Observable<CatsTableDto> {
    return params?.name
      ?
      this.getCatByBreed(params)
      :
      this.getCatsDataList(params?.pagination);
  }

  getCatsDataList(params: PaginatorData): Observable<CatsTableDto> {
    return this.catsApiService.getCatsList(params).pipe(
      map((data:BreedCats[]) => {
        const catsList = data.map(element=> {
          const {name, temperament, description, image} = element;
          return new BreedCats(name, temperament, description, image);
        })
        const pagination =  new Pagination(10, 0, 10, 10, 100);
        return new CatsTableDto(catsList, pagination);
      }),
    )
  }

  getCatBreeds(): Observable<CatBreeds[]> {
    return this.catsApiService.getCatBreeds().pipe(
      map((vl: CatBreedsI[]) => {
         return vl.map(vl => {
           const { id, name} =  vl;
           return new CatBreeds(id, name);
         })
      }),
      map((vl: CatBreeds[]) => {
        vl.unshift(new CatBreeds('All', 'All'));
        return vl;
      })
    )
  }

  getCatByBreed(params: BreedCatsFilterDto): Observable<CatsTableDto> {
    return this.catsApiService.getCatByBreed(params).pipe(
      map((data:BreedCatsI[]) => {
        const breedCats = data.map((element: BreedCatsI) => {
          const { breeds, height, url, width} = element;
          const catImage = new CatImage(height, width, url);
          const { name, temperament, description } = breeds[0] as BreedCats;
          return new BreedCats(name, temperament, description, catImage);
        })
        const pagination =  new Pagination(10, 0, 10, 10, 100);
        return new CatsTableDto(breedCats, pagination, true);
      }),
    )};
}
