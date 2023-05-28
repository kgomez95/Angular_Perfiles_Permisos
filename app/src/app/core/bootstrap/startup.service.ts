import { Injectable } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

@Injectable({
    providedIn: 'root',
})
export class StartupService {
    constructor(
        private permissonsService: NgxPermissionsService,
        private rolesService: NgxRolesService
    ) { }

    /**
     * @name load
     * @description Función que se llamará al cargar la página, la cual utilizaremos para simular un inicio de sesión.
     */
    public load(): void {
        console.log("[StartupService] Inicio.");

        // Cargamos los permisos que tendremos con nuestro usuario actual.
        // NOTE: Esto debería de obtenerse de los datos del usuario cuando nos identifiquemos en la aplicación.
        const permissions: string[] = ['permissions/view', 'permissions/update', 'permissions/delete', 'system/view'];
        this.permissonsService.loadPermissions(permissions);

        // Añadimos los roles que tendremos con nuestro usuario actual.
        // NOTE: Esto debería de obtenerse de los datos del usuario cuando nos identifiquemos en la aplicación.
        this.rolesService.flushRoles();
        this.rolesService.addRoles({ admin: permissions });
        //this.rolesService.addRolesWithPermissions({ admin: permissions });
        
        console.log("[StartupService] Fin.");
    }
}
