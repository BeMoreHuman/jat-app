import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../interfaces/user.interface';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private selectedUser: User;

  isShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private userService: UserService,
  ) {
  }

  get user(): User {
    return this.selectedUser;
  }

  set user(user: User) {
    this.selectedUser = user;
    if (this.selectedUser) {
      this.show();
      this.userService.holdRefreshTimeout();
    } else {
      this.hide();
      this.userService.resumeRefreshTimeout();
    }
  }

  private show(): void {
    this.isShown$.next(true);
  }

  private hide(): void {
    this.isShown$.next(false);
  }
}
