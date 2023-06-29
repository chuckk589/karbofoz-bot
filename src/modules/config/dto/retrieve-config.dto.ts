export class RetrieveConfigDto {
  constructor(init?: Partial<RetrieveConfigDto>) {
    Object.assign(this, init);
  }
  title: string; //name of config
  value: string; //id of config
  comment?: string;
  dependsOn?: string;
}
