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
  isRegistrationFinished: boolean;
  authId: string;
  avatarUrl: string;
  progress: RegistrationProgress;
}

export class UserModel {
  static fromDocument(doc: DocumentSnapshot<UserJSON>): UserModel {
    const data = doc.data()!;
    return new UserModel(
      doc.id,
      data.nickname,
<<<<<<< HEAD
      data.isRegistrationFinished,
      data.avatarUrl
=======
      data.progress
>>>>>>> 779749b6d374cf00155fd75aa90b193d961ef0af
    );
  }

  constructor(
    public readonly id: string,
    public readonly nickname: string,
<<<<<<< HEAD
    public readonly isRegistrationFinished: boolean,
    public readonly avatarUrl: string
=======
    public readonly progress: RegistrationProgress
>>>>>>> 779749b6d374cf00155fd75aa90b193d961ef0af
  ) {}

  get isRegistrationFinished() {
    return this.progress === RegistrationProgress.COMPLETED;
  }
}
