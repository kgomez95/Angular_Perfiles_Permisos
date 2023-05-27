import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';

const MODULES: any[] = [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPermissionsModule,
];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES],
    declarations: [],
})
export class SharedModule { }
