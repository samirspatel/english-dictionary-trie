import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import {join} from 'path';

@Injectable()
export class Ingest implements OnModuleInit {
    private readonly logger = new Logger(Ingest.name);

    onModuleInit() {
        const dataDir = join(__dirname, '../../', 'src/dictionary/OPTED/v003');
        this.logger.log(`Attempting to load dictionary in memory ${__dirname}`);
        this.logger.log(dataDir);
    }

    onApplicationShutdown(signal: string) {
        this.logger.log(`Shutdown signal received: ${signal}`); // e.g. "SIGINT"
    }

}
