import { Component, Host, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'ricardo-statistics',
  styleUrl: 'ricardo-statistics.css',
  shadow: false,
})
export class RicardoStatistics {
  @State() pollutant: string = 'NO';
  @State() year: number = new Date().getFullYear();
  @State() selectedUrl: string = '';
  @State() data: any = null;
  @State() loading: boolean = false;
  @Prop() url: string;

  componentWillLoad() {
    this.updateUrl();
  }

  async updateUrl() {
    this.selectedUrl = this.url.replace('{pollutant}', this.pollutant).replace('{year}', this.year.toString());
    try {
      this.loading = true;
      const response = await fetch(this.selectedUrl);
      this.data = await response.json();
      console.log('aaa', this.data);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log('aaa', error);
    }
  }

  handleYearChange(event: Event) {
    this.year = parseInt((event.target as HTMLInputElement).value);
    this.updateUrl();
  }

  handlePollutantChange(event: Event) {
    this.pollutant = (event.target as HTMLInputElement).value;
    this.updateUrl();
  }

  render() {
    return (
      <Host>
        <div>
          <select
            id="monitoring_site_statistics_statisticsYear"
            name="monitoring_site_statistics[statisticsYear]"
            onInput={event => this.handleYearChange(event)}
            class="form-control form-select"
          >
            {new Array(24)
              .fill(0)
              .map((_, index) => new Date().getFullYear() - index)
              .map(year => (
                <option value={year}>{year}</option>
              ))}
          </select>
          <select
            id="monitoring_site_statistics_statisticsParam"
            name="monitoring_site_statistics[statisticsParam]"
            onInput={event => this.handlePollutantChange(event)}
            class="form-control form-select"
          >
            <optgroup label="Automatic Urban Monitoring">
              <option selected={this.pollutant === 'NO'} value="NO">
                Nitric oxide
              </option>
              <option selected={this.pollutant === 'NO2'} value="NO2">
                Nitrogen dioxide
              </option>
              <option selected={this.pollutant === 'NOXasNO2'} value="NOXasNO2">
                Nitrogen oxides as nitrogen dioxide
              </option>
              <option selected={this.pollutant === 'GE10'} value="GE10">
                PM10 particulate matter (Grav Equiv)
              </option>
              <option selected={this.pollutant === 'NV10'} value="NV10">
                Non-volatile PM10
              </option>
              <option selected={this.pollutant === 'V10'} value="V10">
                Volatile PM10
              </option>
              <option selected={this.pollutant === 'PM25'} value="PM25">
                PM2.5 particulate matter
              </option>
              <option selected={this.pollutant === 'NV25'} value="NV25">
                Non-volatile PM2.5
              </option>
              <option selected={this.pollutant === 'V25'} value="V25">
                Volatile PM2.5
              </option>
            </optgroup>
          </select>
        </div>
        {this.loading ? <div>Loading...</div> : <div innerHTML={this?.data?.html ?? ''} />}
        <slot></slot>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5px' }}>
          <div>pollutant</div>
          <div>{this.pollutant}</div>
          <div>Year</div>
          <div>{this.year}</div>
          <div>selectedUrl</div>
          <div>{this.selectedUrl}</div>
          <div>url</div>
          <div>{this.url}</div>
          {this.loading ? 'true' : 'false'}
        </div>
      </Host>
    );
  }
}
