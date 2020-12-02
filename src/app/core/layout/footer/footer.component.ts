import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private readonly unsubscribe$: Subject<boolean> = new Subject<boolean>();
  constructor(private readonly customerService: CustomerService) {

    this.customerService.tableSpinner$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      this.isLoading = value;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {}
}
