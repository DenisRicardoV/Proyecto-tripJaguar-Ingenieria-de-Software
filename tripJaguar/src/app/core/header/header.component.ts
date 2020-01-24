import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take, filter } from 'rxjs/operators';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  URL_PUBLIC: string = environment.PUBLIC_FILE;


  constructor(
    private auth: AuthService,
    private router:Router


  ) {
    this.user = this.auth.getDataUserSession();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.user = this.auth.getDataUserSession();
      console.log('userr:: ', this.user);
    });

  }

  generateurl(user){
    return user.image ? user.image : 'user-empty.png';
  }

  ngOnInit() {
  }

  salir() {
    this.auth.signOut().then(success => {
      localStorage.removeItem('access_token');
      location.reload();
    }).catch(error => {
      localStorage.removeItem('access_token');
      location.reload();    });
  }


}
