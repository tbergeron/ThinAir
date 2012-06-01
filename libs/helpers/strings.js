var StringsHelpers = {
  // turns string into a slug
  // example: This Ain't No Title => this-ain-t-no-title
  slugify: function(str) {
    var from, i, l, to;
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    to = "aaaaeeeeiiiioooouuuunc------";
    i = 0;
    l = from.length;
    while (i < l) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      i++;
    }
    str = str.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
    return str;
  }
};

module.exports = StringsHelpers;

