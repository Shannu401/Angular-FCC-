import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit , QueryList, SkipSelf, ViewChild, ViewChildren} from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck , AfterViewInit{

  hotelName = "hilton Hotel";
  numberOfrooms = 10;
  hideRooms = true;

  selectedRoom!: RoomList;

  rooms$ = this.roomsService.getRooms$;

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  // @ViewChild(HeaderComponent, {static : true}) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor(@SkipSelf() private roomsService: RoomsService) { }

  totalBytes = 0;

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      // console.log(event);
      switch (event.type){
       case HttpEventType.Sent:
        {
          console.log("Request has been made!");
          break;
        }
        case HttpEventType.ResponseHeader : {
          console.log("Request success!");
          break;
        }
        case HttpEventType.DownloadProgress : {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response : {
          console.log(event.body);
          break;
        }
      }
    })

  

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete : () => console.log('complete'),
      error: (err) => console.log(err),
    });
    this.stream.subscribe( data => console.log(data));
    // console.log(this.headerComponent);
    //   this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    //  })
  }

  subscription !: Subscription;

  ngAfterViewInit(){
    // console.log(this.headerComponent);
    this.headerComponent.title = "Rooms View"
    this.headerChildrenComponent.last.title = "Last Title"
  }
  // ngAfterViewChecked(): void {
  //   this.headerComponent.title = "Rooms"
  // }
  title = "Room List";
  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  ngDoCheck(): void {
    console.log("do check is called!")
  }


  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  })


  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedrooms: 5,
  }

  roomList: RoomList[] = [];

  selectRoom(room: RoomList) {
    console.log(room);
    this.selectedRoom = room;
  }
  addRoom() {
    const room: RoomList = {
      roomNumber: "4",
      roomType: "Private Suite",
      amenities: "Air Conditioner, Free WIFI, Tv, Bathroom, Kitchen",
      price: 15000,
      photos: "",
      checkintime: new Date("10-jan-2024"),
      checkouttime: new Date("11-jan-2024"),
      rating: 4.6,
    }
    // this.roomList.push(room);
    this.roomList = [...this.roomList, room];
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
