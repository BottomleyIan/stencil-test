import { newSpecPage } from '@stencil/core/testing';
import { RicardoStatistics } from '../ricardo-statistics';

describe('ricardo-statistics', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RicardoStatistics],
      html: `<ricardo-statistics></ricardo-statistics>`,
    });
    expect(page.root).toEqualHtml(`
      <ricardo-statistics>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ricardo-statistics>
    `);
  });
});
