export interface Reply {
  title: string;
  value: string;
  messageId?: string;
}

export interface QuickReplies {
  type: 'radio' | 'checkbox';
  values: Reply[];
  keepIt?: boolean;
}

export interface PostMessage {
  conversationId?: string;
  sender?: string | number;
  text?: string;
}

export interface Conversation {
  __v?: number;
  _id: string;
  createdAt: string;
  members: Array<string>;
  updatedAt: string;
}

export interface IMessage {
  _id?: string | number;
  text?: string;
  createdAt?: Date | number;
  user?: {
    _id?: number;
    name?: string;
  };
  image?: string;
  // avatar: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  conversationId?: string;
  quickReplies?: QuickReplies;
  sender?: string;
}
