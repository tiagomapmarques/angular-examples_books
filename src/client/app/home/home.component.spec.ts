import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Book, BooksService, BookListState, GenreState, CategoryState, FilterService } from '../shared/index';
import { HomeModule } from './home.module';

export function main() {
  describe('Home component', () => {
    // setting module for testing
    // Disable old forms
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, RouterModule, HttpModule, HomeModule],
        declarations: [TestComponent],
        providers: [
          BookListState,
          GenreState,
          CategoryState,
          FilterService,
          BaseRequestOptions,
          MockBackend,
          {provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          },
          {provide: Router, MockRouter },
          {provide: BooksService, useFactory: () => new MockBooksService() }
        ]
      });
    });

    it('should work', async(() => {
      TestBed.compileComponents().then(() => {
        let fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
      });
    }));

    describe('search sections', () => {

      it('should display three search sections', async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();

          let homeDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(homeDOMEl.querySelectorAll('.search-section').length).toEqual(3);
        });
      }));

      it('should have one genre', async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();

          let homeDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(homeDOMEl.querySelectorAll('sd-checkbox-list .single-checkbox').length).toEqual(1);
          expect(homeDOMEl.querySelectorAll('sd-checkbox-list .single-checkbox')[0].textContent.trim()).toEqual('gn6');
        });
      }));

      it('should have two categories', async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();

          let homeDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(homeDOMEl.querySelectorAll('sd-radio-list .single-radio').length).toEqual(2);
          expect(homeDOMEl.querySelectorAll('sd-radio-list .single-radio')[0].textContent.trim()).toEqual('All');
          expect(homeDOMEl.querySelectorAll('sd-radio-list .single-radio')[1].textContent.trim()).toEqual('gc5');
        });
      }));
    });

    describe('results', () => {

      it('display one result', async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();

          //let homeInstance = fixture.debugElement.children[0].componentInstance;
          let homeDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(homeDOMEl.querySelectorAll('.results').length).toEqual(1);
          expect(homeDOMEl.querySelectorAll('sd-book-summary').length).toEqual(1);
        });
      }));
    });
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-home></sd-home>'
})
class TestComponent { }

class MockRouter {
  public navigate(params: string[]): void {
    return;
  }
}

class MockBooksService {
  public observable: ReplaySubject<Book[]> = new ReplaySubject(1);
  public state: Book[] = [
    {
      author: { avatar: 'aa1', name: 'an2' },
      cover: 'c3',
      description: 'd4',
      genre: { category: 'gc5', name: 'gn6' },
      id: 'i7',
      introduction: [{ content: 'ic8' }, { content: 'ic9' }],
      likes: 10,
      name: 'n11',
      published: new Date('2003-09-18T01:59:14.918Z')
    }
  ];

  constructor() {
    this.observable.next(this.state);
  }

  public get(): Observable<Book[]> {
    return this.observable.asObservable();
  }
}
