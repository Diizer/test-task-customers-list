import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CustomersRoutingModule } from '../customers/customers.routing';
import { CustomersComponent } from './customers.component';
import { CustomerDetailsComponent } from './customer-details-modal/customer-details-modal.component';
import { CustomerDetailsModalService } from './customer-details-modal/customer-details-modal.service';

const components = [CustomerDetailsComponent, CustomersComponent];
const services = [CustomerDetailsModalService];
const modules = [SharedModule, CustomersRoutingModule];

@NgModule({
  declarations: [
    ...components
  ],
  providers: [
    ...services
  ],
  imports: [
    ...modules
  ]
})
export class CustomersModule { }
