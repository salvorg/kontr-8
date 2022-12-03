export interface Quote {
  author: string;
  category: string;
  text: string;
}

export interface QuoteMutation extends Quote {
  id: string;
}