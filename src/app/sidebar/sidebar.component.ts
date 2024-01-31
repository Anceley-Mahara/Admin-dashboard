import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router to handle navigation


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const adminROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/apply',          title: 'New Applicant',             icon: 'nc-badge',     class: ''},
    //{ path: '/renewal',         title: 'Renewal Applicant',             icon:'nc-diamond',    class: '' },
    { path: '/institution-confirmation', title: 'Ins Confirmation', icon:'nc-pin-3', class: '' },
    //{ path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'Applicant Profile',      icon:'nc-single-02',  class: '' },
    //{path: '/logout',         title: 'Logout',            icon: 'nc-share-66', class: ''},
    { path: '/register',     title: 'Register Users',        icon:'nc-tile-56',    class: '' },
    //{ path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    //{ path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

export const backOfficeROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/apply',          title: 'New Applicant',             icon: 'nc-badge',     class: ''},
    //{ path: '/renewal',         title: 'Renewal Applicant',             icon:'nc-diamond',    class: '' },
    { path: '/institution-confirmation', title: 'Ins Confirmation', icon:'nc-pin-3', class: '' },
    //{ path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'Applicant Profile',      icon:'nc-single-02',  class: '' },
    //{path: '/logout',         title: 'Logout',            icon: 'nc-share-66', class: ''},
    //{ path: '/register',     title: 'Register Users',        icon:'nc-tile-56',    class: '' },
    //{ path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    //{ path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

export const frontOfficeROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    //{ path: '/apply',          title: 'New Applicant',             icon: 'nc-badge',     class: ''},
    //{ path: '/renewal',         title: 'Renewal Applicant',             icon:'nc-diamond',    class: '' },
    { path: '/institution-confirmation', title: 'Ins Confirmation', icon:'nc-pin-3', class: '' },
    //{ path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'Applicant Profile',      icon:'nc-single-02',  class: '' },
    //{path: '/logout',         title: 'Logout',            icon: 'nc-share-66', class: ''},
    //{ path: '/register',     title: 'Register Users',        icon:'nc-tile-56',    class: '' },
    //{ path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    //{ path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];



@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    constructor(private router: Router) {}

    logout() {   
        // Navigate to the login page
        window.sessionStorage.clear();
        // Clearing all data in localStorage
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    public menuItems: any[];
    ngOnInit() {
        const accessRole = localStorage.getItem("role"); 
        if(accessRole==="superadministrator"){
        this.menuItems = adminROUTES.filter(menuItem => menuItem);
    } else if(accessRole==="backoffice"){
        this.menuItems = backOfficeROUTES.filter(menuItem => menuItem);
    } else if(accessRole==="frontoffice"){
        this.menuItems = frontOfficeROUTES.filter(menuItem => menuItem);
    }
}
}
