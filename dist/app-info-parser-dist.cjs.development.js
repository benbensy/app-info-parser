'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Unzip = _interopDefault(require('isomorphic-unzip'));
var ByteBuffer = _interopDefault(require('bytebuffer'));
var plist = _interopDefault(require('plist'));
var bplist = _interopDefault(require('bplist-parser'));
var cgbiToPng = _interopDefault(require('cgbi-to-png'));

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}

function objectType(o) {
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}
function isArray(o) {
  return objectType(o) === 'array';
}
function isObject(o) {
  return objectType(o) === 'object';
}
function isPrimitive(o) {
  return o === null || ['boolean', 'number', 'string', 'undefined'].includes(objectType(o));
}
function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

var Zip = /*#__PURE__*/function () {
  function Zip(file) {
    if (isBrowser() && file instanceof Blob && file.size) {
      this.file = file;
    } else if (typeof file === 'string') {
      this.file = require('path').resolve(file);
    } else {
      throw new Error('Param error: [file] must be file path in Node or an instance of Blob or File in browser');
    }
    this.unzip = new Unzip(this.file);
  }
  var _proto = Zip.prototype;
  _proto.getEntries = function getEntries(regexps, type) {
    var _this = this;
    if (type === void 0) {
      type = 'buffer';
    }
    var regexpStrings = regexps.map(function (regex) {
      if (typeof regex === 'string') {
        return regex.trim();
      }
      return regex;
    });
    return new Promise(function (resolve, reject) {
      _this.unzip.getBuffer(regexpStrings, {
        type: type
      }, function (err, buffers) {
        err ? reject(err) : resolve(buffers);
      });
    });
  };
  _proto.getEntry = function getEntry(regex, type) {
    var _this2 = this;
    if (type === void 0) {
      type = 'buffer';
    }
    if (typeof regex === 'string') {
      regex = regex.replace(/\u0000/g, '');
    }
    return new Promise(function (resolve, reject) {
      _this2.unzip.getBuffer([regex], {
        type: type
      }, function (err, buffers) {
        err ? reject(err) : resolve(buffers[String(regex)]);
      });
    });
  };
  return Zip;
}();

