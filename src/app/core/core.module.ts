import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        MainLayoutComponent,
        HeaderComponent,
        FooterComponent],
    imports: [
        // vendor
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        // material
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [MainLayoutComponent, HeaderComponent, FooterComponent]
})
export class CoreModule { }
