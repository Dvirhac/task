import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth :boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe( user => {
      this.isAuth = !!user;
    })
  }

  onLogOut() {
    this.authService.logout();
  }
}
