import { Component } from '@angular/core';
import {Admin} from "./_models/admin";
import {AccountService} from "./_services/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CompulsoryFrontend';
  admin: Admin | null | undefined;

  constructor(private accountService: AccountService) {
    this.accountService.adminSubject.subscribe(x => this.admin = x)
  }

  logout() {
    this.accountService.logout();
  }
}
