import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
//import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav', {static: true}) public sidenav!: MatSidenav;

  public hotels = [];
  public hotel: any;
  public cartItems = [];
  public totalAmount = 0;
  public isFetched: boolean = false;
  public toggleMode = "over";
  public userName = '';
  public isSideNavShowing: boolean = false;

  constructor(private _hotelService: HotelService, private route: ActivatedRoute, 
    private router: Router, private _sidenavService: SideNavService) { }

  scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  getHotel = (id: number) => {
    try {
      return this.hotels.filter((hotel) => hotel.id == id);
    }
    catch(e) {
      console.log(e);
    }
  }

  addToMyCart = (menu:any) => {
    const newItem = {
      "id": menu.id,
      "name": menu.name,
      "price": menu.price,
      "quantity": 1
    }

    if(this.isItemAlreadyExist(newItem)) {
      this.itemAlreadyExistModal(newItem);
    }
    else {
      this.addItemToMyCart(newItem);
      this.itemAddedModal(newItem);
      this.calculateAmount();
    }
  }

  addItemToMyCart = (newItem:any) => {
    this._hotelService.setCartItem(newItem);
    this.cartItems = this._hotelService.cartItems;
  }

  isItemAlreadyExist = (newItem:any) => {
    return this._hotelService.cartItems.find((cartItem) => cartItem.id == newItem.id);
  }

  itemAddedModal = (newItem:any) => {
    Swal.fire({
      icon: 'success',
      title: `${newItem.name} added to your basket!`,
      text: "Click on 'View My Basket' button below to view your basket or click on the basket icon at the top of the page",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#9c27b0',
      confirmButtonText: 'View My Basket',
      cancelButtonText: 'Close',
      cancelButtonColor: '#e23c3c'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleSideNav();
      }
    });
  }

  toggleSideNav = () => {
    this.scrollTop();
    this._sidenavService.toggle();
  }

  itemAlreadyExistModal = (newItem) => {
    Swal.fire({
      icon: 'warning',
      title: `${newItem.name} is already exist in your basket!`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#9c27b0',
      confirmButtonText: 'View My Basket',
      cancelButtonText: 'Close',
      cancelButtonColor: '#e23c3c'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleSideNav();
      }
    });
  }

  removeItem = (cartItem) => {
    this._hotelService.removeCartItem(cartItem);
    this.cartItems = this._hotelService.cartItems;
    this.calculateAmount();
  }

  addQuantity = (cartItem) => {
    this.cartItems.forEach((item,index)=>{
      if(item.id == cartItem.id)
        this.cartItems[index].quantity = Number(this.cartItems[index].quantity)  + 1; 
   });
   this.calculateAmount();
  }

  removeQuantity = (cartItem) => {
    this.cartItems.forEach((item,index)=>{
      if(item.id == cartItem.id) {
        if (this.cartItems[index].quantity > 0)
          this.cartItems[index].quantity -= 1;
      }
   });
   this.calculateAmount();
  }

  calculateAmount = () => {
    this.totalAmount = 0; 
    this.cartItems.map((item) => {
      this.totalAmount = this.totalAmount + (item.quantity*item.price)
    });
  }

  openPaymentMethod = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "It's just a sample confirmation message!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9c27b0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, pay bill!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Payment Successfull!',
          text: "It's just a sample success message. We can integrate real time UPI service!",
          showConfirmButton: true,
          confirmButtonColor: '#9c27b0'
        });
      }
    })
  }

  ngAfterViewInit(): void {
    this._sidenavService.setSidenav(this.sidenav);
  }

  ngOnInit(): void {
    this.scrollTop();
    this._hotelService.getHotelsList().subscribe((data) => {
      this.hotels = data;
      this.route.paramMap.subscribe((params: ParamMap) => {
        [this.hotel] =  this.getHotel(parseInt(params.get('id')));
      })
    });

    this.userName = this._hotelService.userName;
    this.cartItems = this._hotelService.cartItems;
    this.calculateAmount();

    if(!this.userName) {
      this.router.navigateByUrl("/hotels");
    }
  }
}
