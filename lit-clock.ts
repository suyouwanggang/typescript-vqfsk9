import { html, render } from "lit-html";
import { LitElement, property, css, svg, customElement } from "lit-element";
const minuteTicks = () => {
  let sub = [];
  for (let i = 0, j = 60; i < j; i++) {
    sub.push(
      svg`<line class='minor' y1='42' y2='45' transform='rotate(${(360 * i) /
        60})'/>`
    );
  }
  return sub;
};

const hourTicks = () => {
  let sub = [];
  for (var i = 0, j = 12; i < j; i++) {
    sub.push(
      svg`<line class='major' y1='32' y2='45' transform='rotate(${(360 * i) /
        12})'/>`
    );
  }
  return sub;
};

@customElement("lit-clock")
export default class LitClock extends LitElement {
  @property()
  private date: Date = new Date();

  constructor() {
    super();
  }
  private _timeID: number;
  firstUpdated(map) {
    super.firstUpdated(map);
    this._timeID = setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        .clock-face {
          stroke: #333;
          fill: white;
        }

        .minor {
          stroke: #999;
          stroke-width: 0.5;
        }

        .major {
          stroke: #333;
        }

        .hour {
          stroke: #333;
        }

        .minute {
          stroke: #666;
        }

        .second,
        .second-counterweight {
          stroke: rgb(180, 0, 0);
        }

        .second-counterweight {
          stroke-width: 3;
        }
      `
    ];
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timeID);
  }
  render() {
    return html`
      <svg viewBox="0 0 100 100">
        <g transform="translate(50,50)">
          <circle class="clock-face" r="48" />
          ${minuteTicks()} ${hourTicks()}

          <line
            class="hour"
            y1="2"
            y2="-20"
            transform="rotate(${30 * this.date.getHours() +
              this.date.getMinutes() / 2})"
          />

          <line
            class="minute"
            y1="4"
            y2="-30"
            transform="rotate(${6 * this.date.getMinutes() +
              this.date.getSeconds() / 10})"
          />

          <g transform="rotate(${6 * this.date.getSeconds()})">
            <line class="second" y1="10" y2="-38" />
            <line class="second-counterweight" y1="10" y2="2" />
          </g>
        </g>
      </svg>
    `;
  }
}
