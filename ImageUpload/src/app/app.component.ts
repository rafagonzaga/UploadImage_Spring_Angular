import { Component } from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private httpClient: HttpClient) { }

  selectedFile: File;
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  message: string;
  imageName: any;

  // É chamado quando o usuário seleciona uma imagem
  public onFileChanged(event) {
    // Seleciona o arquivo
    this.selectedFile = event.target.files[0];
  }

  //É chamado quando o usuário clica em enviar para carregar a imagem
  onUpload() {
    console.log(this.selectedFile);

    // O FormData API fornece métodos e propriedades para nos permitirem facilmente preparar dados de formulários
    // a serem enviados com solicitações pós-HTTP.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    // Faz uma chamada para o Spring Boot Application salvar a imagem
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );
  }

  // É chamado quando o usuário clica no botão Get Image para obter a imagem do back end.
  getImage() {
    // Faz uma chamada para o Spring Boot obter a imagem em bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
