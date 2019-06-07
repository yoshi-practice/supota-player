import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GaService } from './service/ga.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private gaService: GaService
  ) { }

  ngOnInit() {
    // tracking

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((params: any) => {
        this.gaService.sendPageView(params.url);
      });
  }

   handleClick(event) {
    this.gaService.sendEvent('User Action', 'click', 'conversion', '3000');
  }

}
