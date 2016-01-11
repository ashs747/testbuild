import contentTypeDataService from '../../services/ajax/rest/contentTypeData';

export default {
  getContentTypeData(context, type, embed) {

    var params = {
      embed: embed,
      context: context,
      type: type
    };
    return contentTypeDataService.get(params);
  }
};
