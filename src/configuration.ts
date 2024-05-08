import { Configuration } from '@midwayjs/core';
import { MinIOServiceFactory } from './manager';

@Configuration({
  namespace: 'minIO',
  importConfigs: [
    {
      default: {
        minIO: {},
      },
    },
  ],
})
export class MinIOConfiguration {
  async onReady(container) {
    await container.getAsync(MinIOServiceFactory);
  }
}
