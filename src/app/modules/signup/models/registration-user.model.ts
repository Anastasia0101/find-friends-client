export class RegistrationUserModel {
  constructor(
    public name: string,
    public nickname: string,
    public email: string,
    public password: string,
    public dateOfBirth: string,
    public country: string,
    public sentenceAboutUser: string
  ) {}
}
