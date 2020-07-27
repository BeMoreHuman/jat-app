import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent implements OnInit {

  constructor(
    public userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  rangeHandler($event: Event): void {
    this.userService.usersCount = Number(($event.target as HTMLInputElement).value);
  }
}
