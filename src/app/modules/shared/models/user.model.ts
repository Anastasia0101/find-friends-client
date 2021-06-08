import firebase from "firebase";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export interface UserJSON {
  email: string;
  nickname: string;
  isRegistrationFinished: boolean;
  authId: string
}

export class UserModel {
  static fromDocument(doc: DocumentSnapshot<UserJSON>): UserModel {
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
