import config from '../configs/appConfig';
import request from '../services/request';

function createFile(fileData) {
  return request.post('/file', fileData).end();
}

function generateVariation(variation) {
  return request.post('/variation-generator', variation).end();
}

function rotate(files) {
  return request.post('/rotate', {variations: files}).end();
}

function getBody(response) {
  return response.body;
}

export default {
  createFile: createFile,
  generateVariation: generateVariation,
  rotateFile: rotate
};
