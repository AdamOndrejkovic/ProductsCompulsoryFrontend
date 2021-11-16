import { Component, OnInit } from '@angular/core';
import {Admin} from "../_models/admin";
import {AccountService} from "../_services/account.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  admin: Admin | null | undefined;



  constructor(private accountService: AccountService) {
    this.accountService.adminSubject.subscribe(x => this.admin = x)
  }


  logout() {
    this.accountService.logout();
  }

  ngOnInit(): void {
  }

}
