import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AccountService} from "../_services/account.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const user = this.accountService.adminValue;
    if (user) {
      return true;
    }

    this.router.navigate(['/account/login'],
      {queryParams: {returnUrl: state.url}});
    return false;
  }
}
