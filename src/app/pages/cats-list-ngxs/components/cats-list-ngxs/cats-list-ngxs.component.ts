import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { map, Observable, of, switchMap, takeUntil } from "rxjs";
import { BreedCats, BreedCatsFilterDto, CatsTableListData, PaginatorData } from "@shared/models";
import { CatsFacade } from "../../../../store/cats-state/cats/cats.facade";
import { DestroySubscription } from "@helpers/classes";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-cats-list-ngxs',
  templateUrl: './cats-list-ngxs.component.html',
  styleUrls: ['./cats-list-ngxs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatsListNgxsComponent extends DestroySubscription implements OnInit {

  public catsTableDataSource$: Observable<CatsTableListData>;
  public breedCats$: Observable<BreedCats[]>;

  form: UntypedFormGroup;
  public pageSizeOptions = [10, 25, 50, 100];

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly catsFacade: CatsFacade,
  ) {
    super();
    this.initForm();
  }

  ngOnInit(): void {
    this.catsTableDataSource$ = this.catsFacade.catsList$;
    this.breedCats$ = this.catsFacade.breedCats$;
    this.formValueChanges();
  }

  trackByFn(index: number, item: BreedCats) {
    return item.id;
  }

  public setTablePage(page: PageEvent): void {
    this.catsFacade.catsList(new PaginatorData(page?.pageSize, page?.pageIndex));
  }

  private formValueChanges(): void {
    this.form.valueChanges.pipe(
      switchMap(({breed}) => {
        const breedData = breed === 'All' ? '' : breed;
        const pagination = new PaginatorData(25, 0);
        if(breedData) {
          return this.catsFacade.catsListByBreed(new BreedCatsFilterDto(breedData, pagination));
        } else {
          const pagination = new PaginatorData(10, 0);
          return this.catsFacade.catsList(pagination);
        }
      }),
      takeUntil(this.destroyStream$)
    ).subscribe();
  }

  private initForm(): void {
    const fb = this.fb;
    this.form = fb.group({
      breed: fb.control('All',),
    });
  }
}
