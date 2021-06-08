export class UserModel {
  constructor(
    public readonly id: string,
    public readonly nickname: string,
    public readonly isRegistrationFinished: boolean
  ) {}
}
