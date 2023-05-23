import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dnn-progress-bar',
  styleUrl: 'dnn-progress-bar.scss',
  shadow: true,
})
export class DnnProgressBar {

  /** The percentage of completion. */
  @Prop() percentComplete: number;
  
  private progress: HTMLDivElement;

  componentDidLoad(){
    this.progress.style.width = `${this.percentComplete}%`;
  }

  componentWillUpdate(){
    this.progress.style.width = `${this.percentComplete}%`;
  }

  render() {
    return (
      <Host>
        <div class="container">
          <div class="progress" ref={el => this.progress = el}>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }

}
