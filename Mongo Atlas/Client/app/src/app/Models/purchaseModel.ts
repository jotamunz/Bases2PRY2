export interface Article {
  articleCode?: string;
  quantity?: number;
  unitPrice?: number;
  tax?: number;
  profit?: number;
}

export interface Purchase {
  clientCode?: string;
  articles?: Article[];
}