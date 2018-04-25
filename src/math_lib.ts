function div(a: number, b: number): number {
  if ( b == 0) {
    throw new Error('Division durch 0 nicht erlaubt!');
  }
  return a / b;
}
