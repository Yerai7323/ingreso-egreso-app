import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private store:Store<AppState>) {}

  user:string = '';
  userSubs!: Subscription;

  ngOnInit(): void {

    this.userSubs = this.store.select('auth')
    .pipe(
      filter( user => user.user !== null)
    )
    .subscribe(
      user => this.user = user.user?.nombre!
    )
    
  }

  ngOnDestroy(): void {
    if(this.userSubs){
      this.userSubs.unsubscribe();
    }
  }

  cerrarSesion() {
    this.authService.cerrarSesion().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
