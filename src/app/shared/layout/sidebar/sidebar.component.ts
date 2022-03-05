import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {  

  constructor(private gifsService: GifsService) {}

  @ViewChild('api_key') api_key!: ElementRef<HTMLInputElement>;

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  save() {
    this.displayStyle = "none";
    localStorage.setItem("api_key", this.api_key.nativeElement.value);
    this.api_key.nativeElement.value = '';
  }
  
  get history() : string[] {
    return this.gifsService.history;
  }

  buscar(query: string) {
    this.gifsService.searchGifs(query);
  }

}
