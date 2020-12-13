import { Validators, FormBuilder } from '@angular/forms';

export const transactionForm = ( fb: FormBuilder) => {
  return fb.group({
    type: [ '', Validators.compose( [ Validators.required ] ) ],
    category: [ '', Validators.compose( [ Validators.required ] ) ],
    description: [ '', Validators.compose( [ Validators.required ] ) ],
    value: [ '', Validators.compose( [ Validators.required ] ) ],
    date: [ '', Validators.compose( [ Validators.required ] ) ],
    // type: [ '' ],
    // category: [ '' ],
    // description: [ ''  ],
    // value: [ '' ],
    // date: [ '' ],
  });
};
