import { Component } from '@angular/core';
import {Admin} from "./_models/admin";
import {AccountService} from "./_services/account.service";
import {first} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CompulsoryFrontend';
}
