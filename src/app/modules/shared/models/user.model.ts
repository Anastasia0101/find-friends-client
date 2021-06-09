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
  name: string;
  nickname: string;
  isRegistrationFinished: boolean;
  authId: string;
  avatarUrl: string;
  progress: RegistrationProgress;
  country: string;
  interests: string[];
}

export class UserModel {
  static fromDocument(doc: DocumentSnapshot<UserJSON>): UserModel {
    const data = doc.data()!;
    return new UserModel(
      doc.id,
      data.nickname,
      data.name,
      data.avatarUrl,
      data.country,
      data.interests,
      data.progress
    );
  }

  static fromDocumentData(data: UserJSON & { id: string }): UserModel {
    return new UserModel(
      data.id,
      data.nickname,
      data.name,
      data.avatarUrl,
      data.country,
      data.interests,
      data.progress
    )
  }

  constructor(
    public readonly id: string,
    public readonly nickname: string,
    public readonly name: string,
    public readonly avatarUrl: string,
    public readonly country: string,
    public readonly interests: string[],
    public readonly progress: RegistrationProgress
  ) {}

  get isRegistrationFinished() {
    return this.progress === RegistrationProgress.COMPLETED;
  }
}
