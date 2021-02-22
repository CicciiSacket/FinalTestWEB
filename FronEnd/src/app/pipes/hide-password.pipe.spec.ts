import { HidePasswordPipe } from './hide-password.pipe';

describe('HidePasswordPipe', () => {
  it('create an instance', () => {
    const pipe = new HidePasswordPipe();
    expect(pipe).toBeTruthy();
  });
});
