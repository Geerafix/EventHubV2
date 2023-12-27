export class Participant {
    constructor(
      private imie: string,
      private nazwisko: string,
      private wiek: number,
      private email: string,
      private nr_telefonu: number
    ) {}
  
    get _imie(): string {
      return this.imie;
    }
  
    set _imie(value: string) {
      this.imie = value;
    }
  
    get _nazwisko(): string | string {
      return this.nazwisko;
    }
  
    set _nazwisko(value: string) {
      this.nazwisko = value;
    }
  
    get _wiek(): number {
      return this.wiek;
    }
  
    set _wiek(value: number) {
      this.wiek = value;
    }
  
    get _email(): string | string {
      return this.email;
    }
  
    set _email(value: string) {
      this.email = value;
    }
  
    get _nr_telefonu(): number {
      return this.nr_telefonu;
    }
    
    set _nr_telefonu(value: number) {
      this.nr_telefonu = value;
    }
  }
  