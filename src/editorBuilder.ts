import SpecParser, { ToolConfig, EditorConfig } from './specParser';

class EditorBuilder {
  private config: EditorConfig;
  private element: HTMLElement;
  private id: string;

  constructor(spec: any, element: HTMLElement) {
    const parser = new SpecParser(spec);
    this.config = parser.getConfig();
    this.element = element;
    this.id = `editor-${Math.random().toString(36).substr(2, 9)}`;
    this.element.dataset.editorId = this.id;
    this.init();
  }

  private init(): void {
    // Initialize editor components
    this.createActionbar();
    this.createContent();
    this.attachEventListeners();
    this.applyTheme();
  }

  private createActionbar(): void {
    // Create toolbar or bubble menu
    const actionbar = document.createElement('div');
    actionbar.className = `${this.config.classes.actionbar} ${this.config.theme}-actionbar`;
    actionbar.dataset.editorId = this.id;

    this.config.tools.forEach((tool: ToolConfig) => {
      // Create buttons for each tool
      const button = document.createElement('button');
      button.className = this.config.classes.button;
      button.dataset.action = tool.name;
      button.innerHTML = tool.icon || tool.name;
      button.title = tool.name;
      actionbar.appendChild(button);
    });

    this.element.appendChild(actionbar);
  }

  private createContent(): void {
    // Create editable content area
    const content = document.createElement('div');
    content.className = this.config.classes.content;
    content.contentEditable = this.config.contentEditable.toString();
    content.innerHTML = `<${this.config.defaultBlock}><br></${this.config.defaultBlock}>`;
    this.element.appendChild(content);
  }

  private attachEventListeners(): void {
    // Attach click listeners to buttons
    const buttons = this.element.querySelectorAll(`.${this.config.classes.button}`);
    buttons.forEach((button) => {
      button.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        const action = target.dataset.action;
        if (action) {
          this.executeAction(action);
        }
      });
    });

    // Add bubble toolbar listener
    if (this.config.theme === 'bubble') {
      const content = this.element.querySelector(`.${this.config.classes.content}`);
      if (content) {
        content.addEventListener('mouseup', this.showBubbleToolbar.bind(this));
      }
    }
  }

  private executeAction(action: string): void {
    // Execute corresponding action
    const tool = this.config.tools.find(t => t.name === action);
    if (!tool) return;

    switch (action) {
      case 'bold':
      case 'italic':
      case 'underline':
      case 'strikethrough':
      case 'superscript':
      case 'subscript':
        document.execCommand(action, false);
        break;
      case 'heading':
        this.formatHeading(tool);
        break;
      case 'link':
        this.createLink(tool);
        break;
      case 'unlink':
        document.execCommand('unlink', false);
        break;
      case 'list':
        this.createList(tool);
        break;
      case 'quote':
        document.execCommand('formatBlock', false, 'blockquote');
        break;
      case 'image':
        this.insertImage(tool);
        break;
      case 'code':
        document.execCommand('formatBlock', false, 'pre');
        break;
      case 'alignment':
        this.alignText(tool);
        break;
      case 'undo':
      case 'redo':
      case 'copy':
      case 'cut':
      case 'paste':
      case 'selectAll':
      case 'removeFormat':
      case 'insertHorizontalRule':
      case 'insertLineBreak':
      case 'insertOrderedList':
      case 'insertUnorderedList':
      case 'insertHTML':
      case 'insertText':
      case 'insertImage':
        document.execCommand(action, false);
        break;
      case 'enableObjectResizing':
        this.toggleObjectResizing(tool);
        break;
    }
  }

  private formatHeading(tool: ToolConfig): void {
    const levels = tool.settings?.levels || [1, 2, 3, 4, 5, 6];
    const level = prompt(`Enter heading level (${levels.join(', ')}):`, '2');
    if (level && levels.includes(Number(level))) {
      document.execCommand('formatBlock', false, `h${level}`);
    }
  }

  private createLink(tool: ToolConfig): void {
    const url = prompt('Enter the URL:');
    if (url) {
      const targetBlank = tool.settings?.enableTargetBlank;
      if (targetBlank) {
        document.execCommand('createLink', false, url);
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const link = range.commonAncestorContainer.parentElement;
          if (link && link.tagName === 'A') {
            link.setAttribute('target', '_blank');
          }
        }
      } else {
        document.execCommand('createLink', false, url);
      }
    }
  }

  private createList(tool: ToolConfig): void {
    const types = tool.settings?.types || ['ordered', 'unordered'];
    const type = prompt(`Enter list type (${types.join(', ')}):`, 'unordered');
    if (type === 'ordered') {
      document.execCommand('insertOrderedList', false);
    } else if (type === 'unordered') {
      document.execCommand('insertUnorderedList', false);
    }
  }

  private insertImage(tool: ToolConfig): void {
    const url = prompt('Enter image URL:');
    if (url) {
      document.execCommand('insertImage', false, url);
      const resizable = tool.settings?.resizable;
      if (resizable) {
        const images = this.element.querySelectorAll('img');
        const lastImage = images[images.length - 1];
        if (lastImage) {
          lastImage.style.resize = 'both';
          lastImage.style.overflow = 'auto';
        }
      }
    }
  }

  private toggleObjectResizing(tool: ToolConfig): void {
    const enable = tool.settings?.enableObjectResizing ?? true;
    document.execCommand('enableObjectResizing', false, String(enable));
  }

  private alignText(tool: ToolConfig): void {
    const alignments = tool.settings?.commands || {
      left: 'justifyLeft',
      center: 'justifyCenter',
      right: 'justifyRight',
      full: 'justifyFull'
    };

    const alignment = prompt(`Choose alignment: ${Object.keys(alignments).join(', ')}`);
    if (alignment && alignment in alignments) {
      document.execCommand(alignments[alignment], false);
    }
  }

  private applyTheme(): void {
    this.element.classList.add(`editor-theme-${this.config.theme}`);
  }

  private showBubbleToolbar(): void {
    // Show/hide bubble toolbar based on selection
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const toolbar = this.element.querySelector(`.bubble-actionbar[data-editor-id="${this.id}"]`) as HTMLElement;
      if (toolbar) {
        // Position bubble toolbar
        toolbar.style.top = `${rect.top - toolbar.offsetHeight - 10}px`;
        toolbar.style.left = `${rect.left + (rect.width / 2) - (toolbar.offsetWidth / 2)}px`;
        toolbar.classList.add('active');
      }
    } else {
      const bubbleToolbar = this.element.querySelector(`.bubble-actionbar[data-editor-id="${this.id}"]`);
      if (bubbleToolbar) {
        bubbleToolbar.classList.remove('active');
      }
    }
  }
}

export default EditorBuilder;