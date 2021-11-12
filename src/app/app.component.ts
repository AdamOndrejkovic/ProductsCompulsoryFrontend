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
  admin: Admin;

  constructor(private accountService: AccountService) {
    this.accountService.admin.subscribe(x => this.admin = x)
  }

  logout() {
    this.accountService.logout();
  }
}
