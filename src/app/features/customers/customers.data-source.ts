import { DataSource } from '@angular/cdk/table';

import { BehaviorSubject, combineLatest, from, Observable, Subject, timer } from 'rxjs';
import { startWith, switchMap, takeUntil, take } from 'rxjs/operators';

import { Customer } from '../../domain/models/customers';
import { CustomerService } from '../../services/customer.service';

export class CustomersDataSource extends DataSource<Customer> {
  beforeLoaded: Observable<void>;
  afterLoaded: Observable<void>;

  private readonly unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public readonly beforeLoaded$: Subject<void> = new Subject<void>();
  public readonly afterLoaded$: Subject<void> = new Subject<void>();
  private readonly rowCount$: Subject<number> = new Subject<number>();
  private readonly refresh$: Subject<void> = new Subject<void>();
  private readonly customers$: Subject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(private readonly customerService: CustomerService) {
    super();
    this.beforeLoaded = this.beforeLoaded$.asObservable();
    this.afterLoaded = this.afterLoaded$.asObservable();
  }

  connect(): Observable<Customer[]> {

    const loadData = async (rowCount: number): Promise<Customer[]> => {
      this.beforeLoaded$.next();
      const result: Customer[] = [];
      let tDelta = 0;

      for (let i = 0; i < rowCount; i++) {

        const t0 = performance.now();

        const customer = await this.customerService.getCustomer();

        if (!customer) {
          throw new Error('Oops... something wrong');
        } else {
          result.push(customer);
        }

        const isFourthIteration = (i + 1) % 4 === 0;

        const t1 = performance.now();

        tDelta = tDelta + (t1 - t0);

        if (isFourthIteration && tDelta < 1000) {
          await timer(1000 - tDelta).pipe(take(1)).toPromise();
        }
      }

      this.afterLoaded$.next();

      return result;
    };

    combineLatest([
      this.refresh$.pipe(startWith(true)),
      this.rowCount$.pipe(startWith(1))
    ]).pipe(
      switchMap(([_, rowCount]) => from(loadData(rowCount))),
      takeUntil(this.unsubscribe$)
    ).subscribe(t => this.customers$.next(t));

    return this.customers$.asObservable();
  }

  refresh(): void {
    this.refresh$.next();
  }

  changeRows(rows: number): void {
    this.rowCount$.next(rows);
  }

  disconnect(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
