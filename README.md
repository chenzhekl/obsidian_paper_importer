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

Press `Ctrl+P` in Obsidian, and select `Paper Importer: Import PDF from arXiv`. In the popup,
enter the arXiv ID or URL of the paper (e.g., `1703.06870` or `https://arxiv.org/abs/1703.06870`)
you would like to import. Press the enter key to confirm. The PDF and its metadata will then
be saved to selected folders. Those save destinations can be configured via the setting panel.

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
2. In the "Custom template file" field, specify the path to your template file (relative to vault root or absolute path)
3. Click "Create template file" to generate a file with the default template, or create your own template file
4. Edit the template file with your preferred text editor
5. Leave the field empty to use the default template

> [!Note]
> The template is not written in valid Obsidian markdown formats. Be sure to edit it in source mode
> if you would like to edit it in Obsidian.

## License

MIT
