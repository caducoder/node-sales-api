import fs from "fs";
import handlebars from "handlebars";
import { fileURLToPath } from "url";
import mjml2html from "mjml";
import { resolve, dirname } from "path";

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export default class MailTemplate {
  public async parser({ template, variables }: IParseMailTemplate) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const mjml = fs.readFileSync(
      resolve(__dirname, `templates/${template}.mjml`),
      "utf-8"
    );
    const parseTemplate = handlebars.compile(mjml);
    const { html } = mjml2html(parseTemplate(variables));
    return html;
  }
}
