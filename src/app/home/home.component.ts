import { Component, OnInit } from '@angular/core';
import {Admin} from "../_models/admin";
import {AccountService} from "../_services/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  admin: Admin | null;

  constructor(private accountService: AccountService) {
    this.admin = this.accountService.adminValue;
  }

  ngOnInit(): void {
  }

}
