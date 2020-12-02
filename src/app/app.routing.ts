import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'customers'
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./features/customers/customers.module').then((m) => m.CustomersModule)
  },
  {
    path: '**',
    redirectTo: 'customers'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
