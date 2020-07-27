import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JatAppComponent} from './jat-app.component';
import {UserService} from '../../services/user/user.service';
import {ModalService} from '../../services/modal/modal.service';
import {HttpClientModule} from '@angular/common/http';

describe('JatAppComponent', () => {
  let component: JatAppComponent;
  let fixture: ComponentFixture<JatAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JatAppComponent],
      providers: [
        UserService,
        ModalService,
      ],
      imports: [
        HttpClientModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JatAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'jat-app'`, () => {
    expect(component.title).toEqual('JAT App');
  });
});
