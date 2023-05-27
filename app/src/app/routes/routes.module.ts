import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { RoutesRoutingModule } from './routes-routing.module';

import { AdminBoardComponent } from './admin-board/admin-board.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ProfileSwitchingComponent } from './profile-switching/profile-switching.component';
import { SystemBoardComponent } from './system-board/system-board.component';

const COMPONENTS: any[] = [
    AdminBoardComponent,
    PermissionsComponent,
    ProfileSwitchingComponent,
    SystemBoardComponent,
];

@NgModule({
    imports: [
        SharedModule,
        RoutesRoutingModule
    ],
    declarations: [...COMPONENTS],
})
export class RoutesModule { }
