import { Component } from '@angular/core';
// import { thoughts } from './core/thoughts';
import Thoughts from './core/processedThoughts';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public thoughts = Thoughts;

  constructor() {
    console.log(this.thoughts);
  }

  // constructor() {

  //   const arr = thoughts.split('<b>');
  //   const withAuthor = arr.map(res => {
  //     const data = res.split('</b><br>');
  //     data[1] = data[1] ? data[1].trim().replace(/<br>/, '').replace(/<hr>/, '').replace(/"/, '') : '';
  //     return {
  //       author: data[0].trim() ? this.checkNoName(data[0]) : '',
  //       comment: data[1] ? this.cap(data[1].trim()) : 'No Comment'
  //     };
  //   }).filter(res => res[1] !== 'No Comment');

  //   const removeDups = _.uniqBy(withAuthor, (e) => {
  //     return e.comment;
  //   });

  //   const final = removeDups.filter(res => res.comment).map(res => {
  //     res.comment = res.comment.replace(/<br>/, '').replace(/<hr>/, '').trim();
  //     return res;
  //   });

  //   console.log(final);

  // }

  // checkNoName(name) {
  //   const check = name.toLowerCase().trim();
  //   return check === 'no name' ? '' : this.cap(name.trim());
  // }

  // cap(str) {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }

}
