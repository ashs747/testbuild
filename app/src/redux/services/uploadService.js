import request from 'cirrus/services/request';

export function generateVariations(fileRef, variations) {
  let body = {
    original: fileRef,
    variations
  };
  return request.post("/variation-generator", body).end();
};

export function rotate(variations) {
  let body = {
    variations
  };
  return request.post("/rotate", body).end();
};