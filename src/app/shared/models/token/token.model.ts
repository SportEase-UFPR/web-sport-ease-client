export class Token {
  constructor(
    public exp?: number,
    public iss?: string,
    public sub?: string,
    public userProfile?: string
  ) {}
}
