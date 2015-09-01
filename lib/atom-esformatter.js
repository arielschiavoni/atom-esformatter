'use babel';
import AtomEsformatterView from './atom-esformatter-view';
import { CompositeDisposable } from 'atom';

export default {
  atomEsformatterView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomEsformatterView = new AtomEsformatterView(state.atomEsformatterViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomEsformatterView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-esformatter:toggle': () => this.toggle()
    }));
  },

  deactivate(state) {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomEsformatterView.destroy();
  },

  serialize() {
    return {
      atomEsformatterViewState: this.atomEsformatterView.serialize()
    };
  },

  toggle() {
    console.log('AtomEsformatter was toggled!');

    if (this.modalPanel.isVisible())
      this.modalPanel.hide()
    else
      this.modalPanel.show()
  }
}
