import { Component, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Prop() dataPath: string;
  @Prop() url: string;

  @State() data: any;

  async componentWillLoad() {
    console.log(this.url);
    const response = await getData(this.url);
    const parts = this.dataPath.split('.');
    let data = response;
    for (let i = 0; i < parts.length; i++) {
      if (!data) break;
      data = data[parts[i]];
    }
    console.log('data', data);
    this.data = data;
  }

  private async getText(): Promise<string> {
    //const data = await getData(this.url);
    //console.log(data);
    return '';
  }

  render() {
    return (
      <div>
        Hello, World! I'm {this.getText()}
        <pre>{JSON.stringify(this.data, null, 2)}</pre>
      </div>
    );
  }
}

async function getData(url: string): Promise<any> {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
