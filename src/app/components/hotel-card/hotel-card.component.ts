import { Component,OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent {

  @Input() public hotelName: any;
  @Input() public hotelThumbnail: any;
  @Input() public hotelImage: any;
  @Input() public cuisines: any;
  @Input() public rating: any;
  @Input() public review: any;

  public math = Math;

  constructor() { }

  ngOnInit(): void {
  }
}
