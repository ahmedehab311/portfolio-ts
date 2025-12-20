import formidable, { File } from "formidable";
import { NextRequest } from "next/server";

export async function parseFormData(req: NextRequest) {
  const form = formidable({ multiples: false, keepExtensions: true });

  // تحويل NextRequest إلى node-compatible stream
  const nodeReq: any = {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.url,
    // buffer كل body
    on: (event: string, cb: any) => {
      if (event === "data") {
        req.arrayBuffer().then((buffer) => cb(Buffer.from(buffer)));
      }
      if (event === "end") {
        cb();
      }
    },
  };

  const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) return reject(err);
      resolve([fields, files]);
    });
  });

  const fileArray = files.image as File[] | File;
  let imageFile: File;

  if (Array.isArray(fileArray)) {
    imageFile = fileArray[0];
  } else if (fileArray) {
    imageFile = fileArray;
  } else {
    throw new Error("Image file is requireddd");
  }

  return { fields, image: imageFile };
}
