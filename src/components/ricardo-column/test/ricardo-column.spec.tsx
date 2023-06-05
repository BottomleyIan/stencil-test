import { newSpecPage } from '@stencil/core/testing';
import { RicardoColumn } from '../ricardo-column';

describe('ricardo-column', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RicardoColumn],
      html: `<ricardo-column></ricardo-column>`,
    });
    expect(page.root).toEqualHtml(`
      <ricardo-column>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ricardo-column>
    `);
  });
});
