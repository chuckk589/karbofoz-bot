import { Theme } from 'src/modules/mikroorm/entities/Theme';
import { RetrieveInputDto } from './retrieve-input.dto';
import { RetrieveConfigDto } from 'src/modules/config/dto/retrieve-config.dto';

export class RetrieveThemeDto {
  constructor(theme: Theme) {
    this.title = theme.name;
    this.value = theme.id.toString();
    this.inputs = theme.themeInputs.getItems().map((themeInput) => new RetrieveInputDto(themeInput.input));
    this.languages = theme.themeLanguages.getItems().map((themeLanguage) => new RetrieveConfigDto({ title: themeLanguage.language.name, value: themeLanguage.language.id.toString() }));
  }
  title: string;
  value: string;
  inputs: RetrieveInputDto[];
  languages: RetrieveConfigDto[];
}
