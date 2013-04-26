// Generated by CoffeeScript 1.4.0
(function() {
  var Stl, stl_parser;

  stl_parser = require('../parser/stl_parser');

  Stl = (function() {

    function Stl() {}

    return Stl;

  })();

  Stl.PovRay = (function() {

    function PovRay() {}

    PovRay.prototype._povHeaders = function(name) {
      return "#declare " + name + " = mesh {\n";
    };

    PovRay.prototype._povFooters = function() {
      return "}";
    };

    PovRay.prototype.convert = function(input, callback, progressCb) {
      var output,
        _this = this;
      output = "";
      return stl_parser.parse(input, function(err, polygons, name) {
        if (err != null) {
          callback(err);
          return;
        }
        output += _this._povFooters();
        return callback(null, output, name);
      }, function(err, polygon, name) {
        var povPolygon;
        if (output.length === 0) {
          output += _this._povHeaders(name);
        }
        povPolygon = _this.convertPolygon(polygon);
        output += povPolygon;
        if (progressCb != null) {
          return progressCb(err, povPolygon, name);
        }
      });
    };

    PovRay.prototype.convertPolygon = function(polygon) {
      var idx, output, vertex, _i, _len;
      output = "";
      output += "  triangle {\n";
      for (idx = _i = 0, _len = polygon.length; _i < _len; idx = ++_i) {
        vertex = polygon[idx];
        output += "    <" + vertex.points[0] + ", " + vertex.points[1] + ", " + vertex.points[2] + ">";
        if (idx !== (polygon.length - 1)) {
          output += ",\n";
        }
      }
      output += "  }\n";
      return output;
    };

    return PovRay;

  })();

  module.exports = new Stl.PovRay();

}).call(this);