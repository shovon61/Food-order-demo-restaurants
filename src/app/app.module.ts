import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AvatarModule } from 'ngx-avatar';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    CartItemComponent,
    DropdownComponent,
    HotelComponent,
    HotelCardComponent,
    HotelsComponent,
    MenuItemComponent,
    NavBarComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatSidenavModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
