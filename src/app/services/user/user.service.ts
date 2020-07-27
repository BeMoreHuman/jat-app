import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, forkJoin, Observable, of, throwError, timer} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../../interfaces/user.interface';
import {catchError, concatMap, tap} from 'rxjs/operators';
import {UpdateDataStatuses} from '../../interfaces/index.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private NUM_OF_ROWS = 0;
  private MAX_REQUEST_PER_SECOND = 4;
  private REQUEST_DELAY = 2000;

  updateData$: BehaviorSubject<UpdateDataStatuses> = new BehaviorSubject<UpdateDataStatuses>(UpdateDataStatuses.init);
  isLoadingData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  MIN_NUM_OF_ROWS = 0;
  MAX_NUM_OF_ROWS = 20;

  REFRESH_TIMEOUT = 1000 * 10; // 10 seconds
  autoRefreshTimeout;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get usersCount(): number {
    return this.NUM_OF_ROWS;
  }

  set usersCount(count: number) {
    this.NUM_OF_ROWS = count;
    this.updateData$.next(UpdateDataStatuses.update);
    if (count < 1) {
      this.holdRefreshTimeout();
    }
  }

  fetchUsers(): Observable<User[]> {
    this.isLoadingData$.next(true);

    if (this.usersCount < 1) {
      return of([]).pipe(
        tap(() => {
          this.refreshTimeout();
          this.isLoadingData$.next(false);
        }),
      );
    }

    const sourceArray: Observable<User>[] = [];
    for (let i = 0; i < this.usersCount; i++) {
      sourceArray.push(this.fetchUser());
    }

    const withDelay = sourceArray.length > this.MAX_REQUEST_PER_SECOND;
    if (withDelay) {
      sourceArray.forEach((item, index) => {
        const delayMultiplier: number = Math.floor(index / this.MAX_REQUEST_PER_SECOND);

        if (delayMultiplier) {
          const delay: number = this.REQUEST_DELAY * delayMultiplier;
          sourceArray[index] = timer(delay).pipe(concatMap(() => item));
        }
      });
    }

    return forkJoin<Observable<User>[]>(sourceArray)
      .pipe(
        tap(() => {
          this.refreshTimeout();
          this.isLoadingData$.next(false);
        }),
        catchError(error => throwError(error))
      );
  }

  fetchUser(): Observable<User> {
    return this.httpClient.get<User>(environment.apiUrl);
  }

  /**
   * Clear old refresh timeout & run new one.
   */
  refreshTimeout(): void {
    clearTimeout(this.autoRefreshTimeout);

    this.autoRefreshTimeout = setTimeout(() => {
      this.usersCount = this.usersCount;
    }, this.REFRESH_TIMEOUT);
  }

  holdRefreshTimeout(): void {
    clearTimeout(this.autoRefreshTimeout);
  }

  resumeRefreshTimeout(): void {
    this.autoRefreshTimeout = setTimeout(() => {
      this.usersCount = this.usersCount;
    }, this.REFRESH_TIMEOUT);
  }
}
