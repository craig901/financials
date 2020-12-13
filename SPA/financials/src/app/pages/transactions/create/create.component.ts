import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionService} from "../../../shared/services/api/transaction.service";
import {transactionForm} from "../../../shared/forms/transaction";
import {ISubmitTransaction} from "../../../shared/models/viewModels/ISubmitTransaction";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  viewModel$: Observable<ISubmitTransaction>;
  form: FormGroup;
  saveSubscription: Subscription;
  processing: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: TransactionService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = transactionForm( this.fb );
    this.viewModel$ = this.service.getSubmit();
  }

  ngOnDestroy(): void {
    if( this.saveSubscription ) {
      this.saveSubscription.unsubscribe();
    }
  }

  submit() {
    if( this.form.invalid ) {
      return false;
    }
    this.processing = true;
    this.saveSubscription = this.service.postSubmit( this.form.value )
      .subscribe( res => {
          this.snackBar.open('Transaction submitted', 'success', {
            duration: 3000
          });
          this.router.navigateByUrl( 'transactions' );
        },
        error => {
          console.log( error );
          this.snackBar.open( error, 'error', {
            duration: 3000
          });
        }
      );
  }
}
