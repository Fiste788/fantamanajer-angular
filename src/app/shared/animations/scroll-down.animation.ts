import { animate, state, style, transition, trigger } from '@angular/animations';

import { VisibilityState } from '@app/enums';

export const scrollDownAnimation = trigger('scrollDownAnimation', [
  state(VisibilityState.Hidden, style({ opacity: 0, transform: 'translateY(100%)' })),
  state(VisibilityState.Visible, style({ opacity: 1, transform: 'translateY(0)' })),
  transition('* => *', animate('200ms ease-in')),
]);
