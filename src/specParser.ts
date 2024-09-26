export interface ToolConfig {
  // Tool configuration interface
  name: string;
  settings?: {
    levels?: number[];
    types?: string[];
    commands?: Record<string, string>;
    enableTargetBlank?: boolean;
    resizable?: boolean;
    enableObjectResizing?: boolean;
  };
  command?: string;
  values?: Record<string, string>;
  icon?: string;
}

export interface EditorConfig {
  // Editor configuration interface
  defaultBlock: string;
  contentEditable: boolean;
  theme: string;
  classes: {
    actionbar: string;
    content: string;
    button: string;
    buttonSelect: string;
  };
  tools: ToolConfig[];
}

class SpecParser {
  private config: EditorConfig;

  constructor(spec: any) {
    this.config = this.parseSpec(spec);
  }

  private parseSpec(spec: any): EditorConfig {
    // Parse configuration from spec
    const editorSettings = spec?.editorSettings?.editorSettings || {};
    const tools: ToolConfig[] = (editorSettings.allowedTools || []).map((tool: string) => ({
      name: tool,
      settings: editorSettings.toolSettings?.[tool] || {},
      command: editorSettings.toolSettings?.[tool]?.command,
      values: editorSettings.toolSettings?.[tool]?.values,
      icon: editorSettings.toolSettings?.[tool]?.icon || this.getDefaultIcon(tool)
    }));

    return {
      defaultBlock: editorSettings.defaultBlock || 'p',
      contentEditable: editorSettings.contentEditable !== false,
      theme: editorSettings.theme || 'toolbar',
      classes: editorSettings.classes || {
        actionbar: 'editor-actionbar',
        content: 'editor-content',
        button: 'editor-button',
        buttonSelect: 'editor-button-select'
      },
      tools: tools
    };
  }

  // Get default icon for tool
  private getDefaultIcon(tool: string): string {
    const icons: Record<string, string> = {
      bold: '𝐁',
      italic: '𝐼',
      underline: '𝑈',
      strikethrough: '𝐒',
      superscript: 'ˣ',
      subscript: 'ₓ',
      link: '🔗',
      unlink: '🔓',
      heading: 'H',
      list: '•',
      quote: '❝',
      code: '⟨⟩',
      image: '🖼',
      alignment: '⇕',
      undo: '↶',
      redo: '↷',
      copy: '📄',
      cut: '✂',
      paste: '📋',
      selectAll: '◨',
      removeFormat: '✗',
      insertHorizontalRule: '―',
      insertLineBreak: '↵',
      insertOrderedList: '1.',
      insertUnorderedList: '•',
      insertHTML: '⟨/⟩',
      insertText: 'T',
      insertImage: '🖼',
      enableObjectResizing: '↔'
    };
    return icons[tool] || tool.charAt(0).toUpperCase();
  }

  public getConfig(): EditorConfig {
    return this.config;
  }
}

export default SpecParser;