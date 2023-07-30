import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { CatsApiService } from "@shared/services";
import * as CatsActions from './cats.actions';
import { catchError, map } from "rxjs";
import {
  BreedCats, BreedCatsI, CatImage, CatsByBreed, CatsListI, CatsTableList, CatsTableListData, Pagination, PaginatorData
} from "@shared/models";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

export interface StoreStateModel {
  readonly breedCats: BreedCats[] | null;
  readonly catsTableList: CatsTableListData | null;
}

const initialValue: StoreStateModel = {
  breedCats: null,
  catsTableList: null
}

@State<StoreStateModel>({
  name: 'catsState',
  defaults: initialValue,
})
@Injectable()
export class CatsState implements NgxsOnInit  {

  @Selector()
  static catsList(state: StoreStateModel): any {
    return state.catsTableList;
  }

  @Selector()
  static breedCats(state: StoreStateModel): any {
    return state.breedCats;
  }

  constructor(private readonly catsApiService: CatsApiService) {
  }

  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.dispatch(new CatsActions.CatsList(new PaginatorData(10, 0)))
    ctx.dispatch(new CatsActions.BreedCats(new PaginatorData(101, 0)))
  }

  @Action(CatsActions.CatsList)
  catsList(ctx: StateContext<StoreStateModel>, { params }: CatsActions.CatsList) {
    return this.catsApiService.getCatsList(params).pipe(
      map((data:CatsListI[]) => {
        const state = ctx.getState();
        const catsListData = data.map(element=> {
          const {name, temperament, description, image} = element;
          return new CatsTableList(name, temperament, description, image);
        })
        const pagination =  new Pagination(10, 0, 10, 10, 100);
        const catsTableList = new CatsTableListData(catsListData, pagination);
        ctx.setState({
          ...state,
          catsTableList,
        });
        return ctx.dispatch(new CatsActions.CatsListSuccess(true));
      }),
      catchError((error:HttpErrorResponse) => ctx.dispatch(new CatsActions.CatsListFailure(error)))
    );
  }

  @Action(CatsActions.BreedCats)
  breedCats(ctx: StateContext<StoreStateModel>, { params }: CatsActions.BreedCats) {
    return this.catsApiService.getCatsList(params).pipe(
      map((data:CatsListI[]) => {
        const state = ctx.getState();
        const breedCats = data.map(element=> {
          const {name, reference_image_id, id} = element;
          return new BreedCats(reference_image_id, id, name);
        })
        ctx.setState({
          ...state,
          breedCats,
        });
        return ctx.dispatch(new CatsActions.BreedCatsSuccess(true));
      }),
      catchError((error:HttpErrorResponse) => ctx.dispatch(new CatsActions.BreedCatsFailure(error)))
    );
  }

  @Action(CatsActions.CatsListByBreed)
  catsListByBreed(ctx: StateContext<StoreStateModel>, { params }: CatsActions.CatsListByBreed) {
    return this.catsApiService.getCatByBreed(params).pipe(
      map((data:BreedCatsI[]) => {
        const state = ctx.getState();
        const catsListData = data.map((element: BreedCatsI) => {
          const { breeds, height, url, width} = element;
          const catImage = new CatImage(height, width, url);
          const { name, temperament, description } = breeds[0] as CatsByBreed;
          return new CatsTableList(name, temperament, description, catImage);
        })
        const pagination =  new Pagination(10, 0, 10, 10, 100);
        const catsTableList =  new CatsTableListData(catsListData, pagination, true);
          ctx.setState({
            ...state,
            catsTableList,
          });
          return ctx.dispatch(new CatsActions.CatsListByBreedSuccess(true));
      }),
      catchError((error:HttpErrorResponse) => ctx.dispatch(new CatsActions.CatsListByBreedFailure(error)))
    );
  }

}
