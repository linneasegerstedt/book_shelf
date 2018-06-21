export class Offer {
  type: string = 'percentage' || 'minus' || 'slice';
  value: number;
  sliceValue?: number;

  constructor(offer) {
    Object.assign(this, offer);
  }
}
