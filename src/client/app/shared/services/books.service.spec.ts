import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { Book } from '../models/index';
import { BooksService } from './books.service';

export function main() {
  describe('Books Service', () => {
    let booksService: BooksService;
    let mockBackend: MockBackend;
    let initialResponse: any;
    let jsonContent = '[{\
      "author": { "avatar": "aa1", "name": "an2" },\
      "cover": "c3",\
      "description": "d4",\
      "genre": { "category": "gc5", "name": "gn6" },\
      "id": "i7",\
      "introduction": [{ "content": "ic8" }, { "content": "ic9" }],\
      "likes": 10,\
      "name": "n11",\
      "published": "2003-09-18T01:59:14.918Z"\
    }]';
    let bookObject: Book = {
      author: { avatar: 'aa1', name: 'an2' },
      cover: 'c3',
      description: 'd4',
      genre: { category: 'gc5', name: 'gn6' },
      id: 'i7',
      introduction: [{ content: 'ic8' }, { content: 'ic9' }],
      likes: 10,
      name: 'n11',
      published: '2003-09-18T01:59:14.918Z'
    };

    beforeEach(() => {
      let injector = ReflectiveInjector.resolveAndCreate([
        BooksService,
        BaseRequestOptions,
        MockBackend,
        {provide: Http,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      booksService = injector.get(BooksService);
      mockBackend = injector.get(MockBackend);

      let connection: any;
      mockBackend.connections.subscribe((c: any) => connection = c);
      initialResponse = booksService.get();
      connection.mockRespond(new Response(new ResponseOptions({ body: jsonContent })));
    });

    it('should return an Observable when get called', () => {
      expect(initialResponse).toEqual(jasmine.any(Observable));
    });

    it('should return a list of one book', () => {
      let books: any;
      initialResponse.subscribe((data: any) => books = data);
      expect(books).toEqual(jasmine.any(Array));
      expect(books.length).toEqual(1);
    });

    it('should have one book with the correct parameters inside the list', () => {
      let books: any;
      initialResponse.subscribe((data: any) => books = data);
      expect(books[0]).toEqual(bookObject);
    });
  });
}
