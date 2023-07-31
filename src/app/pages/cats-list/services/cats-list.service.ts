import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from "rxjs";
import {
  BreedCats,
  BreedCatsFilterDto, BreedCatsI, CatBreeds, CatBreedsI,
  CatImage, CatsByBreed, CatsListI, CatsTableList, CatsTableListData, Pagination, PaginatorData,
} from "@shared/models";
import { CatsApiService } from "@shared/services";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CatsListService {

  constructor(private readonly catsApiService: CatsApiService) { }

  getCatsList(params: BreedCatsFilterDto): Observable<CatsTableListData> {
    return params?.breed
      ?
      this.getCatByBreed(params)
      :
      this.getCatsDataList(params?.pagination);
  }

  getCatsDataList(params: PaginatorData): Observable<CatsTableListData> {
    return this.catsApiService.getCatsList(params).pipe(
      map((data:CatsListI[]) => {
        const catsListData:CatsTableList[] = [];
        data.forEach(element=> {
          const {name, temperament, description, image, reference_image_id, id} = element;
          catsListData.push(new CatsTableList(name, temperament, description, image));
        })
        const pagination = new Pagination(10, 0, 0, 10, 66);
        return new CatsTableListData(catsListData, pagination);
      }),
      catchError((error: HttpErrorResponse) => EMPTY)
    )
  }

  getCatBreeds(): Observable<BreedCats[]> {
    return this.catsApiService.getCatBreeds().pipe(
      map((vl: CatsListI[]) => {
         return vl.map(vl => {
           const {name, reference_image_id, id} = vl;
           return new BreedCats(reference_image_id, id, name);
         })
      }),
      catchError((error: HttpErrorResponse) => EMPTY)
    )
  }

  getCatByBreed(params: BreedCatsFilterDto): Observable<CatsTableListData> {
    return this.catsApiService.getCatByBreed(params).pipe(
      map((data:BreedCatsI[]) => {
        const breedCats = data.map((element: BreedCatsI) => {
          const { breeds, height, url, width} = element;
          const catImage = new CatImage(height, width, url);
          const { name, temperament, description } = breeds[0] as CatsByBreed;
          return new CatsTableList(name, temperament, description, catImage);
        })
        const pagination =  new Pagination(10, 0, 10, 10, breedCats?.length);
        return new CatsTableListData(breedCats, pagination);
      }),
      catchError((error: HttpErrorResponse) => EMPTY)
    )};
}
