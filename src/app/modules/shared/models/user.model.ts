import firebase from "firebase";

export interface UserJSON {
  nickname: string;
  isRegistrationFinished: boolean;
}

export class UserModel {
  static fromDocument(doc: firebase.firestore.DocumentSnapshot<UserJSON>): UserModel {
    const data = doc.data()!;
    return new UserModel(
      doc.id,
      data.nickname,
      data.isRegistrationFinished
    );
  }

  constructor(
    public readonly id: string,
    public readonly nickname: string,
    public readonly isRegistrationFinished: boolean
  ) {}
}
