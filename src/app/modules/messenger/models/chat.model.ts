import { UserModel } from "../../shared";
import firebase from "firebase";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export interface ChatJSON {
  authorUserId: string;
  targetUserId: string;
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
      data.authorUserId,
      data.targetUserId
    );
  }

  constructor(
    public readonly id: string,
    public readonly authorUserId: string,
    public readonly targetUserId: string,
    public receiver?: UserModel
  ) {}

  isUserMember(userId: string): boolean {
    return [this.authorUserId, this.targetUserId].includes(userId);
  }

  getReceiverId(currentUserId: string): string {
    return currentUserId === this.authorUserId ? this.targetUserId : this.authorUserId;
  }
}
