import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { join, resolve } from 'path';
import {readdirSync} from 'fs';

@Injectable()
export class IngestService implements OnModuleInit {
    
    private readonly logger = new Logger(IngestService.name);

    onModuleInit() {
        const dataDir = join(__dirname, '../../../../', 'src/dictionary/OPTED/v003');
        this.logger.log(`Attempting to load dictionary in memory ${__dirname}`);
        this.logger.log(dataDir);
        const files = readdirSync(dataDir);
        files.forEach(file => {
            this.logger.log(file);
          });
  
        
    }

    onApplicationShutdown(signal: string) {
        this.logger.log(`Shutdown signal received: ${signal}`); // e.g. "SIGINT"
    }

}
