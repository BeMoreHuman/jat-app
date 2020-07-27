import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user.interface';
import {ModalService} from '../../services/modal/modal.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  @Input() users: User[] = [];

  constructor(
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  userHandler(user: User): void {
    this.modalService.user = user;
  }
}
