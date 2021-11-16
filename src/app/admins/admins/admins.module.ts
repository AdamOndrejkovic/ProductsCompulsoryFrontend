import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './admins-routing.module';
import { LayoutComponent } from '../layout/layout.component';
import { ListComponent } from '../list/list.component';
import { AddEditComponent } from '../add-edit/add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    exports: [
        ListComponent
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class AdminsModule { }
