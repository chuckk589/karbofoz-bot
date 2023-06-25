import { RetrieveConfigInputDto } from './retrieve-config-input.dto';
import { Theme } from 'src/modules/mikroorm/entities/Theme';
import { RetrieveConfigDto } from './retrieve-config.dto';

export class RetrieveConfigThemeDto {
  constructor(theme: Theme) {
    this.title = theme.name;
    this.value = theme.id.toString();
    this.inputs = theme.themeInputs.getItems().map((themeInput) => new RetrieveConfigInputDto(themeInput));
    this.languages = theme.themeLanguages
      .getItems()
      .map((themeLanguage) => new RetrieveConfigDto({ title: themeLanguage.language.name, value: themeLanguage.language.alias }))
      .sort((a, b) => {
        //sort by prorities ru - uk - en - other
        if (a.value == 'ru') return -1;
        if (a.value == 'uk') return b.value == 'ru' ? 1 : -1;
        if (a.value == 'en') return b.value == 'ru' || b.value == 'uk' ? 1 : -1;
        return 1;
      });
    this.statusbar = theme.statusbar;
    this.alias = theme.alias;
  }
  title: string;
  value: string;
  statusbar: boolean;
  alias: string;
  inputs: RetrieveConfigInputDto[];
  languages: RetrieveConfigDto[];
}
