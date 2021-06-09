import firebase from "firebase";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export enum RegistrationProgress {
  START = 'start',
  WAIT_CONFIRMATION = 'wait-confirmation',
  USER_DETAILS = 'user-details',
  INTERESTS = 'interests',
  COMPLETED = 'completed'
}

export interface UserJSON {
  email: string;
  nickname: string;
  progress: RegistrationProgress;
  authId: string
}

export class UserModel {
  static fromDocument(doc: DocumentSnapshot<UserJSON>): UserModel {
    const data = doc.data()!;
    return new UserModel(
      doc.id,
      data.nickname,
      data.progress
    );
  }

  constructor(
    public readonly id: string,
    public readonly nickname: string,
    public readonly progress: RegistrationProgress
  ) {}

  get isRegistrationFinished() {
    return this.progress === RegistrationProgress.COMPLETED;
  }
}
