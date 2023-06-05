import { newE2EPage } from '@stencil/core/testing';

describe('ricardo-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ricardo-table></ricardo-table>');

    const element = await page.find('ricardo-table');
    expect(element).toHaveClass('hydrated');
  });
});
