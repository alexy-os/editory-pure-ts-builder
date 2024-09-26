# EditorY: Lightweight Rich Text Editor

Editory is a compact, customizable rich text editor that weighs only 18KB uncompressed. It's perfect for projects that require a lightweight yet powerful editing solution.

## Features

- Tiny footprint: Only 18KB uncompressed
- Customizable toolbar and bubble themes
- Extensive set of text editing tools
- Easy integration with HTML
- Flexible configuration options

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/editory.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Usage

Include the Editory script in your HTML file:

```html
<script src="path/to/editory.min.js"></script>
```

Create a container element for the editor:

```html
<div id="editory-container"></div>
```

Initialize the editor with a configuration:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  createEditor(editorConfig, 'editory-container');
});
```

## Configuration

Editory supports two main themes: `toolbar` and `bubble`. You can customize the available tools and their settings.

### Toolbar Theme

```javascript
const toolbarConfig = {
  editorSettings: {
    editorSettings: {
      theme: "toolbar",
      allowedTools: ["bold", "italic", "underline", "link", "heading", "list", "quote"],
      // Add more settings as needed
    }
  }
};
```

### Bubble Theme

```javascript
const bubbleConfig = {
  editorSettings: {
    editorSettings: {
      theme: "bubble",
      allowedTools: ["bold", "italic", "link", "heading"],
      // Add more settings as needed
    }
  }
};
```

### Customizing Tools

You can customize individual tools in the `toolSettings` object:

```javascript
toolSettings: {
  heading: {
    levels: [1, 2, 3],
    values: {
    h1: "Title 1",
    h2: "Title 2",
    h3: "Title 3"
    }
  },
  // Add more tool customizations
}
```

### Custom Icons

You can provide custom icons for tools:

```javascript
toolSettings: {
  bold: {
    icon: "<svg>...</svg>"
  }
}
```

## Building with Rollup

The project uses Rollup for bundling. To build the project:

1. Ensure you have all dependencies installed:
   ```
   npm install
   ```

2. Run the build script:
   ```
   npm run build
   ```

This will generate the bundled and minified version of Editory in the `dist` folder.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.