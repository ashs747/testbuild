export const castPropertiesToObject = (obj) => {
  obj.properties = (!obj.properties || obj.properties instanceof Array) ? {} : obj.properties;
  return obj;
};