import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ResolveEnd, ResolveStart, Router } from '@angular/router';
import { filter, map, mapTo, merge, Observable } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { User } from '../../User';

@Component({
  selector: 'app-contact',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  personalList!: Observable<User[]>;

  constructor(
    private amdinService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    // this.personalList = this.amdinService.getPersonalList();
    this.personalList = this.activatedRoute.data.pipe(map(data => data?.['users']))
  }

}
