export interface Message {
    id: string;
    role: 'user' | 'model';
    content: string;
  }
  
  export interface ChatState {
    messages: Message[];
    isLoading: boolean;
  }