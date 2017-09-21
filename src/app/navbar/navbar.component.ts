import { User } from './../shared/models/user.model';
import { Router } from '@angular/router';
import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { UserService } from './../shared/services/user.service';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { LoginService } from './../shared/services/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    user: User;
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    @ViewChild("navbar-cmp") button;

    constructor(
        location: Location,
        private renderer: Renderer,
        private element: ElementRef,
        public authService: LoginService,
        public router: Router

    ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

        this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    getTitle() {
        var titlee = window.location.pathname;
        titlee = titlee.substring(1);
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'DTX - Digital X';
    }

    logout() {
        this.authService.logout()
        this.router.navigate(['/login'])
    }

    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];

        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
}

