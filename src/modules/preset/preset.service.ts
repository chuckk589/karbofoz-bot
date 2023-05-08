import { RetrievePresetDto } from './dto/retrieve-preset.dto';
import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Preset } from '../mikroorm/entities/Preset';
import { CreatePresetDto } from './dto/create-preset.dto';
import puppeteer from 'puppeteer';
import puppeteerOptions from 'src/configs/puppeteer.config';
import { DeletePresetsDto } from './dto/delete-presets.dto';
import { UpdatePresetsDto } from './dto/update-presets.dto';
import { Input } from '../mikroorm/entities/Input';
import { Theme } from '../mikroorm/entities/Theme';
import { InputPreset } from '../mikroorm/entities/InputPreset';
import { Currency } from '../mikroorm/entities/Currency';
import { Network } from '../mikroorm/entities/Network';
import { Language } from '../mikroorm/entities/Language';
@Injectable()
export class PresetService {
  constructor(private readonly em: EntityManager) {}

  async bulkDeletePresets(body: DeletePresetsDto) {
    const presets = await this.em.find(Preset, { id: { $in: body.ids.map((id) => parseInt(id)) } });
    return await this.em.removeAndFlush(presets);
  }

  async generatePreview(body?: UpdatePresetsDto) {
    const queryString = Object.keys(body)
      .map((key) => `${key}=${body.fields[key]}`)
      .join('&');
    // const browser = await puppeteer.launch(puppeteerOptions);
    // const page = await browser.newPage();
    // await page.goto(`${process.env.NODE_ENV === 'dev' ? 'https://192.168.1.14:3001' : 'http://localhost:443'}/template?${queryString}`, { waitUntil: 'networkidle2' });
    // await page.setViewport({
    //   width: 2560,
    //   height: 1440,
    //   deviceScaleFactor: 1,
    // });
    // const img = await page.$('#main');
    // const screen = await img.screenshot({ path: 'example.png', encoding: 'base64' });
    // await browser.close();
    // return { screen };
    return { screen: 'example.png' };
  }

  async managePreset(body: CreatePresetDto) {
    const inputs = (await this.em.findOne(Theme, { id: parseInt(body.theme) }, { populate: ['themeInputs.input'] })).themeInputs.getItems().map((themeInput) => themeInput.input);
    if (body.preset.current === '0') {
      const preset = this.em.create(Preset, {
        name: body.preset.name || `Preset ${new Date().toLocaleString()}`,
        comment: body.preset.comment,
        currency: await this.em.findOneOrFail(Currency, { alias: body.currency }),
        network: await this.em.findOneOrFail(Network, { alias: body.network }),
        language: await this.em.findOneOrFail(Language, { alias: body.language }),
        theme: this.em.getReference(Theme, parseInt(body.theme)),
        inputPresets: Object.keys(body.fields).map((key) => {
          return this.em.create(InputPreset, {
            input: inputs.find((input) => input.alias == key),
            value: body.fields[key],
          });
        }),
      });
      return await this.em.persistAndFlush(preset);
    } else {
      const preset = await this.em.findOne(Preset, { id: parseInt(body.preset.current) }, { populate: ['inputPresets.input'] });
      preset.inputPresets.removeAll();
      Object.keys(body.fields).forEach((key) => {
        preset.inputPresets.add(
          this.em.create(InputPreset, {
            input: inputs.find((input) => input.alias == key),
            value: body.fields[key],
          }),
        );
      });
      return await this.em.persistAndFlush(preset);
    }
  }
  async getPresets(): Promise<RetrievePresetDto[]> {
    const presets = await this.em.find(Preset, {}, { populate: ['currency', 'network', 'language', 'theme.template.exchange', 'inputPresets.input'] });
    return presets.map((preset) => new RetrievePresetDto(preset));
  }
}
