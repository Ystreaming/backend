import { Document } from 'mongoose';

interface File extends Document {
    filename: string;
    contentType: string;
    length: number;
    chunkSize: number;
    uploadDate: Date;
    aliases: string[];
    metadata: any;
    md5: string;
}

export default File;