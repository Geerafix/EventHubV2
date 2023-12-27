export class Plan {
  constructor(
    private nazwa: string,
    private godz_rozpoczecia: Date | string,
    private godz_zakonczenia: Date | string
  ) {}

  get _nazwa(): string {
    return this.nazwa;
  }

  set _nazwa(value: string) {
    this.nazwa = value;
  }

  get _godz_rozpoczecia(): Date | string {
    return this.godz_rozpoczecia;
  }

  set _godz_rozpoczecia(value: Date | string) {
    this.godz_rozpoczecia = value;
  }

  get _godz_zakonczenia(): Date | string {
    return this.godz_zakonczenia;
  }

  set _godz_zakonczenia(value: Date | string) {
    this.godz_zakonczenia = value;
  }
}
