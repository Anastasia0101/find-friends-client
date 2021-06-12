import firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;
import {UserJSON, UserModel} from "../../shared";

export interface MessageJSON {
  authorRef: DocumentReference<UserJSON>,
  text: string;
  createdAt: Date;
}

export class MessageModel {
  public author: UserModel | null = null;
  public isCurrentUserMessage: boolean = false;

  public static fromDocumentData(data: MessageJSON & { id: string }): MessageModel {
    return new MessageModel(
      data.id,
      data.authorRef,
      data.text,
      data.createdAt
    );
  }

  constructor(
    public readonly id: string,
    public readonly authorRef: DocumentReference<UserJSON>,
    public readonly text: string,
    public readonly createdAt: Date
  ) {}
}
