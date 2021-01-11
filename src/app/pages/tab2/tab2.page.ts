import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild('ionSegment', {static: true}) ionsegment: IonSegment;
  categorias = ['business', 'entertaiment', 'general', 'health', 'science', 'sport', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {
  }

  ngOnInit(): void {
    
    // asignar el valor por defecto al segment
    this.ionsegment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(evento) {

    this.noticias = [];
    this.cargarNoticias(evento.detail.value);
  }

  cargarNoticias(categoria: string, evento?): any {
    // asignar el valor por defecto al segment
    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe(resp => {
      // console.log(resp);
      this.noticias.push(...resp.articles);

      if (evento) {
        evento.target.complete();
      }
    });
  }

  loadData(evento): any {
    this.cargarNoticias(this.ionsegment.value, evento);
  }

}
