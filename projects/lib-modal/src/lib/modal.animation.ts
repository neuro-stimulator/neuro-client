import { animate, state, style, transition, trigger } from '@angular/animations';

export const animation = trigger('modalAnimation', [
  state('open', style({
    display: 'block',
    opacity: 1,
    transform: 'scale(1)'
  })),
  transition('close => open', [
    style({
      display: 'block',
      opacity: 0,
      transform: 'scale(0.8)'
    }),
    animate(300)
  ]),
  transition('open => close', [
    animate(300, style({
      transform: 'scale(0.8)',
      opacity: 0,
    }))
  ])
]);
