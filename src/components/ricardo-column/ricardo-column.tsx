import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'ricardo-column',
  styleUrl: 'ricardo-column.css',
  shadow: true,
})
export class RicardoColumn {
  @Prop() name: string;
  @Prop() label: string;
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
