import {Component} from '@angular/core';
import {UserService} from './services/user/user.service';
import {User} from './interfaces/user.interface';
import {filter} from 'rxjs/operators';
import {ModalService} from './services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jat-app';
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
}
