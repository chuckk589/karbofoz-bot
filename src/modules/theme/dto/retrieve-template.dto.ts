import { RetrieveThemeDto } from './retrieve-theme.dto';
import { Template } from 'src/modules/mikroorm/entities/Template';

export class RetrieveTemplateDto {
  constructor(template: Template) {
    this.title = template.exchange.name;
    this.value = template.id.toString();
    this.themes = template.themes.getItems().map((theme) => new RetrieveThemeDto(theme));
  }
  title: string;
  value: string;
  themes: RetrieveThemeDto[];
}
