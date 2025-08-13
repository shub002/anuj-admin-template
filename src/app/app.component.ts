import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/shared-service/loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 constructor(private router: Router, private loaderService: LoaderService) {
   this.router.events.subscribe(event => {
    if(event instanceof NavigationStart) {
      this.loaderService.show();
    }else if(
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ){
      this.loaderService.hide();
    }
  })
}
}
