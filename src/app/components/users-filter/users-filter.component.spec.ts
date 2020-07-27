import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFilterComponent } from './users-filter.component';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from '../../services/user/user.service';

describe('UsersFilterComponent', () => {
  let component: UsersFilterComponent;
  let fixture: ComponentFixture<UsersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersFilterComponent ],
      imports: [HttpClientModule],
      providers: [UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
