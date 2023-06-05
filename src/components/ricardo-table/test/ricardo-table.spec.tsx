import { newSpecPage } from '@stencil/core/testing';
import { RicardoTable } from '../ricardo-table';

describe('ricardo-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RicardoTable],
      html: `<ricardo-table></ricardo-table>`,
    });
    expect(page.root).toEqualHtml(`
      <ricardo-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ricardo-table>
    `);
  });
});
