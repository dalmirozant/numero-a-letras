import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, fromEvent, map, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-num-a-nom',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      <input type="number" #numeroInput />
    </p>
  `,
  styles: ``,
})
export class NumANomComponent implements AfterViewInit, OnDestroy {
  @ViewChild('numeroInput', { static: false }) numeroInput!: ElementRef;
  /**
   * Emite el resultado del número transformado a letras
   */
  @Output() resultado = new EventEmitter<string>();
  digitos$!: Observable<any>;
  destroyed$ = new Subject();

  ngAfterViewInit(): void {
    this.digitos$ = fromEvent<Event>(
      this.numeroInput.nativeElement,
      'input'
    ).pipe(
      takeUntil(this.destroyed$),
      map((res: Event) => this.transformarNumeroATexto(res))
    );
    this.digitos$.subscribe({
      next: (res) => this.resultado.emit(res),
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  transformarNumeroATexto({ target }: Event): string {
    const valorRecibido = (target as HTMLInputElement).value;
    if (valorRecibido.length > 12) return 'Número demasiado grande';
    const arrayDeTrios: string[] = this.dividirEnTres(valorRecibido);
    const arrayDeTriosLetras: string[] = arrayDeTrios.map((trio) =>
      this.tresNumeros(trio)
    );

    const arrayDeTriosLength = arrayDeTriosLetras.length;
    if (arrayDeTriosLength > 1) arrayDeTriosLetras.splice(-1, 0, ' MIL ');
    if (arrayDeTriosLength > 2) arrayDeTriosLetras.splice(-3, 0, ' MILLONES ');
    if (arrayDeTriosLength > 3) arrayDeTriosLetras.splice(-5, 0, ' MIL ');

    return this.correcciones(arrayDeTriosLetras.join(''));
  }

  dividirEnTres(numero: string | undefined): string[] {
    if (!numero) return [];
    const reversedStr = numero.split('').reverse().join('');

    const array3en3 = reversedStr
      .match(/.{1,3}/g)!
      .map((chunk) => chunk.split('').reverse().join(''))
      .reverse();

    return array3en3;
  }

  tresNumeros(numero: string): string {
    if (numero === '100') return 'CIEN';
    const numeroLength = numero.length;
    const numeroDeconstruido: {
      unidades: string;
      decenas: string;
      centenas: string;
    } = {
      unidades: numero.charAt(numeroLength - 1),
      decenas: numero.charAt(numeroLength - 2),
      centenas: numero.charAt(numeroLength - 3),
    };
    let unidades: string = '',
      decenas: string = '',
      centenas: string = '';
    if (parseInt(numero.slice(-2)) < 20)
      decenas = this.ceroAlVeinte(parseInt(numero.slice(-2)));
    else {
      unidades = this.ceroAlVeinte(parseInt(numeroDeconstruido.unidades));
      decenas =
        unidades === ''
          ? this.decenas(numeroDeconstruido.decenas)
          : `${this.decenas(numeroDeconstruido.decenas)} Y ${unidades}`;
    }
    if (!!numeroDeconstruido.centenas)
      centenas = this.centenas(numeroDeconstruido.centenas);

    return `${centenas} ${decenas}`;
  }

  ceroAlVeinte(numero: number): string {
    let numeroLetras: string = 'ERROR';
    switch (numero) {
      case 0:
        numeroLetras = '';
        break;
      case 1:
        numeroLetras = 'UNO';
        break;
      case 2:
        numeroLetras = 'DOS';
        break;
      case 3:
        numeroLetras = 'TRES';
        break;
      case 4:
        numeroLetras = 'CUATRO';
        break;
      case 5:
        numeroLetras = 'CINCO';
        break;
      case 6:
        numeroLetras = 'SEIS';
        break;
      case 7:
        numeroLetras = 'SIETE';
        break;
      case 8:
        numeroLetras = 'OCHO';
        break;
      case 9:
        numeroLetras = 'NUEVE';
        break;
      case 10:
        numeroLetras = 'DIEZ';
        break;
      case 11:
        numeroLetras = 'ONCE';
        break;
      case 12:
        numeroLetras = 'DOCE';
        break;
      case 13:
        numeroLetras = 'TRECE';
        break;
      case 14:
        numeroLetras = 'CATORCE';
        break;
      case 15:
        numeroLetras = 'QUINCE';
        break;
      case 16:
        numeroLetras = 'DIECISEIS';
        break;
      case 17:
        numeroLetras = 'DIECISIETE';
        break;
      case 18:
        numeroLetras = 'DIECIOCHO';
        break;
      case 19:
        numeroLetras = 'DIECINUEVE';
        break;
      default:
        numeroLetras = '';
    }
    return numeroLetras;
  }

  decenas(numero: string): string {
    let decena: string = '';
    switch (numero) {
      case '2':
        decena = 'VEINTE';
        break;
      case '3':
        decena = 'TREINTA';
        break;
      case '4':
        decena = 'CUARENTA';
        break;
      case '5':
        decena = 'CINCUENTA';
        break;
      case '6':
        decena = 'SESENTA';
        break;
      case '7':
        decena = 'SETENTA';
        break;
      case '8':
        decena = 'OCHENTA';
        break;
      case '9':
        decena = 'NOVENTA';
        break;
      default:
        decena = '';
    }
    return decena;
  }

  centenas(numero: string): string {
    let centena: string = '';
    switch (numero) {
      case '1':
        centena = 'CIENTO';
        break;
      case '2':
        centena = 'DOSCIENTOS';
        break;
      case '3':
        centena = 'TRESCIENTOS';
        break;
      case '4':
        centena = 'CUATROCIENTOS';
        break;
      case '5':
        centena = 'QUINIENTOS';
        break;
      case '6':
        centena = 'SEISCIENTOS';
        break;
      case '7':
        centena = 'SETECIENTOS';
        break;
      case '8':
        centena = 'OCHOCIENTOS';
        break;
      case '9':
        centena = 'NOVECIENTOS';
        break;
      default:
        centena = '';
    }
    return centena;
  }

  correcciones(numeroCompleto: string): string {
    let numeroCorregido = numeroCompleto
      .replace(/\s+/g, ' ')
      .replaceAll('VEINTE Y ', 'VEINTI')
      .replaceAll('UNO MIL', 'UN MIL')
      .replaceAll('MILLONES MIL', 'MILLONES')
      .replaceAll('UN MILLONES', 'UN MILLON')
      .trim();

    return numeroCorregido;
  }
}
