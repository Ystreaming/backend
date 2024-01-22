import fs from 'fs';
import rangeParser from 'range-parser';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
const VideosService = require('../services/videos.services')

export async function streamVideo(req: Request, res: Response) {
    /* #swagger.tags = ['Videos']
      #swagger.description = 'streamVideo by Id' */
    const video = await VideosService.getVideoById(req.params.id)
    const filePath = video.url.path;

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const headers = req.headers as IncomingHttpHeaders;
    const range = headers.range;

    const chunkSize = 1024 * 1024; //1MB
    if (range) {
        const parts = rangeParser(fileSize, range);

        if (parts instanceof Array) {
            const start = parts[0].start;
            const end = parts[0].end;

            const calculatedEnd = start + chunkSize - 1;
            const endPosition = Math.min(calculatedEnd, end);

            const fileStream = fs.createReadStream(filePath, { start, end: endPosition });
            const responseHeaders = {
                'Content-Range': `bytes ${start}-${endPosition}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': endPosition - start + 1,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(206, responseHeaders);
            fileStream.pipe(res);
        } else {
            res.status(416).send('Range not satisfiable');
        }
    } else {
        let start = 0;
        let endPosition = Math.min(chunkSize - 1, fileSize - 1);

        const fileStream = fs.createReadStream(filePath, { start, end: endPosition });
        const responseHeaders = {
            'Content-Range': `bytes ${start}-${endPosition}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': endPosition - start + 1,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, responseHeaders);
        fileStream.pipe(res);
    }
}

module.exports = { streamVideo };
