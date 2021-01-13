import { Component, OnInit } from '@angular/core';
import { Article, Purchase } from 'src/app/Models/purchaseModel';
import { PurchasesService } from '../../Services/purchases.service';



@Component({
  selector: 'app-adding-dashboard',
  templateUrl: './adding-dashboard.component.html',
  styleUrls: ['./adding-dashboard.component.css']
})
export class AddingDashboardComponent implements OnInit {
  public errors : String = "";
  public purchase : Purchase = {
    clientCode : "",
    currency : 1,
    tax : 0,
    articles : []
  };

  public article : Article = {
    articleCode : "",
    unitPrice : 0,
    quantity : 0
  }


  public currencies = [
    { value : 1, name: "Colones"},
    { value : 2, name: "Dollars"}
  ];

  constructor(
    private purchasesService : PurchasesService
  ) { 
  }

  ngOnInit(): void {
  }

  public submitArticle(){
    let temp : Article = JSON.parse(JSON.stringify(this.article));
    this.purchase.articles = this.purchase.articles?.concat(temp);
    this.resetArticle();
    
  }

  public deleteArticle(article : Article){
    this.purchase.articles?.forEach(element => {
      if(element.articleCode == article.articleCode){
        this.purchase.articles?.splice(this.purchase.articles.indexOf(element),1)
      }
      console.log(this.purchase.articles);
    });
  }

  public async onSubmit(): Promise<void> {
    
    if (this.purchase.tax != null){
      this.purchase.tax = this.purchase.tax/100
    }

    this.purchasesService.addPurchase(this.purchase).subscribe(
      (response: any) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
        this.errors = err.error.message
      }
    );
    this.resetPurchase();
  }

  private resetArticle(){
    this.article.articleCode = "";
    this.article.unitPrice = 0;
    this.article.quantity = 0;
  }

  private resetPurchase(){
    this.purchase = {
      clientCode : "",
      currency : 1,
      tax : 0,
      articles : []
    };
  }

}
