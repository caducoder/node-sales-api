import nodemailer from "nodemailer";
import MailTemplate from "./MailTemplate.js";

interface ITemplateVariable {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}
interface ISendMail {
  to: string;
  from?: string;
  subject: string;
  templateData: IParseMailTemplate;
}
export default class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail) {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const mailTemplate = new MailTemplate();

    const message = {
      from: from || "Equipe API Vendas <equipe@apivendas.com>",
      to,
      subject,
      html: await mailTemplate.parser(templateData),
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred: " + err.message);
        return process.exit(1);
      }

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  }
}