// From https://github.com/openstf/adbkit-apkreader
var NodeType;
(function (NodeType) {
  NodeType[NodeType["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
  NodeType[NodeType["ATTRIBUTE_NODE"] = 2] = "ATTRIBUTE_NODE";
  NodeType[NodeType["CDATA_SECTION_NODE"] = 4] = "CDATA_SECTION_NODE";
})(NodeType || (NodeType = {}));
var ChunkType;
(function (ChunkType) {
  ChunkType[ChunkType["NULL"] = 0] = "NULL";
  ChunkType[ChunkType["STRING_POOL"] = 1] = "STRING_POOL";
  ChunkType[ChunkType["TABLE"] = 2] = "TABLE";
  ChunkType[ChunkType["XML"] = 3] = "XML";
  ChunkType[ChunkType["XML_FIRST_CHUNK"] = 256] = "XML_FIRST_CHUNK";
  ChunkType[ChunkType["XML_START_NAMESPACE"] = 256] = "XML_START_NAMESPACE";
  ChunkType[ChunkType["XML_END_NAMESPACE"] = 257] = "XML_END_NAMESPACE";
  ChunkType[ChunkType["XML_START_ELEMENT"] = 258] = "XML_START_ELEMENT";
  ChunkType[ChunkType["XML_END_ELEMENT"] = 259] = "XML_END_ELEMENT";
  ChunkType[ChunkType["XML_CDATA"] = 260] = "XML_CDATA";
  ChunkType[ChunkType["XML_LAST_CHUNK"] = 383] = "XML_LAST_CHUNK";
  ChunkType[ChunkType["XML_RESOURCE_MAP"] = 384] = "XML_RESOURCE_MAP";
  ChunkType[ChunkType["TABLE_PACKAGE"] = 512] = "TABLE_PACKAGE";
  ChunkType[ChunkType["TABLE_TYPE"] = 513] = "TABLE_TYPE";
  ChunkType[ChunkType["TABLE_TYPE_SPEC"] = 514] = "TABLE_TYPE_SPEC";
})(ChunkType || (ChunkType = {}));
var StringFlags;
(function (StringFlags) {
  StringFlags[StringFlags["SORTED"] = 1] = "SORTED";
  StringFlags[StringFlags["UTF8"] = 256] = "UTF8";
})(StringFlags || (StringFlags = {}));
// Taken from android.util.TypedValue
var TypedValue;
(function (TypedValue) {
  TypedValue[TypedValue["COMPLEX_MANTISSA_MASK"] = 16777215] = "COMPLEX_MANTISSA_MASK";
  TypedValue[TypedValue["COMPLEX_MANTISSA_SHIFT"] = 8] = "COMPLEX_MANTISSA_SHIFT";
  TypedValue[TypedValue["COMPLEX_RADIX_0p23"] = 3] = "COMPLEX_RADIX_0p23";
  TypedValue[TypedValue["COMPLEX_RADIX_16p7"] = 1] = "COMPLEX_RADIX_16p7";
  TypedValue[TypedValue["COMPLEX_RADIX_23p0"] = 0] = "COMPLEX_RADIX_23p0";
  TypedValue[TypedValue["COMPLEX_RADIX_8p15"] = 2] = "COMPLEX_RADIX_8p15";
  TypedValue[TypedValue["COMPLEX_RADIX_MASK"] = 3] = "COMPLEX_RADIX_MASK";
  TypedValue[TypedValue["COMPLEX_RADIX_SHIFT"] = 4] = "COMPLEX_RADIX_SHIFT";
  TypedValue[TypedValue["COMPLEX_UNIT_DIP"] = 1] = "COMPLEX_UNIT_DIP";
  TypedValue[TypedValue["COMPLEX_UNIT_FRACTION"] = 0] = "COMPLEX_UNIT_FRACTION";
  TypedValue[TypedValue["COMPLEX_UNIT_FRACTION_PARENT"] = 1] = "COMPLEX_UNIT_FRACTION_PARENT";
  TypedValue[TypedValue["COMPLEX_UNIT_IN"] = 4] = "COMPLEX_UNIT_IN";
  TypedValue[TypedValue["COMPLEX_UNIT_MASK"] = 15] = "COMPLEX_UNIT_MASK";
  TypedValue[TypedValue["COMPLEX_UNIT_MM"] = 5] = "COMPLEX_UNIT_MM";
  TypedValue[TypedValue["COMPLEX_UNIT_PT"] = 3] = "COMPLEX_UNIT_PT";
  TypedValue[TypedValue["COMPLEX_UNIT_PX"] = 0] = "COMPLEX_UNIT_PX";
  TypedValue[TypedValue["COMPLEX_UNIT_SHIFT"] = 0] = "COMPLEX_UNIT_SHIFT";
  TypedValue[TypedValue["COMPLEX_UNIT_SP"] = 2] = "COMPLEX_UNIT_SP";
  TypedValue[TypedValue["DENSITY_DEFAULT"] = 0] = "DENSITY_DEFAULT";
  TypedValue[TypedValue["DENSITY_NONE"] = 65535] = "DENSITY_NONE";
  TypedValue[TypedValue["TYPE_ATTRIBUTE"] = 2] = "TYPE_ATTRIBUTE";
  TypedValue[TypedValue["TYPE_DIMENSION"] = 5] = "TYPE_DIMENSION";
  TypedValue[TypedValue["TYPE_FIRST_COLOR_INT"] = 28] = "TYPE_FIRST_COLOR_INT";
  TypedValue[TypedValue["TYPE_FIRST_INT"] = 16] = "TYPE_FIRST_INT";
  TypedValue[TypedValue["TYPE_FLOAT"] = 4] = "TYPE_FLOAT";
  TypedValue[TypedValue["TYPE_FRACTION"] = 6] = "TYPE_FRACTION";
  TypedValue[TypedValue["TYPE_INT_BOOLEAN"] = 18] = "TYPE_INT_BOOLEAN";
  TypedValue[TypedValue["TYPE_INT_COLOR_ARGB4"] = 30] = "TYPE_INT_COLOR_ARGB4";
  TypedValue[TypedValue["TYPE_INT_COLOR_ARGB8"] = 28] = "TYPE_INT_COLOR_ARGB8";
  TypedValue[TypedValue["TYPE_INT_COLOR_RGB4"] = 31] = "TYPE_INT_COLOR_RGB4";
  TypedValue[TypedValue["TYPE_INT_COLOR_RGB8"] = 29] = "TYPE_INT_COLOR_RGB8";
  TypedValue[TypedValue["TYPE_INT_DEC"] = 16] = "TYPE_INT_DEC";
  TypedValue[TypedValue["TYPE_INT_HEX"] = 17] = "TYPE_INT_HEX";
  TypedValue[TypedValue["TYPE_LAST_COLOR_INT"] = 31] = "TYPE_LAST_COLOR_INT";
  TypedValue[TypedValue["TYPE_LAST_INT"] = 31] = "TYPE_LAST_INT";
  TypedValue[TypedValue["TYPE_NULL"] = 0] = "TYPE_NULL";
  TypedValue[TypedValue["TYPE_REFERENCE"] = 1] = "TYPE_REFERENCE";
  TypedValue[TypedValue["TYPE_STRING"] = 3] = "TYPE_STRING";
})(TypedValue || (TypedValue = {}));
var BinaryXmlParser = /*#__PURE__*/function () {
  function BinaryXmlParser(buffer, options) {
    if (options === void 0) {
      options = {};
    }
    this.buffer = buffer;
    this.cursor = 0;
    this.strings = [];
    this.resources = [];
    this.document = null;
    this.parent = null;
    this.stack = [];
    this.debug = options.debug || false;
  }
  var _proto = BinaryXmlParser.prototype;
  _proto.readU8 = function readU8() {
    this.debug && console.group('readU8');
    this.debug && console.debug('cursor:', this.cursor);
    var val = this.buffer[this.cursor];
    this.debug && console.debug('value:', val);
    this.cursor += 1;
    this.debug && console.groupEnd();
    return val;
  };
  _proto.readU16 = function readU16() {
    this.debug && console.group('readU16');
    this.debug && console.debug('cursor:', this.cursor);
    var val = this.buffer.readUInt16LE(this.cursor);
    this.debug && console.debug('value:', val);
    this.cursor += 2;
    this.debug && console.groupEnd();
    return val;
  };
  _proto.readS32 = function readS32() {
    this.debug && console.group('readS32');
    this.debug && console.debug('cursor:', this.cursor);
    var val = this.buffer.readInt32LE(this.cursor);
    this.debug && console.debug('value:', val);
    this.cursor += 4;
    this.debug && console.groupEnd();
    return val;
  };
  _proto.readU32 = function readU32() {
    this.debug && console.group('readU32');
    this.debug && console.debug('cursor:', this.cursor);
    var val = this.buffer.readUInt32LE(this.cursor);
    this.debug && console.debug('value:', val);
    this.cursor += 4;
    this.debug && console.groupEnd();
    return val;
  };
  _proto.readLength8 = function readLength8() {
    this.debug && console.group('readLength8');
    var len = this.readU8();
    if (len & 0x80) {
      len = (len & 0x7f) << 8;
      len += this.readU8();
    }
    this.debug && console.debug('length:', len);
    this.debug && console.groupEnd();
    return len;
  };
  _proto.readLength16 = function readLength16() {
    this.debug && console.group('readLength16');
    var len = this.readU16();
    if (len & 0x8000) {
      len = (len & 0x7fff) << 16;
      len += this.readU16();
    }
    this.debug && console.debug('length:', len);
    this.debug && console.groupEnd();
    return len;
  };
  _proto.readDimension = function readDimension() {
    this.debug && console.group('readDimension');
    var dimension = {};
    var value = this.readU32();
    var unit = dimension.value & 0xff;
    dimension.value = value >> 8;
    dimension.rawUnit = unit;
    switch (unit) {
      case TypedValue.COMPLEX_UNIT_MM:
        dimension.unit = 'mm';
        break;
      case TypedValue.COMPLEX_UNIT_PX:
        dimension.unit = 'px';
        break;
      case TypedValue.COMPLEX_UNIT_DIP:
        dimension.unit = 'dp';
        break;
      case TypedValue.COMPLEX_UNIT_SP:
        dimension.unit = 'sp';
        break;
      case TypedValue.COMPLEX_UNIT_PT:
        dimension.unit = 'pt';
        break;
      case TypedValue.COMPLEX_UNIT_IN:
        dimension.unit = 'in';
        break;
    }
    this.debug && console.groupEnd();
    return dimension;
  };
  _proto.readFraction = function readFraction() {
    this.debug && console.group('readFraction');
    var fraction = {};
    var value = this.readU32();
    var type = value & 0xf;
    fraction.value = this.convertIntToFloat(value >> 4);
    fraction.rawType = type;
    switch (type) {
      case TypedValue.COMPLEX_UNIT_FRACTION:
        fraction.type = '%';
        break;
      case TypedValue.COMPLEX_UNIT_FRACTION_PARENT:
        fraction.type = '%p';
        break;
    }
    this.debug && console.groupEnd();
    return fraction;
  };
  _proto.readHex24 = function readHex24() {
    this.debug && console.group('readHex24');
    var val = (this.readU32() & 0xffffff).toString(16);
    this.debug && console.groupEnd();
    return val;
  };
  _proto.readHex32 = function readHex32() {
    this.debug && console.group('readHex32');
    var val = this.readU32().toString(16);
    this.debug && console.groupEnd();
    return val;
  };
  _proto.readTypedValue = function readTypedValue() {
    this.debug && console.group('readTypedValue');
    var typedValue = {
      value: '',
      type: 'unknown',
      rawType: TypedValue.TYPE_NULL
    };
    var start = this.cursor;
    var size = this.readU16();
    /* const zero = */
    this.readU8();
    var dataType = this.readU8();
    // Yes, there has been a real world APK where the size is malformed.
    if (size === 0) {
      size = 8;
    }
    typedValue.rawType = dataType;
    switch (dataType) {
      case TypedValue.TYPE_INT_DEC:
        typedValue.value = this.readS32();
        typedValue.type = 'int_dec';
        break;
      case TypedValue.TYPE_INT_HEX:
        typedValue.value = this.readS32();
        typedValue.type = 'int_hex';
        break;
      case TypedValue.TYPE_STRING:
        var ref = this.readS32();
        typedValue.value = ref > 0 ? this.strings[ref] : '';
        typedValue.type = 'string';
        break;
      case TypedValue.TYPE_REFERENCE:
        var id = this.readU32();
        typedValue.value = "resourceId:0x" + id.toString(16);
        typedValue.type = 'reference';
        break;
      case TypedValue.TYPE_INT_BOOLEAN:
        typedValue.value = this.readS32() !== 0;
        typedValue.type = 'boolean';
        break;
      case TypedValue.TYPE_NULL:
        this.readU32();
        typedValue.value = null;
        typedValue.type = 'null';
        break;
      case TypedValue.TYPE_INT_COLOR_RGB8:
        typedValue.value = this.readHex24();
        typedValue.type = 'rgb8';
        break;
      case TypedValue.TYPE_INT_COLOR_RGB4:
        typedValue.value = this.readHex24();
        typedValue.type = 'rgb4';
        break;
      case TypedValue.TYPE_INT_COLOR_ARGB8:
        typedValue.value = this.readHex32();
        typedValue.type = 'argb8';
        break;
      case TypedValue.TYPE_INT_COLOR_ARGB4:
        typedValue.value = this.readHex32();
        typedValue.type = 'argb4';
        break;
      case TypedValue.TYPE_DIMENSION:
        typedValue.value = this.readDimension();
        typedValue.type = 'dimension';
        break;
      case TypedValue.TYPE_FRACTION:
        typedValue.value = this.readFraction();
        typedValue.type = 'fraction';
        break;
      default:
        {
          var type = dataType.toString(16);
          console.debug("Not sure what to do with typed value of type 0x" + type + ", falling back to reading an uint32.");
          typedValue.value = this.readU32();
          typedValue.type = 'unknown';
        }
    }
    // Ensure we consume the whole value
    var end = start + size;
    if (this.cursor !== end) {
      var _type = dataType.toString(16);
      var diff = end - this.cursor;
      console.debug("Cursor is off by " + diff + " bytes at " + this.cursor + " at supposed end of typed value of type 0x" + _type + ". The typed value started at offset " + start + " and is supposed to end at offset " + end + ". Ignoring the rest of the value.");
      this.cursor = end;
    }
    this.debug && console.groupEnd();
    return typedValue;
  }
  // https://twitter.com/kawasima/status/427730289201139712
  ;
  _proto.convertIntToFloat = function convertIntToFloat(_int) {
    var buf = new ArrayBuffer(4);
    new Int32Array(buf)[0] = _int;
    return new Float32Array(buf)[0];
  };
  _proto.readString = function readString(encoding) {
    this.debug && console.group('readString', encoding);
    switch (encoding) {
      case 'utf-8':
        var stringLength = this.readLength8();
        this.debug && console.debug('stringLength:', stringLength);
        var byteLength = this.readLength8();
        this.debug && console.debug('byteLength:', byteLength);
        var value = this.buffer.toString(encoding, this.cursor, this.cursor += byteLength);
        this.debug && console.debug('value:', value);
        this.debug && console.groupEnd();
        return value;
      case 'ucs2':
        stringLength = this.readLength16();
        this.debug && console.debug('stringLength:', stringLength);
        byteLength = stringLength * 2;
        this.debug && console.debug('byteLength:', byteLength);
        value = this.buffer.toString(encoding, this.cursor, this.cursor += byteLength);
        this.debug && console.debug('value:', value);
        this.debug && console.groupEnd();
        return value;
      default:
        throw new Error("Unsupported encoding '" + encoding + "'");
    }
  };
  _proto.readChunkHeader = function readChunkHeader() {
    this.debug && console.group('readChunkHeader');
    var header = {
      startOffset: this.cursor,
      chunkType: this.readU16(),
      headerSize: this.readU16(),
      chunkSize: this.readU32()
    };
    this.debug && console.debug('startOffset:', header.startOffset);
    this.debug && console.debug('chunkType:', header.chunkType);
    this.debug && console.debug('headerSize:', header.headerSize);
    this.debug && console.debug('chunkSize:', header.chunkSize);
    this.debug && console.groupEnd();
    return header;
  };
  _proto.readStringPool = function readStringPool(header) {
    this.debug && console.group('readStringPool');
    header.stringCount = this.readU32();
    this.debug && console.debug('stringCount:', header.stringCount);
    header.styleCount = this.readU32();
    this.debug && console.debug('styleCount:', header.styleCount);
    header.flags = this.readU32();
    this.debug && console.debug('flags:', header.flags);
    header.stringsStart = this.readU32();
    this.debug && console.debug('stringsStart:', header.stringsStart);
    header.stylesStart = this.readU32();
    this.debug && console.debug('stylesStart:', header.stylesStart);
    if (header.chunkType !== ChunkType.STRING_POOL) {
      throw new Error('Invalid string pool header');
    }
    var offsets = [];
    for (var i = 0, l = header.stringCount; i < l; ++i) {
      this.debug && console.debug('offset:', i);
      offsets.push(this.readU32());
    }
    var sorted = (header.flags & StringFlags.SORTED) === StringFlags.SORTED;
    this.debug && console.debug('sorted:', sorted);
    var encoding = (header.flags & StringFlags.UTF8) === StringFlags.UTF8 ? 'utf-8' : 'ucs2';
    this.debug && console.debug('encoding:', encoding);
    var stringsStart = header.startOffset + header.stringsStart;
    this.cursor = stringsStart;
    for (var _i = 0, _l = header.stringCount; _i < _l; ++_i) {
      this.debug && console.debug('string:', _i);
      this.debug && console.debug('offset:', offsets[_i]);
      this.cursor = stringsStart + offsets[_i];
      this.strings.push(this.readString(encoding));
    }
    // Skip styles
    this.cursor = header.startOffset + header.chunkSize;
    this.debug && console.groupEnd();
    return null;
  };
  _proto.readResourceMap = function readResourceMap(header) {
    this.debug && console.group('readResourceMap');
    var count = Math.floor((header.chunkSize - header.headerSize) / 4);
    for (var i = 0; i < count; ++i) {
      this.resources.push(this.readU32());
    }
    this.debug && console.groupEnd();
    return null;
  };
  _proto.readXmlNamespaceStart = function readXmlNamespaceStart(/* header */
  ) {
    this.debug && console.group('readXmlNamespaceStart');
    /* const line = */
    this.readU32();
    /* const commentRef = */
    this.readU32();
    /* const prefixRef = */
    this.readS32();
    /* const uriRef = */
    this.readS32();
    // We don't currently care about the values, but they could
    // be accessed like so:
    //
    // namespaceURI.prefix = this.strings[prefixRef] // if prefixRef > 0
    // namespaceURI.uri = this.strings[uriRef] // if uriRef > 0
    this.debug && console.groupEnd();
    return null;
  };
  _proto.readXmlNamespaceEnd = function readXmlNamespaceEnd(/* header */
  ) {
    this.debug && console.group('readXmlNamespaceEnd');
    /* const line = */
    this.readU32();
    /* const commentRef = */
    this.readU32();
    /* const prefixRef = */
    this.readS32();
    /* const uriRef = */
    this.readS32();
    // We don't currently care about the values, but they could
    // be accessed like so:
    //
    // namespaceURI.prefix = this.strings[prefixRef] // if prefixRef > 0
    // namespaceURI.uri = this.strings[uriRef] // if uriRef > 0
    this.debug && console.groupEnd();
    return null;
  };
  _proto.readXmlElementStart = function readXmlElementStart(/* header */
  ) {
    this.debug && console.group('readXmlElementStart');
    var node = {
      namespaceURI: '',
      nodeType: NodeType.ELEMENT_NODE,
      nodeName: '',
      attributes: [],
      childNodes: []
    };
    /* const line = */
    this.readU32();
    /* const commentRef = */
    this.readU32();
    var nsRef = this.readS32();
    var nameRef = this.readS32();
    if (nsRef > 0) {
      node.namespaceURI = this.strings[nsRef];
    }
    node.nodeName = this.strings[nameRef];
    /* const attrStart = */
    this.readU16();
    /* const attrSize = */
    this.readU16();
    var attrCount = this.readU16();
    /* const idIndex = */
    this.readU16();
    /* const classIndex = */
    this.readU16();
    /* const styleIndex = */
    this.readU16();
    for (var i = 0; i < attrCount; ++i) {
      node.attributes.push(this.readXmlAttribute());
    }
    if (this.document) {
      var _this$parent;
      (_this$parent = this.parent) == null || _this$parent.childNodes.push(node);
      this.parent = node;
    } else {
      this.document = this.parent = node;
    }
    this.stack.push(node);
    this.debug && console.groupEnd();
    return node;
  };
  _proto.readXmlAttribute = function readXmlAttribute() {
    this.debug && console.group('readXmlAttribute');
    var attr = {
      namespaceURI: '',
      nodeType: NodeType.ATTRIBUTE_NODE,
      nodeName: '',
      name: '',
      value: '',
      typedValue: {}
    };
    var nsRef = this.readS32();
    var nameRef = this.readS32();
    var valueRef = this.readS32();
    if (nsRef > 0) {
      attr.namespaceURI = this.strings[nsRef];
    }
    attr.nodeName = attr.name = this.strings[nameRef];
    if (valueRef > 0) {
      attr.value = this.strings[valueRef];
    }
    attr.typedValue = this.readTypedValue();
    this.debug && console.groupEnd();
    return attr;
  };
  _proto.readXmlElementEnd = function readXmlElementEnd(/* header */
  ) {
    this.debug && console.group('readXmlCData');
    /* const line = */
    this.readU32();
    /* const commentRef = */
    this.readU32();
    /* const nsRef = */
    this.readS32();
    /* const nameRef = */
    this.readS32();
    this.stack.pop();
    this.parent = this.stack[this.stack.length - 1];
    this.debug && console.groupEnd();
    return null;
  };
  _proto.readXmlCData = function readXmlCData(/* header */
  ) {
    var _this$parent2;
    this.debug && console.group('readXmlCData');
    var cdata = {
      namespaceURI: '',
      nodeType: NodeType.CDATA_SECTION_NODE,
      nodeName: '#cdata',
      data: '',
      typedValue: {}
    };
    /* const line = */
    this.readU32();
    /* const commentRef = */
    this.readU32();
    var dataRef = this.readS32();
    if (dataRef > 0) {
      cdata.data = this.strings[dataRef];
    }
    cdata.typedValue = this.readTypedValue();
    (_this$parent2 = this.parent) == null || _this$parent2.childNodes.push(cdata);
    this.debug && console.groupEnd();
    return cdata;
  };
  _proto.readNull = function readNull(header) {
    this.debug && console.group('readNull');
    this.cursor += header.chunkSize - header.headerSize;
    this.debug && console.groupEnd();
    return null;
  };
  _proto.parse = function parse() {
    this.debug && console.group('BinaryXmlParser.parse');
    var xmlHeader = this.readChunkHeader();
    if (xmlHeader.chunkType !== ChunkType.XML) {
      throw new Error('Invalid XML header');
    }
    while (this.cursor < this.buffer.length) {
      this.debug && console.group('chunk');
      var start = this.cursor;
      var header = this.readChunkHeader();
      switch (header.chunkType) {
        case ChunkType.STRING_POOL:
          this.readStringPool(header);
          break;
        case ChunkType.XML_RESOURCE_MAP:
          this.readResourceMap(header);
          break;
        case ChunkType.XML_START_NAMESPACE:
          this.readXmlNamespaceStart();
          break;
        case ChunkType.XML_END_NAMESPACE:
          this.readXmlNamespaceEnd();
          break;
        case ChunkType.XML_START_ELEMENT:
          this.readXmlElementStart();
          break;
        case ChunkType.XML_END_ELEMENT:
          this.readXmlElementEnd();
          break;
        case ChunkType.XML_CDATA:
          this.readXmlCData();
          break;
        case ChunkType.NULL:
          this.readNull(header);
          break;
        default:
          throw new Error("Unsupported chunk type '" + header.chunkType + "'");
      }
      // Ensure we consume the whole chunk
      var end = start + header.chunkSize;
      if (this.cursor !== end) {
        var diff = end - this.cursor;
        var type = header.chunkType.toString(16);
        console.debug("Cursor is off by " + diff + " bytes at " + this.cursor + " at supposed end of chunk of type 0x" + type + ". The chunk started at offset " + start + " and is supposed to end at offset " + end + ". Ignoring the rest of the chunk.");
        this.cursor = end;
      }
      this.debug && console.groupEnd();
    }
    this.debug && console.groupEnd();
    return this.document;
  };
  return BinaryXmlParser;
}();

var INTENT_MAIN = 'android.intent.action.MAIN';
var CATEGORY_LAUNCHER = 'android.intent.category.LAUNCHER';
var ManifestParser = /*#__PURE__*/function () {
  function ManifestParser(buffer, options) {
    if (options === void 0) {
      options = {};
    }
    this.buffer = buffer;
    this.xmlParser = new BinaryXmlParser(this.buffer, options);
  }
  var _proto = ManifestParser.prototype;
  _proto.collapseAttributes = function collapseAttributes(element) {
    var collapsed = Object.create(null);
    for (var _i = 0, _Array$from = Array.from(element.attributes); _i < _Array$from.length; _i++) {
      var attr = _Array$from[_i];
      collapsed[attr.name] = attr.typedValue.value;
    }
    return collapsed;
  };
  _proto.parseIntents = function parseIntents(element, target) {
    var _this = this;
    target.intentFilters = [];
    target.metaData = [];
    return element.childNodes.forEach(function (element) {
      switch (element.nodeName) {
        case 'intent-filter':
          {
            var intentFilter = _this.collapseAttributes(element);
            intentFilter.actions = [];
            intentFilter.categories = [];
            intentFilter.data = [];
            element.childNodes.forEach(function (element) {
              switch (element.nodeName) {
                case 'action':
                  intentFilter.actions.push(_this.collapseAttributes(element));
                  break;
                case 'category':
                  intentFilter.categories.push(_this.collapseAttributes(element));
                  break;
                case 'data':
                  intentFilter.data.push(_this.collapseAttributes(element));
                  break;
              }
            });
            target.intentFilters.push(intentFilter);
            break;
          }
        case 'meta-data':
          target.metaData.push(_this.collapseAttributes(element));
          break;
      }
    });
  };
  _proto.parseApplication = function parseApplication(element) {
    var _this2 = this;
    var app = this.collapseAttributes(element);
    app.activities = [];
    app.activityAliases = [];
    app.launcherActivities = [];
    app.services = [];
    app.receivers = [];
    app.providers = [];
    app.usesLibraries = [];
    app.metaData = [];
    element.childNodes.forEach(function (element) {
      switch (element.nodeName) {
        case 'activity':
          {
            var activity = _this2.collapseAttributes(element);
            _this2.parseIntents(element, activity);
            app.activities.push(activity);
            if (_this2.isLauncherActivity(activity)) {
              app.launcherActivities.push(activity);
            }
            break;
          }
        case 'activity-alias':
          {
            var activityAlias = _this2.collapseAttributes(element);
            _this2.parseIntents(element, activityAlias);
            app.activityAliases.push(activityAlias);
            if (_this2.isLauncherActivity(activityAlias)) {
              app.launcherActivities.push(activityAlias);
            }
            break;
          }
        case 'service':
          {
            var service = _this2.collapseAttributes(element);
            _this2.parseIntents(element, service);
            app.services.push(service);
            break;
          }
        case 'receiver':
          {
            var receiver = _this2.collapseAttributes(element);
            _this2.parseIntents(element, receiver);
            app.receivers.push(receiver);
            break;
          }
        case 'provider':
          {
            var provider = _this2.collapseAttributes(element);
            provider.grantUriPermissions = [];
            provider.metaData = [];
            provider.pathPermissions = [];
            element.childNodes.forEach(function (element) {
              switch (element.nodeName) {
                case 'grant-uri-permission':
                  provider.grantUriPermissions.push(_this2.collapseAttributes(element));
                  break;
                case 'meta-data':
                  provider.metaData.push(_this2.collapseAttributes(element));
                  break;
                case 'path-permission':
                  provider.pathPermissions.push(_this2.collapseAttributes(element));
                  break;
              }
            });
            app.providers.push(provider);
            break;
          }
        case 'uses-library':
          app.usesLibraries.push(_this2.collapseAttributes(element));
          break;
        case 'meta-data':
          app.metaData.push(_this2.collapseAttributes(element));
          break;
      }
    });
    return app;
  };
  _proto.isLauncherActivity = function isLauncherActivity(activity) {
    return activity.intentFilters.some(function (filter) {
      var hasMain = filter.actions.some(function (action) {
        return action.name === INTENT_MAIN;
      });
      if (!hasMain) {
        return false;
      }
      return filter.categories.some(function (category) {
        return category.name === CATEGORY_LAUNCHER;
      });
    });
  };
  _proto.parse = function parse() {
    var _document$childNodes,
      _this3 = this;
    var document = this.xmlParser.parse();
    var manifest = this.collapseAttributes(document);
    manifest.usesPermissions = [];
    manifest.permissions = [];
    manifest.permissionTrees = [];
    manifest.permissionGroups = [];
    manifest.instrumentation = null;
    manifest.usesSdk = null;
    manifest.usesConfiguration = null;
    manifest.usesFeatures = [];
    manifest.supportsScreens = null;
    manifest.compatibleScreens = [];
    manifest.supportsGlTextures = [];
    manifest.application = Object.create(null);
    document == null || (_document$childNodes = document.childNodes) == null || _document$childNodes.forEach(function (element) {
      var _element$childNodes;
      switch (element.nodeName) {
        case 'uses-permission':
          manifest.usesPermissions.push(_this3.collapseAttributes(element));
          break;
        case 'permission':
          manifest.permissions.push(_this3.collapseAttributes(element));
          break;
        case 'permission-tree':
          manifest.permissionTrees.push(_this3.collapseAttributes(element));
          break;
        case 'permission-group':
          manifest.permissionGroups.push(_this3.collapseAttributes(element));
          break;
        case 'instrumentation':
          manifest.instrumentation = _this3.collapseAttributes(element);
          break;
        case 'uses-sdk':
          manifest.usesSdk = _this3.collapseAttributes(element);
          break;
        case 'uses-configuration':
          manifest.usesConfiguration = _this3.collapseAttributes(element);
          break;
        case 'uses-feature':
          manifest.usesFeatures.push(_this3.collapseAttributes(element));
          break;
        case 'supports-screens':
          manifest.supportsScreens = _this3.collapseAttributes(element);
          break;
        case 'compatible-screens':
          (_element$childNodes = element.childNodes) == null || _element$childNodes.forEach(function (screen) {
            if (screen.nodeType === NodeType.ELEMENT_NODE) {
              return manifest.compatibleScreens.push(_this3.collapseAttributes(screen));
            }
          });
          break;
        case 'supports-gl-texture':
          manifest.supportsGlTextures.push(_this3.collapseAttributes(element));
          break;
        case 'application':
          manifest.application = _this3.parseApplication(element);
          break;
      }
    });
    return manifest;
  };
  return ManifestParser;
}();

/**
 * Code translated from a C# project https://github.com/hylander0/Iteedee.ApkReader/blob/master/Iteedee.ApkReader/ApkResourceFinder.cs
 *
 * Decode binary file `resources.arsc` from a .apk file to a JavaScript Object.
 */
var RES_STRING_POOL_TYPE = 0x0001;
var RES_TABLE_TYPE = 0x0002;
var RES_TABLE_PACKAGE_TYPE = 0x0200;
var RES_TABLE_TYPE_TYPE = 0x0201;
var RES_TABLE_TYPE_SPEC_TYPE = 0x0202;
// The 'data' holds a ResTable_ref, a reference to another resource
// table entry.
var TYPE_REFERENCE = 0x01;
// The 'data' holds an index into the containing resource table's
// global value string pool.
var TYPE_STRING = 0x03;
var ResourceFinder = /*#__PURE__*/function () {
  function ResourceFinder() {
    this.valueStringPool = [];
    this.typeStringPool = [];
    this.keyStringPool = [];
    this.packageId = 0;
    this.responseMap = {};
    this.entryMap = {};
  }
  /**
   * Same to C# BinaryReader.readBytes
   *
   * @param bb ByteBuffer
   * @param len length
   * @returns {Buffer}
   */
  ResourceFinder.readBytes = function readBytes(bb, len) {
    var uint8Array = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      uint8Array[i] = bb.readUint8();
    }
    return ByteBuffer.wrap(uint8Array, 'binary', true);
  }
  /**
   *
   * @param {ByteBuffer} bb
   * @return {Map<String, Set<String>>}
   */;
  var _proto = ResourceFinder.prototype;
  _proto.processResourceTable = function processResourceTable(resourceBuffer) {
    var bb = ByteBuffer.wrap(resourceBuffer, 'binary', true);
    var type = bb.readShort();
    var headerSize = bb.readShort();
    var size = bb.readInt();
    var packageCount = bb.readInt();
    var buffer;
    var bb2;
    if (type !== RES_TABLE_TYPE) {
      throw new Error('No RES_TABLE_TYPE found!');
    }
    if (size !== bb.limit) {
      throw new Error('The buffer size not matches to the resource table size.');
    }
    bb.offset = headerSize;
    var realStringPoolCount = 0;
    var realPackageCount = 0;
    while (true) {
      var pos = void 0,
        t = void 0,
        s = void 0;
      try {
        pos = bb.offset;
        t = bb.readShort();
        // headerSize
        bb.readShort();
        s = bb.readInt();
      } catch (error) {
        break;
      }
      if (t === RES_STRING_POOL_TYPE) {
        // Process the string pool
        if (realStringPoolCount === 0) {
          buffer = new ByteBuffer(s);
          bb.offset = pos;
          bb.prependTo(buffer);
          bb2 = ByteBuffer.wrap(buffer, 'binary', true);
          bb2.LE();
          this.valueStringPool = this.processStringPool(bb2);
        }
        realStringPoolCount++;
      } else if (t === RES_TABLE_PACKAGE_TYPE) {
        var _buffer = new ByteBuffer(s);
        bb.offset = pos;
        bb.prependTo(_buffer);
        bb2 = ByteBuffer.wrap(_buffer, 'binary', true);
        bb2.LE();
        this.processPackage(bb2);
        realPackageCount++;
      } else {
        throw new Error('Unsupported type');
      }
      bb.offset = pos + s;
      if (!bb.remaining()) {
        break;
      }
    }
    if (realStringPoolCount !== 1) {
      throw new Error('More than 1 string pool found!');
    }
    if (realPackageCount !== packageCount) {
      throw new Error('Real package count not equals the declared count.');
    }
    return this.responseMap;
  };
  _proto.processPackage = function processPackage(bb) {
    // type
    bb.readShort();
    var headerSize = bb.readShort();
    // size
    bb.readInt();
    var id = bb.readInt();
    this.packageId = id;
    for (var i = 0; i < 256; i++) {
      bb.readUint8();
    }
    var typeStrings = bb.readInt();
    // lastPublicType
    bb.readInt();
    var keyStrings = bb.readInt();
    // lastPublicKey
    bb.readInt();
    if (typeStrings !== headerSize) {
      throw new Error('TypeStrings must immediately following the package structure header.');
    }
    var lastPosition = bb.offset;
    bb.offset = typeStrings;
    var bbTypeStrings = ResourceFinder.readBytes(bb, bb.limit - bb.offset);
    bb.offset = lastPosition;
    this.typeStringPool = this.processStringPool(bbTypeStrings);
    bb.offset = keyStrings;
    // keyType
    bb.readShort();
    // keyHeaderSize
    bb.readShort();
    var keySize = bb.readInt();
    lastPosition = bb.offset;
    bb.offset = keyStrings;
    var bbKeyStrings = ResourceFinder.readBytes(bb, bb.limit - bb.offset);
    bb.offset = lastPosition;
    this.keyStringPool = this.processStringPool(bbKeyStrings);
    bb.offset = keyStrings + keySize;
    var bb2;
    while (true) {
      var pos = bb.offset;
      var t = void 0,
        s = void 0;
      try {
        t = bb.readShort();
        // headerSize
        bb.readShort();
        s = bb.readInt();
      } catch (e) {
        break;
      }
      if (t === RES_TABLE_TYPE_SPEC_TYPE) {
        bb.offset = pos;
        bb2 = ResourceFinder.readBytes(bb, s);
        this.processTypeSpec(bb2);
      } else if (t === RES_TABLE_TYPE_TYPE) {
        bb.offset = pos;
        bb2 = ResourceFinder.readBytes(bb, s);
        this.processType(bb2);
      }
      if (s === 0) {
        break;
      }
      bb.offset = pos + s;
      if (!bb.remaining()) {
        break;
      }
    }
  };
  _proto.processConfig = function processConfig(bb) {
    var config = {
      language: '',
      region: '',
      locate: 'default'
    };
    // mcc
    bb.readShort();
    // mnc
    bb.readShort();
    var configLanguage = [bb.readByte(), bb.readByte()];
    var configRegion = [bb.readByte(), bb.readByte()];
    if (configLanguage.every(Boolean)) {
      config.language = String.fromCharCode.apply(String, configLanguage);
    }
    if (configRegion.every(Boolean)) {
      config.region = String.fromCharCode.apply(String, configRegion);
    }
    if (config.language) {
      config.locate = config.language;
    }
    if (config.region) {
      config.region += "-r" + config.region;
    }
    return config;
  };
  _proto.processType = function processType(bb) {
    // type
    bb.readShort();
    var headerSize = bb.readShort();
    // size
    bb.readInt();
    var id = bb.readByte();
    // res0
    bb.readByte();
    // res1
    bb.readShort();
    var entryCount = bb.readInt();
    var entriesStart = bb.readInt();
    var refKeys = {};
    var configSize = bb.readInt();
    var configBuffer = ResourceFinder.readBytes(bb, configSize);
    var resConfig = this.processConfig(configBuffer);
    // Skip the config data
    bb.offset = headerSize;
    if (headerSize + entryCount * 4 !== entriesStart) {
      throw new Error('HeaderSize, entryCount and entriesStart are not valid.');
    }
    // Start to get entry indices
    var entryIndices = new Array(entryCount);
    for (var i = 0; i < entryCount; ++i) {
      entryIndices[i] = bb.readInt();
    }
    // Get entries
    for (var _i = 0; _i < entryCount; _i++) {
      if (entryIndices[_i] === -1) {
        continue;
      }
      var resourceId = this.packageId << 24 | id << 16 | _i;
      var entryFlag = void 0,
        entryKey = void 0;
      try {
        // entrySize
        bb.readShort();
        entryFlag = bb.readShort();
        entryKey = bb.readInt();
      } catch (error) {
        break;
      }
      var valueDataType = void 0;
      var valueData = void 0;
      // Get the value (simple) or map (complex)
      var FLAG_COMPLEX = 0x0001;
      if ((entryFlag & FLAG_COMPLEX) === 0) {
        // valueSize
        bb.readShort();
        // valueRes0
        bb.readByte();
        valueDataType = bb.readByte();
        valueData = bb.readInt();
        var idStr = Number(resourceId).toString(16);
        var keyStr = this.keyStringPool[entryKey];
        var data = '';
        var key = parseInt(idStr, 16);
        var entryArr = this.entryMap[key] || [];
        entryArr.push(keyStr);
        this.entryMap[key] = entryArr;
        if (valueDataType === TYPE_STRING) {
          data = this.valueStringPool[valueData];
        } else if (valueDataType === TYPE_REFERENCE) {
          refKeys[idStr] = valueData;
        } else {
          data = String(valueData);
        }
        this.putIntoMap("@" + idStr, data, resConfig);
      } else {
        // Complex case
        // entryParent
        bb.readInt();
        var _entryCount = bb.readInt();
        for (var j = 0; j < _entryCount; j++) {
          // refName
          bb.readInt();
          // valueSize
          bb.readShort();
          // valueRes0
          bb.readByte();
          // valueDataType
          bb.readByte();
          // valueData
          bb.readInt();
        }
      }
    }
    for (var refKey in refKeys) {
      var values = this.responseMap['@' + Number(refKeys[refKey]).toString(16).toUpperCase()];
      if (values && Object.keys(values).length < 1000) {
        for (var value in values) {
          this.putIntoMap('@' + refKey, value, resConfig);
        }
      }
    }
  };
  _proto.processStringPool = function processStringPool(bb) {
    // type
    bb.readShort();
    // headerSize
    bb.readShort();
    // size
    bb.readInt();
    var stringCount = bb.readInt();
    // styleCount
    bb.readInt();
    var flags = bb.readInt();
    var stringsStart = bb.readInt();
    // stylesStart
    bb.readInt();
    var u16len, buffer;
    var isUTF_8 = (flags & 256) !== 0;
    var offsets = new Array(stringCount);
    for (var i = 0; i < stringCount; ++i) {
      offsets[i] = bb.readInt();
    }
    var strings = new Array(stringCount);
    for (var _i2 = 0; _i2 < stringCount; ++_i2) {
      var pos = stringsStart + offsets[_i2];
      bb.offset = pos;
      strings[_i2] = '';
      if (isUTF_8) {
        u16len = bb.readUint8();
        if ((u16len & 0x80) !== 0) {
          u16len = ((u16len & 0x7f) << 8) + bb.readUint8();
        }
        var u8len = bb.readUint8();
        if ((u8len & 0x80) !== 0) {
          u8len = ((u8len & 0x7f) << 8) + bb.readUint8();
        }
        if (u8len > 0) {
          buffer = ResourceFinder.readBytes(bb, u8len);
          try {
            strings[_i2] = ByteBuffer.wrap(buffer, 'utf8', true).toString('utf8');
          } catch (e) {
          }
        } else {
          strings[_i2] = '';
        }
      } else {
        u16len = bb.readUint16();
        if ((u16len & 0x8000) !== 0) {
          // larger than 32768
          u16len = ((u16len & 0x7fff) << 16) + bb.readUint16();
        }
        if (u16len > 0) {
          var len = u16len * 2;
          buffer = ResourceFinder.readBytes(bb, len);
          try {
            strings[_i2] = ByteBuffer.wrap(buffer, 'utf8', true).toString('utf8');
          } catch (e) {
          }
        }
      }
    }
    return strings;
  };
  _proto.processTypeSpec = function processTypeSpec(bb) {
    // type
    bb.readShort();
    // headerSize
    bb.readShort();
    // size
    bb.readInt();
    var id = bb.readByte();
    // res0
    bb.readByte();
    // res1
    bb.readShort();
    var entryCount = bb.readInt();
    var flags = new Array(entryCount);
    for (var i = 0; i < entryCount; ++i) {
      flags[i] = bb.readInt();
    }
  };
  _proto.putIntoMap = function putIntoMap(resId, value, config) {
    if (!this.responseMap[resId.toUpperCase()]) {
      this.responseMap[resId.toUpperCase()] = [];
    }
    this.responseMap[resId.toUpperCase()].push({
      value: value,
      locate: config.locate
    });
  };
  return ResourceFinder;
}();

/**
 * map file place with resourceMap
 * @param {Object} apkInfo // json info parsed from .apk file
 * @param {Object} resourceMap // resourceMap
 */
function mapInfoResource(apkInfo, resourceMap) {
  iteratorObj(apkInfo);
  return apkInfo;
  function iteratorObj(obj) {
    for (var i in obj) {
      if (isArray(obj[i])) {
        iteratorArray(obj[i]);
      } else if (isObject(obj[i])) {
        iteratorObj(obj[i]);
      } else if (isPrimitive(obj[i])) {
        if (isResources(obj[i])) {
          obj[i] = resourceMap[transKeyToMatchResourceMap(obj[i])];
        }
      }
    }
  }
  function iteratorArray(array) {
    var l = array.length;
    for (var i = 0; i < l; i++) {
      if (isArray(array[i])) {
        iteratorArray(array[i]);
      } else if (isObject(array[i])) {
        iteratorObj(array[i]);
      } else if (isPrimitive(array[i])) {
        if (isResources(array[i])) {
          array[i] = resourceMap[transKeyToMatchResourceMap(array[i])];
        }
      }
    }
  }
  function isResources(attrValue) {
    if (!attrValue) return false;
    if (typeof attrValue !== 'string') {
      attrValue = attrValue.toString();
    }
    return attrValue.indexOf('resourceId:') === 0;
  }
  function transKeyToMatchResourceMap(resourceId) {
    return '@' + resourceId.replace('resourceId:0x', '').toUpperCase();
  }
}

/**
 * find .apk file's icon path from json info
 * @param info // json info parsed from .apk file
 */
function findApkIconPath(info) {
  var _info$application$ico;
  if (!((_info$application$ico = info.application.icon) != null && _info$application$ico.length)) {
    return '';
  }
  var rulesMap = {
    mdpi: 48,
    hdpi: 72,
    xhdpi: 96,
    xxdpi: 144,
    xxxhdpi: 192
  };
  var resultMap = {};
  var maxDpiIcon = {
    dpi: 120,
    icon: ''
  };
  var _loop = function _loop(i) {
    if (Object.prototype.hasOwnProperty.call(rulesMap, i)) {
      var element = rulesMap[i];
      info.application.icon.some(function (_ref2) {
        var icon = _ref2.value;
        if (icon && icon.indexOf(i) !== -1) {
          resultMap['application-icon-' + element] = icon;
          return true;
        }
        return false;
      });
      // get the maximal size icon
      if (resultMap['application-icon-' + element] && element >= maxDpiIcon.dpi) {
        maxDpiIcon.dpi = element;
        maxDpiIcon.icon = resultMap['application-icon-' + element];
      }
    }
  };
  for (var i in rulesMap) {
    _loop(i);
  }
  if (Object.keys(resultMap).length === 0 || !maxDpiIcon.icon) {
    maxDpiIcon.dpi = 120;
    var _ref = info.application.icon || [{}],
      _ref$0$value = _ref[0].value,
      value = _ref$0$value === void 0 ? '' : _ref$0$value;
    maxDpiIcon.icon = value;
    resultMap['applicataion-icon-120'] = maxDpiIcon.icon;
  }
  return maxDpiIcon.icon;
}

/**
 * transform buffer to base64
 * @param {Buffer} buffer
 */
function getBase64FromBuffer(buffer) {
  return 'data:image/png;base64,' + buffer.toString('base64');
}

var MANIFEST_NAME = /^androidmanifest\.xml$/;
var RESOURCE_NAME = /^resources\.arsc$/;
var ApkParser = /*#__PURE__*/function (_Zip) {
  function ApkParser(file) {
    var _this;
    _this = _Zip.call(this, file) || this;
    _this.result = {};
    _this.result = {};
    if (!(_this instanceof ApkParser)) {
      return new ApkParser(file) || _assertThisInitialized(_this);
    }
    return _this;
  }
  _inheritsLoose(ApkParser, _Zip);
  var _proto = ApkParser.prototype;
  _proto.parse = function parse() {
    var _this2 = this;
    var entries = [MANIFEST_NAME, RESOURCE_NAME];
    var _entries$map = entries.map(function (entry) {
        return entry.toString();
      }),
      MANIFEST_KEY = _entries$map[0],
      RESOURCE_KEY = _entries$map[1];
    return new Promise(function (resolve, reject) {
      _this2.getEntries(entries).then(function (buffers) {
        if (!buffers[MANIFEST_KEY]) {
          throw new Error("AndroidManifest.xml can't be found.");
        }
        var apkInfo = _this2.parseManifest(buffers[MANIFEST_KEY]);
        if (!buffers[RESOURCE_KEY]) {
          resolve(apkInfo);
        } else {
          // parse resourceMap
          var resourceMap = _this2.parseResourceMap(buffers[RESOURCE_KEY]);
          // update apkInfo with resourceMap
          apkInfo = mapInfoResource(apkInfo, resourceMap);
          // find icon path and parse icon
          var iconPath = findApkIconPath(apkInfo);
          apkInfo.icon = null;
          if (iconPath) {
            _this2.getEntry(iconPath).then(function (iconBuffer) {
              apkInfo.icon = iconBuffer ? getBase64FromBuffer(iconBuffer) : null;
            })["catch"](function (e) {
              console.warn('[Warning] failed to parse icon: ', e);
            })["finally"](function () {
              resolve(apkInfo);
            });
          } else {
            console.warn('[Warning] cannot find any icon path');
            resolve(apkInfo);
          }
        }
      })["catch"](reject);
    });
  };
  _proto.parseManifest = function parseManifest(buffer) {
    try {
      var parser = new ManifestParser(buffer);
      return parser.parse();
    } catch (error) {
      throw new Error("Parse AndroidManifest.xml error: " + error);
    }
  };
  _proto.parseResourceMap = function parseResourceMap(buffer) {
    try {
      return new ResourceFinder().processResourceTable(buffer);
    } catch (e) {
      throw new Error('Parser resources.arsc error: ' + e);
    }
  };
  return ApkParser;
}(Zip);

/**
 * find .ipa file's icon path from json info
 * @param info // json info parsed from .ipa file
 */
function findIpaIconPath(info) {
  if (info.CFBundleIcons && info.CFBundleIcons.CFBundlePrimaryIcon && info.CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles && info.CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles.length) {
    return info.CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles[info.CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles.length - 1];
  } else if (info.CFBundleIconFiles && info.CFBundleIconFiles.length) {
    return info.CFBundleIconFiles[info.CFBundleIconFiles.length - 1];
  } else {
    return '.app/Icon.png';
  }
}

var PLIST_NAME = /payload\/.+?\.app\/info.plist$/;
var PROVISION_NAME = /payload\/.+?\.app\/embedded.mobileprovision/;
var IpaParser = /*#__PURE__*/function (_Zip) {
  /**
   * parser for parsing .ipa file
   * @param {String | File | Blob} file // file's path in Node, instance of File or Blob in Browser
   */
  function IpaParser(file) {
    var _this;
    _this = _Zip.call(this, file) || this;
    if (!(_this instanceof IpaParser)) {
      return new IpaParser(file) || _assertThisInitialized(_this);
    }
    return _this;
  }
  _inheritsLoose(IpaParser, _Zip);
  var _proto = IpaParser.prototype;
  _proto.parse = function parse() {
    var _this2 = this;
    var entries = [PLIST_NAME, PROVISION_NAME];
    var _entries$map = entries.map(function (entry) {
        return entry.toString();
      }),
      PLIST_KEY = _entries$map[0],
      PROVISION_KEY = _entries$map[1];
    return new Promise(function (resolve, reject) {
      _this2.getEntries(entries).then(function (buffers) {
        if (!buffers[PLIST_NAME.toString()]) {
          throw new Error("Info.plist can't be found.");
        }
        var plistInfo = _this2.parsePlist(buffers[PLIST_KEY]);
        // parse mobile provision
        var provisionInfo = _this2.parseProvision(buffers[PROVISION_KEY]);
        plistInfo.mobileProvision = provisionInfo;
        // find icon path and parse icon
        var iconRegex = new RegExp(findIpaIconPath(plistInfo).toLowerCase());
        _this2.getEntry(iconRegex).then(function (iconBuffer) {
          try {
            // In general, the ipa file's icon has been specially processed, should be converted
            plistInfo.icon = iconBuffer ? getBase64FromBuffer(cgbiToPng.revert(iconBuffer)) : null;
          } catch (err) {
            if (isBrowser()) {
              // Normal conversion in other cases
              plistInfo.icon = iconBuffer ? getBase64FromBuffer(
              // @ts-ignore
              window.btoa(String.fromCharCode.apply(String, iconBuffer))) : null;
            } else {
              plistInfo.icon = null;
              console.warn('[Warning] failed to parse icon: ', err);
            }
          }
          resolve(plistInfo);
        })["catch"](reject);
      })["catch"](reject);
    });
  }
  /**
   * Parse plist
   * @param {Buffer} buffer // plist file's buffer
   */;
  _proto.parsePlist = function parsePlist(buffer) {
    var result;
    var bufferType = buffer[0];
    if (bufferType === 60 || bufferType === '<' || bufferType === 239) {
      result = plist.parse(buffer.toString());
    } else if (bufferType === 98) {
      result = bplist.parseBuffer(buffer)[0];
    } else {
      throw new Error('Unknown plist buffer type.');
    }
    return result;
  }
  /**
   * parse provision
   * @param {Buffer} buffer // provision file's buffer
   */;
  _proto.parseProvision = function parseProvision(buffer) {
    var info = {};
    if (buffer) {
      var content = buffer.toString('utf-8');
      var firstIndex = content.indexOf('<?xml');
      var endIndex = content.indexOf('</plist>');
      content = content.slice(firstIndex, endIndex + 8);
      if (content) {
        info = plist.parse(content);
      }
    }
    return info;
  };
  return IpaParser;
}(Zip);

var ExtensionNameEnum;
(function (ExtensionNameEnum) {
  ExtensionNameEnum[ExtensionNameEnum["IPA"] = 0] = "IPA";
  ExtensionNameEnum[ExtensionNameEnum["APK"] = 1] = "APK";
  ExtensionNameEnum[ExtensionNameEnum["OTHER"] = -1] = "OTHER";
})(ExtensionNameEnum || (ExtensionNameEnum = {}));
/**
 * get file extension
 * @param str - file name string
 */
function getExtensionName(str) {
  var reg = /\.([^\.]+)$/;
  var matched = reg.exec(str);
  if (matched) {
    var name = matched[1];
    if (name === 'ipa') {
      return ExtensionNameEnum.IPA;
    } else if (name === 'apk') {
      return ExtensionNameEnum.APK;
    }
  }
  return ExtensionNameEnum.OTHER;
}

var AppInfoParser = /*#__PURE__*/function () {
  function AppInfoParser(file) {
    if (!file) {
      throw new Error("Param miss: file(file's path in Node, instance of File or Blob in browser).");
    }
    this.type = getExtensionName(typeof file === 'string' ? file : file.name);
    this.file = file;
    switch (this.type) {
      case ExtensionNameEnum.IPA:
        this.parser = new IpaParser(this.file);
        break;
      case ExtensionNameEnum.APK:
        this.parser = new ApkParser(this.file);
        break;
      default:
        throw new Error('Unsupported file type, only support .ipa or .apk file.');
    }
  }
  var _proto = AppInfoParser.prototype;
  _proto.parse = function parse() {
    return this.parser.parse();
  };
  return AppInfoParser;
}();

exports.default = AppInfoParser;
//# sourceMappingURL=app-info-parser-dist.cjs.development.js.map
