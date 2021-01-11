import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() i: number;
  @Input() noticia: Article;

  constructor() { }

  ngOnInit() {
  }

  abrirNoticia(): any {
    console.log(this.noticia.url);
  }

}
