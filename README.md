# Paper Importer

A plugin to help you import papers from arXiv into Obsidian.

## Installation

### Automatic

Enable community plugins in Obsidian and search for `Paper Importer`.

### Manual

Create a folder in `Your Vault/.obsidian/plugins/paper_importer`. Download `main.js`, `manifest.json`
and `styles.css` from the release page and put them in the folder you created. Enable community
plugins in Obsidian setting and that's it.

## How to Use

Press `Ctrl+P` in Obsidian to open the command palette, then choose one of the following options:

- **`Paper Importer: Import metadata and PDF from arXiv`** - Downloads both the paper's metadata and PDF file
- **`Paper Importer: Import metadata only from arXiv`** - Imports only the paper's metadata without downloading the PDF

In the popup, enter the arXiv ID or URL of the paper (e.g., `1703.06870` or `https://arxiv.org/abs/1703.06870`) you would like to import. Press the enter key to confirm. The metadata (and PDF if selected) will then be saved to your configured folders. Save destinations can be configured via the plugin settings panel.

## Template Customization

The plugin supports custom note templates for imported papers through external template files.

### Available Template Variables

- `{{ paper_id }}` - arXiv paper ID
- `{{ title }}` - Paper title
- `{{ authors }}` - List of authors
- `{{ date }}` - Publication date
- `{{ abstract }}` - Paper abstract
- `{{ comments }}` - Paper comments
- `{{ pdf_link }}` - Link to the downloaded PDF file

### How to Use Custom Templates

1. Go to Settings → Paper Importer
2. In the "Custom template file" field, specify the path to your template file (relative to vault root)
3. Click "Create template file" to generate a file with the default template at that path, or create your own template file. If the field is empty, the file is created at `Templates/paper_importer_template.md` and the path is filled in automatically
4. Edit the template file with your preferred text editor
5. Leave the field empty (without creating a file) to use the built-in default template

> [!Note]
> The template is not written in valid Obsidian markdown formats. Be sure to edit it in source mode
> if you would like to edit it in Obsidian.

## License

MIT
