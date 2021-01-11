import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    noticias: Article[] = [];

    constructor(
        private noticiasService: NoticiasService
    ) { }

    ngOnInit(): void {
        this.cargarNoticas();
    }

    cargarNoticas(evento?): any {
        this.noticiasService.getTopHeadlines().subscribe(resp => {
            // console.log(resp);

            if (resp.articles.length === 0) {
              evento.target.disabled = true;
              evento.target.complete();
              return;
            }
            this.noticias.push(...resp.articles);

            if (evento) {
                evento.target.complete();
            }
        });
    }

    loadData(evento): any {

        // console.log(evento);
        this.cargarNoticas(evento);
    }
}
