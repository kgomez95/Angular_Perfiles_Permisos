import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxPermissionsGuard } from 'ngx-permissions';

import { LayoutComponent } from '@theme/layout/layout.component';

import { AdminBoardComponent } from './admin-board/admin-board.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ProfileSwitchingComponent } from './profile-switching/profile-switching.component';
import { SystemBoardComponent } from './system-board/system-board.component';

const routes: Routes = [
    {
        path: 'routes',
        component: LayoutComponent,
        //canActivate: [authGuard],
        //canActivateChild: [authGuard],
        children: [
            { 
                path: 'profile-switching', 
                component: ProfileSwitchingComponent 
            },
            {
                path: 'admin-board',
                component: AdminBoardComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        // NOTE: Este "admin" hace referencia al rol que se crea en el fichero "startup.service.ts".
                        // NOTE: Si lo que quieres es limitar las rutas por permisos en vez de por roles, mi recomendación 
                        //       es que en la aplicación no se utilice el sistema de roles. Voy a poner de ejemplo esta ruta 
                        //       en la que estamos: Aquí estamos especificando que solo puede entrar el rol "admin". En el fichero
                        //       "startup.service.ts" estamos creando el rol "admin" y es por eso que podemos entrar. Si ahora nosotros
                        //       sustituimos el rol "admin" (en el fichero "startup.service.ts") y le ponemos "guest", ya no tendrá
                        //       acceso a la ruta "admin-board". PERO, si nosotros cogemos y añadimos un permiso llamado "admin",
                        //       aunque tengamos el rol "guest" podremos entrar en la ruta "admin-board" debido a que tenemos un
                        //       permiso llamado "admin". ¡Así que cuidado con esto!
                        only: 'admin',
                        redirectTo: '/routes/profile-switching',
                    },
                },
            },
            {
                path: 'permissions',
                component: PermissionsComponent,
            },
            {
                path: 'system-board',
                component: SystemBoardComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: 'system/view',
                        redirectTo: '/routes/profile-switching',
                    }
                }
            }
        ]
    },
    { path: '**', redirectTo: 'routes/profile-switching' },
    { path: '', redirectTo: '/routes/profile-switching', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: false,
        }),
    ],
    exports: [RouterModule],
})
export class RoutesRoutingModule { }
