
import * as CatsActions from './cats.actions';

import { Actions, ofActionDispatched, Select, Store } from "@ngxs/store";
import { CatsState, StoreStateModel } from "./cats.state";
import { map, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { BreedCats, BreedCatsFilterDto, CatsTableListData, PaginatorData } from "@shared/models";

@Injectable()
export class CatsFacade {

  @Select(CatsState.catsList)
  catsList$: Observable<CatsTableListData>;

  @Select(CatsState.breedCats)
  breedCats$: Observable<BreedCats[]>;

  catsListSuccess$ = this.actions.pipe(
    ofActionDispatched(CatsActions.CatsListSuccess),
    // map(({ _ }) => _)
  );

  catsListFailure$ = this.actions.pipe(
    ofActionDispatched(CatsActions.CatsListFailure),
    map(({ error }) => error)
  );

  breedCatsSuccess$ = this.actions.pipe(
    ofActionDispatched(CatsActions.BreedCatsSuccess),
    // map(({ _ }) => _)
  );

  breedCatsFailure$ = this.actions.pipe(
    ofActionDispatched(CatsActions.BreedCatsFailure),
    map(({ error }) => error)
  );


  constructor(private readonly store: Store, private actions: Actions) { }

  catsList(params: PaginatorData): Observable<StoreStateModel> {
    return this.store.dispatch(new CatsActions.CatsList(params));
  }

  catsListByBreed(params: BreedCatsFilterDto): Observable<StoreStateModel> {
    return this.store.dispatch(new CatsActions.CatsListByBreed(params))
  }
}
