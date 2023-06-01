type PresetFields = {
  current: string;
  name?: string;
  comment?: string;
};

export class CreatePresetDto {
  theme: string;
  language: string;
  currency: string;
  network: string;
  direction: string;
  preset: PresetFields;
  fields: {
    [key: string]: string;
  };
  statusbar: {
    [key: string]: string;
  } & { show: boolean };
}
