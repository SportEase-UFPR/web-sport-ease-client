import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
  }

  navigate() {
    this.router.navigateByUrl('/dashboard');
  }
}
