import { newE2EPage } from '@stencil/core/testing';

describe('ricardo-column', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ricardo-column></ricardo-column>');

    const element = await page.find('ricardo-column');
    expect(element).toHaveClass('hydrated');
  });
});
