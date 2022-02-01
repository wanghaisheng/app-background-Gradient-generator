import CoreView from "../core-view";
import template from "./text-input.template";
import PrevGradient from "../PrevGradient";
import { IStore } from "../../store";
import { saveStoreData } from '../../utils/localSaver'

class TextInput extends CoreView {
  private _data: IStore;
  constructor(container: string, data: IStore) {
    super(container, template(data));

    this._data = data;
  }
  
  private initialize() {
    const textInputEl = document.querySelector<HTMLInputElement>('#input-text')

    if(this._data.textData.textValue && textInputEl) {
      textInputEl.value = this._data.textData.textValue;
    }
  }

  private onChangeText = (event: Event) => {
    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    const textValue = (event.target as HTMLInputElement).value;

    this._data.textData = { ...this._data.textData , textValue };
    prevGradient.render();
    saveStoreData(this._data);
  }

  public attachEventHandler = () => {
    const textInputEl = document.querySelector<HTMLInputElement>('#text-input');

    textInputEl?.addEventListener('input', this.onChangeText)
  }

  render = (appendChild: boolean) => {
    const container = document.querySelector(this._container);

    if (appendChild) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = template(this._data);
      container?.appendChild(divFragment.children[0]);
    } else {
      if (container) {
        container.innerHTML = template(this._data);
      }
    }

    this.initialize()
  }
}

export default TextInput
