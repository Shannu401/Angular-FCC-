import { Injectable , Inject} from '@angular/core';
import { RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { Appconfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Subscription, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(@Inject(APP_SERVICE_CONFIG) private config: Appconfig, private http: HttpClient){
    console.log(this.config.apiEndpoint);
    console.log("Rooms Service Initialized...");
   }

  roomList: RoomList[] = [
    // {
    //   roomNumber: 1,
    //   roomType: "Deluxe Room",
    //   amenities: "Air Conditioner, Free WIFI, Tv, Bathroom, Kitchen",
    //   price: 500,
    //   photos: "",
    //   checkintime: new Date("10-jan-2024"),
    //   checkouttime: new Date("11-jan-2024"),
    //   rating: 4.5,
    // },
    // {
    //   roomNumber: 2,
    //   roomType: "Deluxe Room",
    //   amenities: "Air Conditioner, Free WIFI, Tv, Bathroom, Kitchen",
    //   price: 1000,
    //   photos: "",
    //   checkintime: new Date("10-jan-2024"),
    //   checkouttime: new Date("11-jan-2024"),
    //   rating: 3.4675,
    // },
    // {
    //   roomNumber: 3,
    //   roomType: "Private Suite",
    //   amenities: "Air Conditioner, Free WIFI, Tv, Bathroom, Kitchen",
    //   price: 15000,
    //   photos: "",
    //   checkintime: new Date("10-jan-2024"),
    //   checkouttime: new Date("11-jan-2024"),
    //   rating: 2.6,
    // },
  ]

  getRooms(){
    // return this.roomList;
    return this.http.get<RoomList[]>('/api/rooms')
  }

  getPhotos(){
    const request = new HttpRequest("GET", `https://jsonplaceholder.typicode.com/photos`, {
    reportProress : true
    })
    return this.http.request(request);
  }

  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    shareReplay(1)
  );



}
