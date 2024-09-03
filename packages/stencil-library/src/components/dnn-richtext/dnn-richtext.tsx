import { Component, Host, h, Prop, Event, EventEmitter, Watch, AttachInternals } from '@stencil/core';
import { Jodit } from "jodit";
import type { Config } from "jodit/types/config";
import { decodeHtml } from '../../utilities/stringUtilities';

@Component({
  tag: 'dnn-richtext',
  styleUrl: 'dnn-richtext.scss',
  shadow: false,
  formAssociated: true,
})
export class DnnRichtext {
  /** Optional configuration for Jodit, see https://xdsoft.net/jodit/docs/classes/config.Config.html */
  @Prop() options: Config;
  private textArea: HTMLTextAreaElement;
  private editor: Jodit;
  private dnnDefaultOptions: Config = {
    ...Jodit.defaultOptions,
    useSplitMode: true,
  }

  /** Sets the value of the content of the editor. */
  @Prop() value: string;

  /** Name of the field when used in a form. */
  @Prop() name: string;
  
  @Watch("value")
  watchValueChanged(newValue: string) {
    if (this.editor !== null && this.editor !== undefined) {
      this.editor.value = decodeHtml(newValue);
    }
    this.setFormValue();
  }

  /** Fires when the value changed. */
  @Event() valueChange: EventEmitter<string>;

  /** Fires during value input. */
  @Event() valueInput: EventEmitter<string>;

  @AttachInternals() internals: ElementInternals;

  componentDidLoad(){
    var mergedOptions = {
      ...this.dnnDefaultOptions,
      ...this.options,
    };
    this.editor = Jodit.make(this.textArea, mergedOptions);
    this.editor.value = decodeHtml(this.value);
    this.setFormValue();
    this.editor.e.on('blur', () => {
      var value = this.editor.value;
      this.valueChange.emit(value);
      this.setFormValue();
    });
    this.editor.e.on('input', () => {
      var value = this.editor.value;
      return this.valueInput.emit(value);
    });
  }

  // eslint-disable-next-line @stencil-community/own-methods-must-be-private
  formResetCallback() {
    this.editor.value = decodeHtml(this.value);
    this.internals.setValidity({});
    this.setFormValue();
  }

  private setFormValue() {
    if (this.name != undefined && this.name.length > 0){
      var data = new FormData();
      data.append(this.name, this.editor.value);
      this.internals.setFormValue(data);
    }
  }

  render() {
    return (
      <Host>
        <textarea ref={el => this.textArea = el}>
        </textarea>
      </Host>
    );
  }

}
