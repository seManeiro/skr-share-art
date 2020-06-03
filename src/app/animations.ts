import { trigger, transition, style, animate } from '@angular/animations';

export let fade = trigger('fade', [
  transition(':enter', [style({ opacity: 0 }), animate(600)])
]);

export let slideFromR =
trigger('slideFromR', [
  transition(':enter', [
    style({ transform: 'translateX(1000px)',
            opacity: 0 }), animate('0.5s ease-out')])
]);

export let slideFromL =
trigger('slideFromL', [
  transition(':enter', [
    style({ transform: 'translateX(-1000px)',
            opacity: 0 }), animate('1s ease-out')])
]);
