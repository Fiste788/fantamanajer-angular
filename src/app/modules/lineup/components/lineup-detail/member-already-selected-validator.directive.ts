import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { Lineup } from '@shared/models';

@Directive({
  selector: '[fmMemberAlreadySelected]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MemberAlreadySelectedValidator, multi: true }]
})
export class MemberAlreadySelectedValidator implements Validator {
  @Input('fmMemberAlreadySelected') lineup: Lineup;

  validate(formGroup: FormGroup): ValidationErrors | null {
    const disp = formGroup.controls.dispositions as FormGroup;
    if (disp !== undefined) {
      const ids = Object.values(disp.controls)
        .filter((v: FormGroup) => v.controls)
        .map((v: FormGroup) => v.controls.member?.value?.id);
      const dup = ids.filter((item, index) => ids.indexOf(item) !== index);

      Object.values(disp.controls)
        .map((c: FormGroup) => {
          if (dup.includes(c.controls?.member?.value?.id)) {
            c.controls?.member?.setErrors({ duplicate: true });

            return { duplicate: true };
          }
          // tslint:disable-next-line: no-null-keyword
          c.controls?.member?.setErrors(null);

          // tslint:disable-next-line: no-null-keyword
          return null;
        });
    }

    // tslint:disable-next-line: no-null-keyword
    return null;
  }
}
