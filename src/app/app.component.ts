import { AfterViewInit, Component, ElementRef, OnInit, Optional, ViewChild, ViewContainerRef , Inject} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localStorage.token';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  // template: `<h1>Hello World from inline</h1>
  //   <p>Angular is Awesome</p>
  // `,
  styleUrls: ['./app.component.scss'],
  // styles: [`h1{color: red}`],
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';

  role = "User";
  constructor(@Optional() private loggerService: LoggerService,
  @Inject(localStorageToken) private localStoragetoken : any ){


  }

  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  // ngAfterViewInit() : void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfrooms = 1000;
  // }

  @ViewChild('name', {static : true}) name!: ElementRef;

  ngOnInit(): void {
    this.loggerService?.log("AppComponent.ngOnInit");
    this.name.nativeElement.innerText = "Hilton Hotel"
    this.localStoragetoken.setItem('name', "Hilton Hotel");
  }

}
