import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:string = '';
  userSubs!: Subscription;
  
  constructor(private store:Store<AppState>) { }

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
}
