import { Configuration } from '@midwayjs/core';
import { join } from 'path';
import * as minIO from '../../../../src';

@Configuration({
  imports: [minIO],
  importConfigs: [join(__dirname, 'config')]
})
export class AutoConfiguration {
  async onReady(app) {
  }
}
