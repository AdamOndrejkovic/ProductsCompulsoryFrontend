import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Admin} from "../_models/admin";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AdminRegister} from "../_models/adminRegister";

@Injectable({providedIn: 'root'})
export class AccountService {
  adminSubject = new BehaviorSubject<Admin | null>(null);
  public admin!: Observable<Admin>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    let local = localStorage.getItem('admin')
    if (local != null) {
      this.adminSubject.next(JSON.parse(local));
      //this.admin = this.adminSubject.asObservable();
    }
  }

  public get adminValue(): Admin | null {
    return this.adminSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<Admin>(`${environment.apiUrl}/Login`,{username, password})
      .pipe(map(admin => {
          localStorage.setItem('admin', JSON.stringify(admin));
          this.adminSubject.next(admin);
          return admin;
        })
      )
  }

  logout(){
    localStorage.removeItem('admin');
    this.adminSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(admin: AdminRegister) {
    return this.http.post(`${environment.apiUrl}/admins/register`, admin);
  }
}
