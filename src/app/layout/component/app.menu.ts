import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    // {
                    //     label: 'Landing',
                    //     icon: 'pi pi-fw pi-globe',
                    //     routerLink: ['/landing']
                    // },
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Company',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/pages/company']
                            },
                            {
                                label: 'Department',
                                icon: 'pi pi-fw pi-th-large',
                                routerLink: ['/pages/department']
                            },
                            {
                                label: 'Designation',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/pages/designation']
                            }
                        ]
                    },
                    {
                        label: 'Employee Management',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Employee',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/pages/employee']
                            },
                            {
                                label: 'Gender',
                                icon: 'pi pi-fw pi-arrows-h',
                                routerLink: ['/pages/gender']
                            },
                            {
                                label: 'Resignation',
                                icon: 'pi pi-fw pi-sign-out',
                                routerLink: ['/pages/resignation']
                            }
                        ]
                    },
                    {
                        label: 'Leave Management',
                        icon: 'pi pi-fw pi-calendar',
                        items: [
                            {
                                label: 'Leave',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/pages/leave']
                            },
                            {
                                label: 'LeaveType',
                                icon: 'pi pi-fw pi-tags',
                                routerLink: ['/pages/leavetype']
                            },
                            {
                                label: 'Holiday',
                                icon: 'pi pi-fw pi-sun',
                                routerLink: ['/pages/holiday']
                            }
                        ]
                    },
                    {
                        label: 'Time Tracking',
                        icon: 'pi pi-fw pi-clock',
                        items: [
                            {
                                label: 'Shift',
                                icon: 'pi pi-fw pi-calendar',
                                routerLink: ['/pages/shift']
                            },
                            {
                                label: 'EmployeeShift',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/pages/employeeshift']
                            }
                        ]
                    },
                    {
                        label: 'Training & Development',
                        icon: 'pi pi-fw pi-graduation-cap',
                        items: [
                            {
                                label: 'Training',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/pages/training']
                            },
                            {
                                label: 'EmployeeTraining',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/pages/employeetraining']
                            }
                        ]
                    },
                    {
                        label: 'Performance Management',
                        icon: 'pi pi-fw pi-graduation-cap',
                        items: [
                            {
                                label: 'PerformanceReview',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/pages/employeetraining']
                            }
                        ]
                    },
                    {
                        label: 'Attendance ',
                        icon: 'pi pi-fw pi-graduation-cap',
                        items: [
                            {
                                label: 'Attendance',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/pages/employeetraining']
                            },
                            {
                                label: 'AttendanceStatus',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/pages/employeetraining']
                            }
                        ]
                    },
                    {
                        label: 'Payroll',
                        icon: 'pi pi-fw pi-graduation-cap',
                        items: [
                            {
                                label: 'Payroll',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/pages/employeetraining']
                            },
                            {
                                label: 'Salary',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/pages/employeetraining']
                            }
                        ]
                    },
                    {
                        label: 'User Management',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'User',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/pages/employeetraining']
                            },
                            {
                                label: 'Role',
                                icon: 'pi pi-fw pi-shield',
                                routerLink: ['/pages/employeetraining']
                            },
                            {
                                label: 'UserRole',
                                icon: 'pi pi-fw pi-link',
                                routerLink: ['/pages/employeetraining']
                            }
                        ]
                    },
                    {
                        label: 'Announcements',
                        icon: 'pi pi-fw pi-graduation-cap',
                        items: [
                            {
                                label: 'Announcements',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/pages/employeetraining']
                            }
                        ]
                    },
                    {
                        label: 'Expense Claims',
                        icon: 'pi pi-fw pi-graduation-cap',
                        items: [
                            {
                                label: 'ExpenseClaim',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/pages/employeetraining']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    }
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/primefaces/sakai-ng',
                        target: '_blank'
                    }
                ]
            }
        ];
    }
}
