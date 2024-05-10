/*
 * @Date: 2024-05-10 12:13:58
 * @Author: 枫
 * @LastEditors: 枫
 * @description: description
 * @LastEditTime: 2024-05-10 23:22:18
 */
import { createLightApp } from '@midwayjs/mock';
import * as minIO from '../src';
import { join } from 'path';

describe('/test/index.test.ts', () => {
  it('single bucket', async () => {
    const app = await createLightApp(join(__dirname, './fixtures/single-client'), {
      imports: [
        minIO
      ]
    });
    const minIOService = await app.getApplicationContext().getAsync(minIO.MinIOService);

    expect((await minIOService.listBuckets()).length).toEqual(469);
  });

  it('multi bucket', async () => {
    const app = await await createLightApp(join(__dirname, './fixtures/multi-client'), {
      imports: [
        minIO
      ]
    });
    const ossServiceFactory = await app.getApplicationContext().getAsync<minIO.MinIOServiceFactory>(minIO.MinIOServiceFactory);
    const bucket1 = ossServiceFactory.get('bucket1');
    const bucket2 = ossServiceFactory.get('bucket2');

    expect((await bucket1.listBuckets()).length).toEqual(469);
    expect((await bucket2.listBuckets()).length).toEqual(469);
  })
});
