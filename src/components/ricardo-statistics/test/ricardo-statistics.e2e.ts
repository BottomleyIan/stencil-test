import { newE2EPage } from '@stencil/core/testing';

describe('ricardo-statistics', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ricardo-statistics></ricardo-statistics>');

    const element = await page.find('ricardo-statistics');
    expect(element).toHaveClass('hydrated');
  });
});
