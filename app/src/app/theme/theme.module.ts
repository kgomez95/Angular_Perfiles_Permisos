import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { LayoutComponent } from './layout/layout.component';

import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ThemeModule { }
