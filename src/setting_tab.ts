import {
	App,
	Notice,
	PluginSettingTab,
	Setting,
	normalizePath,
} from "obsidian";
import { DEFAULT_TEMPLATE } from "./default_template";
import PaperImporterPlugin from "./main";

const DEFAULT_TEMPLATE_FILE_PATH = "Templates/paper_importer_template.md";

export class PaperImporterSettingTab extends PluginSettingTab {
	plugin: PaperImporterPlugin;

	constructor(app: App, plugin: PaperImporterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("PDF folder")
			.setDesc("Folder to save imported PDFs")
			.addText((text) =>
				text
					.setPlaceholder("Example: Assets")
					.setValue(this.plugin.settings.pdfFolder)
					.onChange(async (value) => {
						this.plugin.settings.pdfFolder = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Note folder")
			.setDesc("Folder to save auto-generated notes for imported PDFs")
			.addText((text) =>
				text
					.setPlaceholder("Example: Notes")
					.setValue(this.plugin.settings.noteFolder)
					.onChange(async (value) => {
						this.plugin.settings.noteFolder = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Custom template file")
			.setDesc(
				`Path to a custom template file (relative to vault root). Leave empty to use the built-in template; click the button with an empty field to create one at ${DEFAULT_TEMPLATE_FILE_PATH}.`
			)
			.addText((text) =>
				text
					.setPlaceholder("Example: Templates/note_template.md")
					.setValue(this.plugin.settings.templateFilePath)
					.onChange(async (value) => {
						this.plugin.settings.templateFilePath = value;
						await this.plugin.saveSettings();
					})
			)
			.addButton((button) =>
				button
					.setButtonText("Create template file")
					.setTooltip(
						`Create a template file with the default template content (at ${DEFAULT_TEMPLATE_FILE_PATH} if the field is empty)`
					)
					.onClick(async () => {
						await this.createTemplateFile();
					})
			);
	}

	async createTemplateFile(): Promise<void> {
		try {
			const usingDefaultPath = !this.plugin.settings.templateFilePath.trim();
			const templatePath = normalizePath(
				usingDefaultPath
					? DEFAULT_TEMPLATE_FILE_PATH
					: this.plugin.settings.templateFilePath
			);

			// Check if file already exists
			const exists = await this.app.vault.adapter.exists(templatePath);
			if (exists) {
				if (usingDefaultPath) {
					await this.useTemplatePath(templatePath);
					new Notice(
						`Template file already exists, now using: ${templatePath}`
					);
				} else {
					new Notice("Template file already exists!");
				}
				return;
			}

			// Extract the directory path from the template file path
			const lastSlashIndex = templatePath.lastIndexOf("/");
			if (lastSlashIndex > 0) {
				const folderPath = templatePath.substring(0, lastSlashIndex);

				// Check if the folder exists, create it if it doesn't
				const folderExists = await this.app.vault.adapter.exists(
					folderPath
				);
				if (!folderExists) {
					await this.app.vault.createFolder(folderPath);
					new Notice(`Created folder: ${folderPath}`);
				}
			}

			// Create the file with default template content
			await this.app.vault.adapter.write(templatePath, DEFAULT_TEMPLATE);
			if (usingDefaultPath) {
				await this.useTemplatePath(templatePath);
			}
			new Notice(`Template file created: ${templatePath}`);
		} catch (error) {
			new Notice(`Failed to create template file: ${error.message}`);
		}
	}

	// Save the path to settings and refresh the tab so the input shows it
	async useTemplatePath(templatePath: string): Promise<void> {
		this.plugin.settings.templateFilePath = templatePath;
		await this.plugin.saveSettings();
		this.display();
	}
}
// Remember to rename these classes and interfaces!
export interface PaperImporterPluginSettings {
	pdfFolder: string;
	noteFolder: string;
	templateFilePath: string;
}
export const DEFAULT_SETTINGS: PaperImporterPluginSettings = {
	pdfFolder: "Assets",
	noteFolder: "Literature Notes",
	templateFilePath: "",
};
