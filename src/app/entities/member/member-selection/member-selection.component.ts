import { Component, forwardRef, Output, Input, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MemberSelectionComponent),
  multi: true
};
import { Member } from '../member';
import { MatSelectChange } from '@angular/material/select';
import { Role } from '../../role/role';

@Component({
  selector: 'fm-member-selection',
  templateUrl: './member-selection.component.html',
  styleUrls: ['./member-selection.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class MemberSelectionComponent implements ControlValueAccessor, OnInit {

  @Input('value') val: Member;
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() placeholder: string;
  @Input() memberList: Member[] = [];
  @Input() memberMap: Map<string, Member[]>;
  @Input() size = 100;
  public roles: string[] = [];
  @Input() public isMemberDisabled: Function;
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.memberMap) {
      this.memberMap.forEach((value, role) => this.roles.push(role));
    }
  }

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
    this.cd.detectChanges();
  }

  change(event) {
    this.selectionChange.emit(event);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    this.value = value;
  }

  setDisabledState?(isDisabled: boolean): void;

}
