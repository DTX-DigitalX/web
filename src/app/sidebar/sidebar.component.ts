import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RouterModule } from '@angular/router';

declare var $: any;

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'dashboard', icon: 'ti-panel', class: 'nav-item"' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isNotMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

}