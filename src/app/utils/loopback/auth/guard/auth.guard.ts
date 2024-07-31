import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../../login/services/login.service';
import { combineLatest, map, Observable } from 'rxjs';
import { inject } from '@angular/core';

const LOGIN_ROUTE = 'login';

// export class authGuardPermisions implements CanActivate {
//   constructor(
//     private router: Router,
//     private loginService: LoginService,
//     private auth: AuthService
//   ) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return combineLatest([this.loginService.readMe(), this.auth.isAuthenticated])
//       .pipe(
//         map(value => {
//           console.log(value)
//           const isAuth = !!!value[0].err && !!value[0].data && !!value[1];
//           if (isAuth) {
//             return isAuth;
//           } else {
//             return this.cannotActivate(state);
//           }
//         }),
//       );
//   }

//   cannotActivate(state: RouterStateSnapshot): boolean {
//     this.router.navigate([LOGIN_ROUTE], {queryParams: {
//       url: state.url,
//     }}).then();
//     return false;
//   }
// }

const cannotActivate = (state: RouterStateSnapshot): boolean => {
  const router = inject(Router);
  router.navigate([LOGIN_ROUTE], {queryParams: {
    url: state.url,
  }}).then();
  return false;
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) => {
  const loginService = inject(LoginService);
  const auth = inject(AuthService);
  return combineLatest([loginService.readMe(), auth.isAuthenticated])
    .pipe(
      map(value => {
        const isAuth = !!!value[0].err && !!value[0].data && !!value[1];
        if (isAuth) {
          return isAuth;
        } else {
          return cannotActivate(state);
        }
      }),
    );
};
