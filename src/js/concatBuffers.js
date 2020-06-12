export default function concatBuffers(buffers) {
  const abViewArray = buffers.map((buf) => new Uint8Array(buf));
  const length = abViewArray.reduce((sum, current) => sum + current.byteLength, 0);
  const tmp = new Uint8Array(length);
  let startPoint = 0;
  buffers.forEach((buffer) => {
    tmp.set(new Uint8Array(buffer), startPoint);
    startPoint += buffer.byteLength;
  });
  return tmp.buffer;
}
