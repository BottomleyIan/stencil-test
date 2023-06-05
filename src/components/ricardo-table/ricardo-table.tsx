import { Component, Prop, State, Host, Element, h } from '@stencil/core';

@Component({
  tag: 'ricardo-table',
  styleUrl: 'ricardo-table.css',
  shadow: false,
})
export class RicardoTable {
  @Prop() dataPath: string;
  @Prop() url: string;
  @Element() host: HTMLElement;

  @State() data: any;
  @State() mapped: any;
  @State() columns: any;

  async componentWillLoad() {
    try {
      const response = await getData(this.url);
      const parts = this.dataPath.split('.');
      let data = response;
      for (let i = 0; i < parts.length; i++) {
        if (!data) break;
        data = data[parts[i]];
      }
      console.log('data', data);
      this.data = data;
    } catch (e) {
      this.data = [];
    }
    console.log('slot', this.host);
    let slotted = this.host.querySelectorAll('ricardo-column') as NodeListOf<HTMLRicardoColumnElement>;
    const names = Array.from(slotted).map(el => el.name);
    const labels = Array.from(slotted).map(el => el.label);
    this.columns = names.map((name, i) => ({ name, label: labels[i] }));
    console.log(names);
    console.log(slotted);

    let mapped = this.data.map((row: any) => {
      console.log(row, name);
      return names.map(name => ({ name, value: row[name] ?? '' }));
    }, []);

    console.log(mapped);
  }

  private async getText(): Promise<string> {
    //const data = await getData(this.url);
    //console.log(data);
    return '';
  }

  render() {
    return (
      <div>
        <slot />
        <table>
          <thead>
            <tr>
              {this.columns.map((column: any) => (
                <th>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.data.map((row: any) => (
              <tr>
                {this.columns.map((column: any) => (
                  <td>{row[column.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
