import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Company } from './company/company';
import { Department } from './department/department';
import { Designation } from './designation/designation';
import { Resignation } from './resignation/resignation';
import { Gender } from './gender/gender';
import { Employee } from './employee/employee';
import { Leave } from './leave/leave';
import { Leavetype } from './leavetype/leavetype';
import { Holiday } from './holiday/holiday';
import { Shift } from './shift/shift';
import { Employeeshift } from './employeeshift/employeeshift';
import { Training } from './training/training';
import { Employeetraining } from './employeetraining/employeetraining';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'company', component: Company },
    { path: 'department', component: Department },
    { path: 'designation', component: Designation },
    { path: 'resignation', component: Resignation },
    { path: 'gender', component: Gender },
    { path: 'employee', component: Employee },
    { path: 'leave', component: Leave },
    { path: 'leavetype', component: Leavetype },
    { path: 'holiday', component: Holiday },
    { path: 'shift', component: Shift },
    { path: 'employeeshift', component: Employeeshift },
     { path: 'training', component: Training },
      { path: 'employeetraining', component: Employeetraining },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
