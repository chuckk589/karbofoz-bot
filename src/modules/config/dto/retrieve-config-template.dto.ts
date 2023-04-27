import { RetrieveConfigThemeDto } from './retrieve-config-theme.dto';
import { Template } from 'src/modules/mikroorm/entities/Template';

export class RetrieveConfigTemplateDto {
  constructor(template: Template) {
    this.title = template.exchange.name;
    this.value = template.id.toString();
    this.themes = template.themes.getItems().map((theme) => new RetrieveConfigThemeDto(theme));
  }
  title: string;
  value: string;
  themes: RetrieveConfigThemeDto[];
}
