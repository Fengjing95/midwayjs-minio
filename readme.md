### MidwayJS-MinIO

用于在MidwayJS项目中快捷访问MinIO，支持多客户端连接。

#### 安装使用

```bash
$ npm install minio @feng-j/midwayjs-minio
```

在configuration中引入minIO

```ts
import * as minIO from '@feng-j/midwayjs-minio';
// ......

@Configuration({
  imports: [
    // ......
    minIO,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    this.app.useMiddleware([ReportMiddleware]);
  }
}
```

在配置文件中添加minIO相关的配置

```ts
export default {
  // ......
  minIO: {
    client: {
      endPoint: 'play.min.io',
      port: 9000,
      useSSL: true,
      accessKey: 'Q3AM3UQ867SPQQA43P2F',
      secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
    },
  },
} as MidwayConfig;
```

然后就可以通过Inject来注入MinIOService了

```ts
import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { MinIOService } from '@feng-j/midwayjs-minio';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  minIOService: MinIOService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/buckets')
  async getBuckets() {
    return {
      success: true,
      message: 'OK',
      data: await this.minIOService.listBuckets(),
    };
  }
}
```

启动开发服务器`npm run dev`，使用浏览器访问http://127.0.0.1:7001/api/buckets查看效果。

更多方法可以见[MinIO SDK文档](https://minio.org.cn/docs/minio/linux/developers/javascript/API.html)



#### 多客户端连接

在配置中配置多个client即可

```ts
export default {
  // ......
	minIO: {
    clients: {
      bucket1: {
        endPoint: 'play.min.io',
        port: 9000,
        useSSL: true,
        accessKey: 'Q3AM3UQ867SPQQA43P2F',
        secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
      },
      bucket2: {
        endPoint: 'play.min.io',
        port: 9000,
        useSSL: true,
        accessKey: 'Q3AM3UQ867SPQQA43P2F',
        secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
      },
    },
  },
} as MidwayConfig; 
```

通过工厂类获取具体的client

```ts
import { Inject, Controller, Get, Param } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { MinIOServiceFactory } from '@feng-j/midwayjs-minio';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;


  @Inject()
  minIOServiceFactory: MinIOServiceFactory;

  @Get('/buckets/:bucketName')
  async getBucket(@Param('bucketName') bucketName: string) {
    const bucket = this.minIOServiceFactory.get(bucketName);
    return {
      success: true,
      message: 'OK',
      data: await bucket.listBuckets(),
    };
  }
}
```

