import { RetrievePresetDto } from './dto/retrieve-preset.dto';
import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Preset } from '../mikroorm/entities/Preset';
import { CreatePresetDto } from './dto/create-preset.dto';
import puppeteer from 'puppeteer';
import puppeteerOptions from 'src/configs/puppeteer.config';
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
  async remove(id: number) {
    const preset = await this.em.find(Preset, id, { populate: ['inputPresets'] });
    return await this.em.removeAndFlush(preset);
  }

  async generatePreview(body: UpdatePresetsDto) {
    const {
      fields = undefined,
      statusbar = undefined,
      _show = undefined,
      ...bodyFlat
    } = {
      ...body,
      ...body.fields,
      ...(body.statusbar.show
        ? Object.keys(body.statusbar).reduce((acc: any, sum) => {
            acc[`_${sum}`] = typeof body.statusbar[sum] == 'boolean' ? +body.statusbar[sum] : body.statusbar[sum];
            return acc;
          }, {})
        : {}),
    };
    console.log(_show);
    const queryString = new URLSearchParams(bodyFlat).toString();
    const browser = await puppeteer.launch(puppeteerOptions);
    const page = await browser.newPage();
    await page.goto(`${process.env.NODE_ENV === 'dev' ? 'https://192.168.1.14:3001' : 'http://localhost:443'}/template?${queryString}`, { waitUntil: 'networkidle2' });
    await page.setViewport({
      width: 2560,
      height: 1440,
      deviceScaleFactor: 1,
    });
    console.log(_show);
    const img = await page.$(_show === 1 ? '#main' : '#wobar');
    const screen = await img.screenshot({ path: 'example.png', encoding: 'base64' });
    await browser.close();
    return { screen };
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
      const preset = await this.em.findOneOrFail(Preset, { id: parseInt(body.preset.current) }, { populate: ['inputPresets.input'] });
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
  async getPresets() {
    const presets = await this.em.find(Preset, {}, { populate: ['currency', 'network', 'language', 'theme.exchange', 'inputPresets.input'] });
    return presets.map((preset) => new RetrievePresetDto(preset));
  }
}
