import firebase from "firebase";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import Timestamp = firebase.firestore.Timestamp;

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
  dateOfBirth: Date;
  interests: string[];
}

interface Interest {
  name: string;
  isMatch: boolean;
}

export class UserModel {
  public interestsMatched: number = 0;

  constructor(
    public readonly id: string,
    public readonly nickname: string,
    public readonly name: string,
    public readonly email: string,
    public readonly avatarUrl: string,
    public readonly country: string,
    public readonly dateOfBirth: Date,
    public interests: Interest[],
    public readonly progress: RegistrationProgress
  ) {
  }

  public get isRegistrationFinished() {
    return this.progress === RegistrationProgress.COMPLETED;
  }

  static fromDocument(doc: DocumentSnapshot<UserJSON>): UserModel {
    return UserModel.fromDocumentData({
      ...doc.data()!,
      id: doc.id
    });
  }

  static fromDocumentData(data: UserJSON & { id: string }): UserModel {
    return new UserModel(
      data.id,
      data.nickname,
      data.name,
      data.email,
      data.avatarUrl,
      data.country,
      (data.dateOfBirth as unknown as Timestamp).toDate(),
      data.interests.map(name => ({name, isMatch: false})),
      data.progress
    )
  }

  public isInterestMatch(interest: Interest): boolean {
    const interestName = interest.name.toLowerCase();
    return this.interests.some(interest => interest.name.toLowerCase() === interestName);
  }

  public countInterestMatches(currentUser: UserModel): void {
    this.interests
      .filter(interest => currentUser.isInterestMatch(interest))
      .forEach(interest => {
        interest.isMatch = true;
        this.interestsMatched++;
      });
    this.interests = this.interests.sort((i1, i2) => {
      if (i1.isMatch === i2.isMatch) return 0;
      return i1.isMatch ? -1 : 1;
    });
  }
}
