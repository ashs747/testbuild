import request from 'cirrus/services/request';

export function generateVariations(fileRef, variations) {
  let body = {
    original: fileRef,
    variations
  };
  return request.post("/variation-generator", body).end();
};
