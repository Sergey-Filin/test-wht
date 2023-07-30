import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { CatsListService } from "../../services/cats-list.service";
import { DestroySubscription } from "@helpers/classes";
import { BreedCats, BreedCatsFilterDto, CatsTableListData, PaginatorData } from "@shared/models";
import {
  combineLatest,
  map,
  merge,
  Observable,
  share, shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { SearchQueryParams } from "../models";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatsListComponent extends DestroySubscription implements OnInit, AfterViewInit {

  form: UntypedFormGroup;

  private readonly pagination$ = new Subject<PaginatorData>();
  private readonly updateList$ = new Subject<void>();

  public pageSizeOptions = [10, 25, 50, 100];
  public catsTableDataSource$: Observable<CatsTableListData>;
  public catBreeds$: Observable<BreedCats[]>;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly catsListService: CatsListService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    super();
    this.initForm();
  }

  ngOnInit(): void {
    this.loadCatBreeds();
    this.updateForm();
    this.subscribeQueryChange();
  }

  ngAfterViewInit(): void {
    this.subscribeParamsChange();
  }

  private subscribeParamsChange() {
    merge(this.pagination$.asObservable(), this.formValueChanges()).pipe(
      takeUntil(this.destroyStream$)
    ).subscribe(params => {
      this.router.navigate(['./'], {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: 'merge',
      })
    });
  }

  trackByFn(index: number, item: BreedCats) {
    return item.id;
  }

  public setTablePage(page: PageEvent): void {
    this.pagination$.next(new PaginatorData(page?.pageSize, page?.pageIndex));
  }

  public loadCatBreeds(): void {
    this.catBreeds$ = this.catsListService.getCatBreeds();
  }

  private formValueChanges(): Observable<any> {
    return this.form.valueChanges.pipe(
      map(({breed}) => ({
        breed: breed === 'All' ? '' : breed,
      })),
    );
  }

  private subscribeQueryChange(): void {
    this.catsTableDataSource$ = combineLatest([
      this.route.queryParams,
      this.updateList$.pipe(startWith({})),
    ]).pipe(
      map(([params, update]: [SearchQueryParams, void]) => {
        const breed = params?.breed;
        const page = breed ? 0 : +params?.page || 0;
        const limit = breed ? 29 : +params?.limit || 10;
        const paginator = new PaginatorData(limit, page);
        return new BreedCatsFilterDto(breed, paginator);
      }),
      switchMap((params: BreedCatsFilterDto) => this.catsListService.getCatsList(params)),
      share(),
      shareReplay(1),
    );
  }

  private updateForm(): void {
    const params = this.route.snapshot.queryParams;
    this.form.patchValue({
      breed: params['breed'] || 'All'
    }, {emitEvent: false});
  }

  private initForm(): void {
    const fb = this.fb;
    this.form = fb.group({
      breed: fb.control(null,),
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.pagination$.unsubscribe();
    this.updateList$.unsubscribe();
  }
}
