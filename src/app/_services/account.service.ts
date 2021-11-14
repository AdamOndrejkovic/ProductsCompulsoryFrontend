import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Admin} from "../_models/admin";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AdminRegister} from "../_models/adminRegister";

@Injectable({providedIn: 'root'})
export class AccountService {
  private adminSubject: BehaviorSubject<Admin>;
  private admin: Observable<Admin>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    // @ts-ignore
    this.adminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('admin')));
    this.admin = this.adminSubject.asObservable();
  }

  public get adminValue(): Admin {
    return this.adminSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<Admin>(`${environment.apiUrl}/admins/authenticate`,{username, password})
      .pipe(map(admin => {
          localStorage.setItem('admin', JSON.stringify(admin));
          this.adminSubject.next(admin);
          return admin;
        })
      )
  }

  logout(){
    localStorage.removeItem('admin');
    // @ts-ignore
    this.adminSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(admin: AdminRegister) {
    return this.http.post(`${environment.apiUrl}/admins/register`, admin);
  }
}
