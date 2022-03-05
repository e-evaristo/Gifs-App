import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('searchText') searchText!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}
  
  search(): void {
    this.gifsService.searchGifs(this.searchText.nativeElement.value);
    this.searchText.nativeElement.value = '';
  }

}
