export interface Article {
  articleCode?: string;
  quantity?: number;
  unitPrice?: number;
}

export interface Purchase {
  clientCode?: string;
  currency?: number;
  tax?: number;
  articles?: Article[];
}