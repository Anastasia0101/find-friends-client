import { UserModel } from "../../shared";
import firebase from "firebase";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import DocumentReference = firebase.firestore.DocumentReference;

export interface ChatJSON {
  members: DocumentReference[];
}

export interface FullChatJSON extends ChatJSON {
  id: string;
}

export class ChatModel {
  static fromDocument(doc: DocumentSnapshot<ChatJSON>): ChatModel {
    return ChatModel.fromDocumentData({
      ...doc.data()!,
      id: doc.id
    })
  }

  static fromDocumentData(data: ChatJSON & { id: string }): ChatModel {
    return new ChatModel(
      data.id,
      data.members
    );
  }

  constructor(
    public readonly id: string,
    public readonly members: DocumentReference[],
    public receiver?: UserModel
  ) {}

  getReceiverId(currentUserId: string): string {
    const [user1, user2] = this.members;
    return currentUserId === user1.id ? user2.id : user1.id;
  }
}
