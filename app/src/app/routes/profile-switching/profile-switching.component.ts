import { Component } from '@angular/core';
import { NgxPermissionsObject, NgxPermissionsService, NgxRole, NgxRolesObject, NgxRolesService } from 'ngx-permissions';
import { NgxPermission } from 'ngx-permissions/lib/model/permission.model';

@Component({
    selector: 'app-profile-switching',
    templateUrl: './profile-switching.component.html'
})
export class ProfileSwitchingComponent {
    constructor(
        private permissonsService: NgxPermissionsService,
        private rolesService: NgxRolesService
    ) { }

    /**
     * @name getPermissions
     * @description Obtiene todos los permisos actuales.
     * @returns {NgxPermissionsObject} Devuelve un objeto con todos los permisos actuales.
     */
    public getPermissions(): NgxPermissionsObject {
        //console.log(this.permissonsService.getPermissions());
        return this.permissonsService.getPermissions();
    }

    /**
     * @name getRoles
     * @description Obtiene todos los roles actuales.
     * @returns {NgxRolesObject} Devuelve un objeto con todos los roles actuales.
     */
    public getRoles(): NgxRolesObject {
        //console.log(this.rolesService.getRoles());
        return this.rolesService.getRoles();
    }

    /**
     * @name addRemovePermission
     * @description Añade o elimina el permiso proporcionado por parámetros.
     * @param {string} permissionName - Nombre del permiso a añadir o a eliminar.
     */
    public addRemovePermission(permissionName: string): void {
        // NOTE: Esta función se ha programado para ver en tiempo real el cambio de permisos. El
        //       error que explico en la siguiente anotación no lo tengo controlado, así que es normal
        //       que aprecies comportamientos extraños con el uso de los roles.
        // NOTE: Si tu aplicación está pensada para funcionar con roles, y que estos roles tengan
        //       sus propios permisos, es imprescindible que los permisos asignados estén en sintonia
        //       con los permisos que están asignados a un rol, sino aunque tengas asignado el rol, 
        //       habrá problemas. Por ejemplo:
        //          - Añadimos los permisos "crear" y "actualizar" utilizando el permissionService.
        //              this.permissonsService.addPermissions(["crear", "actualizar"]);
        //          - Añadimos el rol "admin" utilizando el rolesService, asignándole a su misma vez
        //            los dos permisos anteriores.
        //              this.rolesService.addRoleWithPermissions(roleName, ["crear", "actualizar"]);
        //          - Con esto, ya tenemos asignado el rol "admin" y tenemos asignados los permisos
        //            "crear" y "actualizar". Ahora si intentamos entrar en la ruta "/routes/admin-board"
        //            podremos entrar sin ningún problema.
        //          - Ahora, utilizando el PermissionsService, eliminamos el permiso "actualizar".
        //              this.permissonsService.removePermission("actualizar");
        //          - En estos momentos, tenemos solamente el permiso "crear" asignado, pero el rol
        //            "admin" todavía sigue teniendo el permiso "actualizar", porque solamente lo
        //            hemos borrado con el PermissionsService, pero en ningún momento se lo hemos
        //            quitado al rol "admin".
        //          - Si ahora volvemos a intentar entrar en la ruta "/routes/admin-board", aunque
        //            tengamos el rol "admin" no nos permitirá el acceso, debido a que el rol tiene
        //            asignado un permiso que en realidad no existe, y esto hace que se produzcan
        //            comportamientos extraños.

        let permission: NgxPermission | undefined = this.permissonsService.getPermission(permissionName);
        
        if (permission) {
            this.permissonsService.removePermission(permissionName);
        }
        else {
            this.permissonsService.addPermission(permissionName);
        }
    }

    /**
     * @name addRemoveRole
     * @description Añade o elimina el rol proporcionado por parámetros.
     * @param {string} roleName - Nombre del rol a añadir o eliminar.
     */
    public addRemoveRole(roleName: string): void {
        let role: NgxRole | undefined = this.rolesService.getRole(roleName);
        
        if (role) {
            this.rolesService.removeRole(roleName);
        }
        else {
            // NOTE: El segundo parámetro que le pasamos a la función "addRole", en este caso, es una función de validación.
            //       Cada vez que se tenga que evaluar si tiene o no el rol asignado, se ejecutará esta función de validación.
            //       Si esta función de validación devuelve "false", por mucho que tenga el rol asignado, no va a permitir
            //       el acceso al componente en cuestión.
            // NOTE: Es posible pasarle también un array de strings en vez de una función de validación.
            // this.rolesService.addRole(roleName, function (roleName, roles): boolean {
            //     console.log(roleName);
            //     console.log(roles);
            //     return true;
            // });

            // NOTE: Aquí estamos añadiendo el permiso en cuestión, asignándole todos los permisos actuales que existen.
            this.rolesService.addRoleWithPermissions(roleName, Object.keys(this.getPermissions()));
        }
    }
}
