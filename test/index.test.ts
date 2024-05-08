import { createLightApp } from '@midwayjs/mock';
import * as minIO from '../src';
import { join } from 'path';

describe('/test/index.test.ts', () => {
  it('test component', async () => {
    const app = await createLightApp(join(__dirname, './fixtures/single-client'), {
      imports: [
        minIO
      ]
    });
    const minIOService = await app.getApplicationContext().getAsync(minIO.MinIOService);
    expect((await minIOService.listBuckets()).length).toEqual(339);
  });
});
