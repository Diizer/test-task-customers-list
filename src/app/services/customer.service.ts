import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppInitializer } from '../tools/AppInitializer';
import { Customer } from '../domain/models/customers';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CustomerService {
    private readonly tableSpinnerSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get tableSpinner$(): Observable<boolean> {
        return this.tableSpinnerSubject.asObservable();
    }

    set tableSpinner(value: boolean) {
        this.tableSpinnerSubject.next(value);
    }

    constructor(
        protected readonly http: HttpClient,
        protected config: AppInitializer
    ) {

    }

    async getCustomer(): Promise<Customer> {
        return this.http.get<any>(`${this.config.apiUrl}`).pipe(
            map(res => <Customer>{
                name: res.name,
                lastName: res.last_name,
                age: res.age,
                imgUrl: res.image_url,
                isCovid: res.is_COVID_positive
            })
        ).toPromise();
    }
}
