import EditorBuilder from './editorBuilder';

function createEditor(spec: any, elementId: string) {
  console.log(`Creating editor for element with id: ${elementId}`);
  const editorElement = document.getElementById(elementId);
  if (editorElement instanceof HTMLElement) {
    console.log(`Element found, creating EditorBuilder`);
    new EditorBuilder(spec, editorElement);
  } else {
    console.error(`Editor element with id '${elementId}' not found`);
  }
}

// Example configurations
const toolbar = {
  "editorSettings": {
    "editorSettings": {
      "defaultBlock": "p",
      "contentEditable": true,
      "theme": "toolbar", // toolbar или bubble
      "classes": {
        "actionbar": "editor-actionbar",
        "content": "editor-content",
        "button": "editor-button",
        "buttonSelect": "editor-button-select"
      },
      "allowedTools": [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "superscript",
        "subscript",
        "link",
        "unlink",
        "heading",
        "list",
        "quote",
        "code",
        "image",
        "alignment",
        "undo",
        "redo",
        //"copy",
        //"cut",
        //"paste",
        "selectAll",
        "removeFormat",
        "insertHorizontalRule",
        "insertLineBreak",
        //"insertOrderedList",
        //"insertUnorderedList",
        //"insertHTML",
        //"insertText",
        //"insertImage",
        //"enableObjectResizing"
      ],
      "toolSettings": {
        "heading": {
          "levels": [1, 2, 3, 4, 5, 6],
          "command": "formatBlock",
          "values": {
            "h1": "Title 1",
            "h2": "Title 2",
            "h3": "Title 3",
            "h4": "Title 4",
            "h5": "Title 5",
            "h6": "Title 6"
          }
        },
        "list": {
          "types": ["ordered", "unordered"],
          "commands": {
            "ordered": "insertOrderedList",
            "unordered": "insertUnorderedList"
          }
        },
        "alignment": {
          "commands": {
            "left": "justifyLeft",
            "center": "justifyCenter",
            "right": "justifyRight",
            "full": "justifyFull"
          }
        },
        "link": {
          "command": "createLink",
          "settings": {
            "enableTargetBlank": true,
            "unlinkCommand": "unlink"
          }
        },
        "image": {
          "command": "insertImage",
          "uploadURL": "/upload",
          "resizable": true
        },
        "code": {
          "command": "formatBlock",
          "values": {
            "pre": "code"
          }
        },
        "blockquote": {
          "command": "formatBlock",
          "values": {
            "blockquote": "quote"
          }
        },
        "basicActions": {
          "commands": {
            "copy": "copy",
            "cut": "cut",
            "paste": "paste",
            "selectAll": "selectAll",
            "removeFormat": "removeFormat"
          }
        },
        "undoRedo": {
          "commands": {
            "undo": "undo",
            "redo": "redo"
          }
        },
        "lines": {
          "commands": {
            "insertHorizontalRule": "insertHorizontalRule",
            "insertLineBreak": "insertLineBreak"
          }
        },
        "insert": {
          "commands": {
            "html": "insertHTML",
            "text": "insertText",
            "image": "insertImage"
          }
        },
        "objectResizing": {
          "command": "enableObjectResizing",
          "values": {
            "enable": true,
            "disable": false
          }
        },
        /*"bold": { // example of adding a custom icon to a tool
          "icon": "<svg>...</svg>"
        }*/
      }
    }
  }
};

// Example 2:
const bubble = {
  "editorSettings": {
    "editorSettings": {
      "defaultBlock": "p",
      "contentEditable": true,
      "theme": "bubble", // toolbar или bubble
      "classes": {
        "actionbar": "editor-actionbar",
        "content": "editor-content",
        "button": "editor-button",
        "buttonSelect": "editor-button-select"
      },
      "allowedTools": [
        "bold",
        "italic",
        "underline",
        "link",
        "heading",
        "quote",
        "alignment",
        "undo",
        "redo",
      ],
      "toolSettings": {
        "heading": {
          "levels": [1, 2, 3, 4],
          "command": "formatBlock",
          "values": {
            "h1": "Title 1",
            "h2": "Title 2",
            "h3": "Title 3",
            "h4": "Title 4"
          }
        },
        "alignment": {
          "commands": {
            "left": "justifyLeft",
            "center": "justifyCenter",
            "right": "justifyRight",
            "full": "justifyFull"
          }
        },
        "link": {
          "command": "createLink",
          "settings": {
            "enableTargetBlank": true,
            "unlinkCommand": "unlink"
          }
        },
        "blockquote": {
          "command": "formatBlock",
          "values": {
            "blockquote": "quote"
          }
        },
        "undoRedo": {
          "commands": {
            "undo": "undo",
            "redo": "redo"
          }
        },
      }
    }
  }
};

// Initialize editors on DOM load
document.addEventListener('DOMContentLoaded', () => {
  createEditor(toolbar, 'editory-toolbar');
  createEditor(bubble, 'editory');
});