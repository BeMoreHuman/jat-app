import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user.interface';
import {UserService} from '../../services/user/user.service';
import {ModalService} from '../../services/modal/modal.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-jat-app',
  templateUrl: './jat-app.component.html',
  styleUrls: ['./jat-app.component.scss']
})
export class JatAppComponent implements OnInit {
  title = 'JAT App';
  users: User[] = [];

  constructor(
    public userService: UserService,
    public modalService: ModalService,
  ) {
    this.userService.updateData$
      .pipe(
        filter(() => !this.userService.isLoadingData$.value)
      )
      .subscribe(() => {
        this.userService.fetchUsers()
          .subscribe(users => this.users = users,
            error => {
              alert('Sorry, something bad happen, try again later.');
              console.log(`Error: ${error}`);
            });
      });
  }

  ngOnInit(): void {
  }
}
