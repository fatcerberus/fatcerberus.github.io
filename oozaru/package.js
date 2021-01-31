import BufferStream from './buffer-stream.js';
export default class Package {
    constructor(stream) {
        this.toc = {};
        const spkHeader = stream.readStruct({
            signature: 'string/4',
            version: 'uint16-le',
            numFiles: 'uint32-le',
            tocOffset: 'uint32-le',
            reserved: 'reserve/2',
        });
        if (spkHeader.signature != '.spk')
            throw RangeError("Not a valid Sphere package file");
        if (spkHeader.version !== 1)
            throw RangeError(`Unsupported SPK format version '${spkHeader.version}'`);
        stream.position = spkHeader.tocOffset;
        for (let i = 0; i < spkHeader.numFiles; ++i) {
            const entry = stream.readStruct({
                version: 'uint16-le',
                nameLength: 'uint16-le',
                byteOffset: 'uint32-le',
                fileSize: 'uint32-le',
                byteSize: 'uint32-le',
            });
            if (entry.version !== 1)
                throw RangeError(`Unsupported SPK file record version '${entry.version}'`);
            const pathName = stream.readString(entry.nameLength);
            this.toc[pathName] = {
                byteOffset: entry.byteOffset,
                byteLength: entry.byteLength,
                fileSize: entry.fileSize,
            };
        }
        this.stream = stream;
    }
    static async fromFile(fido, url) {
        const response = await fido.fetch(url);
        const buffer = await response.arrayBuffer();
        const stream = new BufferStream(buffer);
        return new this(stream);
    }
    dataOf(pathName) {
        if (!(pathName in this.toc))
            throw Error(`File not found in Sphere package '${pathName}'`);
        const record = this.toc[pathName];
        if (record.data === undefined) {
            if (record.byteLength !== record.fileSize)
                throw RangeError(`Compressed packages are currently unsupported`);
            this.stream.position = record.byteOffset;
            const compressedData = this.stream.readBytes(record.byteLength);
            record.data = compressedData.buffer;
        }
        return record.data;
    }
}
//# sourceMappingURL=package.js.map