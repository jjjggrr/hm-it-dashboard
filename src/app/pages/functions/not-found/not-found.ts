import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
})
export class NotFoundComponent {
  currentPath: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentPath = this.router.url;
  }

  goHome() {
    this.router.navigate(['']);
  }
}
