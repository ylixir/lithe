(function () {
  global.nexus = {};
})();
(function () {
  function nil63(x) {
    return((x === undefined));
  }
  function is63(x) {
    return(!(nil63(x)));
  }
  function length(x) {
    return(x.length);
  }
  function empty63(x) {
    return((length(x) === 0));
  }
  function some63(x) {
    return((length(x) > 0));
  }
  function hd(l) {
    return(l[0]);
  }
  function type(x) {
    return(typeof(x));
  }
  function string63(x) {
    return((type(x) === "string"));
  }
  function number63(x) {
    return((type(x) === "number"));
  }
  function boolean63(x) {
    return((type(x) === "boolean"));
  }
  function function63(x) {
    return((type(x) === "function"));
  }
  function composite63(x) {
    return((type(x) === "object"));
  }
  function atom63(x) {
    return(!(composite63(x)));
  }
  function table63(x) {
    return((composite63(x) && nil63(hd(x))));
  }
  function list63(x) {
    return((composite63(x) && is63(hd(x))));
  }
  function substring(str, from, upto) {
    return((str.substring)(from, upto));
  }
  function sublist(l, from, upto) {
    return((Array.prototype.slice.call)(l, from, upto));
  }
  function sub(x, from, upto) {
    var _g3 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g3, upto));
    } else {
      var l = sublist(x, _g3, upto);
      var k = undefined;
      var _g4 = x;
      for (k in _g4) {
        if (isNaN(parseInt(k))) {
          var v = _g4[k];
          l[k] = v;
        }
      }
      return(l);
    }
  }
  function inner(x) {
    return(sub(x, 1, (length(x) - 1)));
  }
  function tl(l) {
    return(sub(l, 1));
  }
  function char(str, n) {
    return((str.charAt)(n));
  }
  function code(str, n) {
    return((str.charCodeAt)(n));
  }
  function string_literal63(x) {
    return((string63(x) && (char(x, 0) === "\"")));
  }
  function id_literal63(x) {
    return((string63(x) && (char(x, 0) === "|")));
  }
  function add(l, x) {
    return((l.push)(x));
  }
  function drop(l) {
    return((l.pop)());
  }
  function last(l) {
    return(l[(length(l) - 1)]);
  }
  function reverse(l) {
    var l1 = [];
    var i = (length(l) - 1);
    while ((i >= 0)) {
      add(l1, l[i]);
      i = (i - 1);
    }
    return(l1);
  }
  function join(l1, l2) {
    if ((nil63(l2) && nil63(l1))) {
      return([]);
    } else if (nil63(l1)) {
      return(join([], l2));
    } else if (nil63(l2)) {
      return(join(l1, []));
    } else if ((atom63(l1) && atom63(l2))) {
      return([l1, l2]);
    } else if (atom63(l1)) {
      return(join([l1], l2));
    } else if (atom63(l2)) {
      return(join(l1, [l2]));
    } else {
      var l = [];
      var skip63 = false;
      if ((list63(l1) && list63(l2))) {
        l = (l1.concat)(l2);
        skip63 = true;
      }
      if (!(skip63)) {
        var i = 0;
        var len = length(l1);
        while ((i < len)) {
          l[i] = l1[i];
          i = (i + 1);
        }
        while ((i < (len + length(l2)))) {
          l[i] = l2[(i - len)];
          i = (i + 1);
        }
      }
      var k = undefined;
      var _g5 = l1;
      for (k in _g5) {
        if (isNaN(parseInt(k))) {
          var v = _g5[k];
          l[k] = v;
        }
      }
      var _g7 = undefined;
      var _g6 = l2;
      for (_g7 in _g6) {
        if (isNaN(parseInt(_g7))) {
          var v = _g6[_g7];
          l[_g7] = v;
        }
      }
      return(l);
    }
  }
  function reduce(f, x) {
    if (empty63(x)) {
      return(x);
    } else if ((length(x) === 1)) {
      return(hd(x));
    } else {
      return(f(hd(x), reduce(f, tl(x))));
    }
  }
  function keep(f, l) {
    var l1 = [];
    var _g9 = 0;
    var _g8 = l;
    while ((_g9 < length(_g8))) {
      var x = _g8[_g9];
      if (f(x)) {
        add(l1, x);
      }
      _g9 = (_g9 + 1);
    }
    return(l1);
  }
  function find(f, l) {
    var _g11 = 0;
    var _g10 = l;
    while ((_g11 < length(_g10))) {
      var x = _g10[_g11];
      var _g12 = f(x);
      if (_g12) {
        return(_g12);
      }
      _g11 = (_g11 + 1);
    }
  }
  function pairwise(l) {
    var i = 0;
    var l1 = [];
    while ((i < length(l))) {
      add(l1, [l[i], l[(i + 1)]]);
      i = (i + 2);
    }
    return(l1);
  }
  function iterate(f, count) {
    var i = 0;
    while ((i < count)) {
      f(i);
      i = (i + 1);
    }
  }
  function replicate(n, x) {
    var l = [];
    iterate(function () {
      return(add(l, x));
    }, n);
    return(l);
  }
  function splice(x) {
    return({_splice: true, value: x});
  }
  function splice63(x) {
    return((table63(x) && x._splice));
  }
  function map(f, l) {
    var l1 = [];
    var _g14 = 0;
    var _g13 = l;
    while ((_g14 < length(_g13))) {
      var x = _g13[_g14];
      var x1 = f(x);
      if (splice63(x1)) {
        l1 = join(l1, x1.value);
      } else if (is63(x1)) {
        add(l1, x1);
      }
      _g14 = (_g14 + 1);
    }
    return(l1);
  }
  function map42(f, t) {
    var l = map(f, t);
    var k = undefined;
    var _g15 = t;
    for (k in _g15) {
      if (isNaN(parseInt(k))) {
        var v = _g15[k];
        var x = f(v);
        if (is63(x)) {
          l[k] = x;
        }
      }
    }
    return(l);
  }
  function mapt(f, t) {
    var t1 = {};
    var k = undefined;
    var _g16 = t;
    for (k in _g16) {
      if (isNaN(parseInt(k))) {
        var v = _g16[k];
        var x = f(k, v);
        if (is63(x)) {
          t1[k] = x;
        }
      }
    }
    return(t1);
  }
  function mapo(f, t) {
    var o = [];
    var k = undefined;
    var _g17 = t;
    for (k in _g17) {
      if (isNaN(parseInt(k))) {
        var v = _g17[k];
        var x = f(k, v);
        if (is63(x)) {
          add(o, k);
          add(o, x);
        }
      }
    }
    return(o);
  }
  function keys63(t) {
    var k = undefined;
    var k1 = undefined;
    var _g18 = t;
    for (k1 in _g18) {
      if (isNaN(parseInt(k1))) {
        var v = _g18[k1];
        k = k1;
        break;
      }
    }
    return(k);
  }
  function stash(args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var k = undefined;
      var _g19 = args;
      for (k in _g19) {
        if (isNaN(parseInt(k))) {
          var v = _g19[k];
          p[k] = v;
        }
      }
      return(join(args, [p]));
    } else {
      return(args);
    }
  }
  function unstash(args) {
    if (empty63(args)) {
      return([]);
    } else {
      var l = last(args);
      if ((table63(l) && l._stash)) {
        var args1 = sub(args, 0, (length(args) - 1));
        var k = undefined;
        var _g20 = l;
        for (k in _g20) {
          if (isNaN(parseInt(k))) {
            var v = _g20[k];
            if ((k != "_stash")) {
              args1[k] = v;
            }
          }
        }
        return(args1);
      } else {
        return(args);
      }
    }
  }
  function setenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g21 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var k1 = undefined;
      var _g22 = _g21;
      for (k1 in _g22) {
        if (isNaN(parseInt(k1))) {
          var v = _g22[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  }
  function extend(t) {
    var xs = unstash(sublist(arguments, 1));
    var _g23 = sub(xs, 0);
    return(join(t, _g23));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g24 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g25 = t;
    for (k in _g25) {
      if (isNaN(parseInt(k))) {
        var v = _g25[k];
        if (!(_g24[k])) {
          t1[k] = v;
        }
      }
    }
    return(t1);
  }
  function search(str, pattern, start) {
    var i = (str.indexOf)(pattern, start);
    if ((i >= 0)) {
      return(i);
    }
  }
  function split(str, sep) {
    return((str.split)(sep));
  }
  function cat() {
    var xs = unstash(sublist(arguments, 0));
    var _g26 = sub(xs, 0);
    if (empty63(_g26)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g26));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g27 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g27));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g28 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g28)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g29 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g29));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g30 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g30)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g31 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g31)));
  }
  function _62(a, b) {
    return((a > b));
  }
  function _60(a, b) {
    return((a < b));
  }
  function _61(a, b) {
    return((a === b));
  }
  function _6261(a, b) {
    return((a >= b));
  }
  function _6061(a, b) {
    return((a <= b));
  }
  var fs = require("fs");
  function read_file(path) {
    return((fs.readFileSync)(path, "utf8"));
  }
  function write_file(path, data) {
    return((fs.writeFileSync)(path, data, "utf8"));
  }
  print = function (x) {
    return((console.log)(x));
  };
  function type(x) {
    return(typeof(x));
  }
  function write(x) {
    return((process.stdout.write)(x));
  }
  function exit(code) {
    return((process.exit)(code));
  }
  function parse_number(str) {
    var n = parseFloat(str);
    if (!(isNaN(n))) {
      return(n);
    }
  }
  function to_string(x) {
    if (nil63(x)) {
      return("nil");
    } else if (boolean63(x)) {
      if (x) {
        return("true");
      } else {
        return("false");
      }
    } else if (function63(x)) {
      return("#<function>");
    } else if (atom63(x)) {
      return((x + ""));
    } else {
      var str = "(";
      var x1 = sub(x);
      var k = undefined;
      var _g32 = x;
      for (k in _g32) {
        if (isNaN(parseInt(k))) {
          var v = _g32[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g33 = x1;
      while ((i < length(_g33))) {
        var y = _g33[i];
        str = (str + to_string(y));
        if ((i < (length(x1) - 1))) {
          str = (str + " ");
        }
        i = (i + 1);
      }
      return((str + ")"));
    }
  }
  function apply(f, args) {
    var _g34 = stash(args);
    return((f.apply)(f, _g34));
  }
  var id_count = 0;
  function make_id() {
    id_count = (id_count + 1);
    return(("_g" + id_count));
  }
  function _37message_handler(msg) {
    var i = search(msg, ": ");
    return(sub(msg, (i + 2)));
  }
  var _g35 = {};
  nexus.runtime = _g35;
  _g35.split = split;
  _g35["boolean?"] = boolean63;
  _g35["empty?"] = empty63;
  _g35.map = map;
  _g35["function?"] = function63;
  _g35.extend = extend;
  _g35["number?"] = number63;
  _g35.cat = cat;
  _g35["keys?"] = keys63;
  _g35.pairwise = pairwise;
  _g35["%message-handler"] = _37message_handler;
  _g35.replicate = replicate;
  _g35.join = join;
  _g35.drop = drop;
  _g35.find = find;
  _g35["make-id"] = make_id;
  _g35.apply = apply;
  _g35["to-string"] = to_string;
  _g35["parse-number"] = parse_number;
  _g35.mapo = mapo;
  _g35.exit = exit;
  _g35[">="] = _6261;
  _g35.splice = splice;
  _g35.keep = keep;
  _g35["read-file"] = read_file;
  _g35.sublist = sublist;
  _g35.inner = inner;
  _g35.write = write;
  _g35.add = add;
  _g35["="] = _61;
  _g35.sub = sub;
  _g35[">"] = _62;
  _g35["%"] = _37;
  _g35["/"] = _47;
  _g35["string-literal?"] = string_literal63;
  _g35.reverse = reverse;
  _g35["list?"] = list63;
  _g35["+"] = _43;
  _g35.length = length;
  _g35.search = search;
  _g35.exclude = exclude;
  _g35.iterate = iterate;
  _g35.substring = substring;
  _g35.unstash = unstash;
  _g35.stash = stash;
  _g35.tl = tl;
  _g35["map*"] = map42;
  _g35["write-file"] = write_file;
  _g35.reduce = reduce;
  _g35["-"] = _;
  _g35.last = last;
  _g35["id-literal?"] = id_literal63;
  _g35["*"] = _42;
  _g35.char = char;
  _g35.code = code;
  _g35.mapt = mapt;
  _g35["<="] = _6061;
  _g35["<"] = _60;
  _g35["nil?"] = nil63;
  _g35.setenv = setenv;
  _g35["atom?"] = atom63;
  _g35["table?"] = table63;
  _g35["composite?"] = composite63;
  _g35["is?"] = is63;
  _g35.hd = hd;
  _g35["string?"] = string63;
  _g35["some?"] = some63;
})();
(function () {
  var _g42 = nexus.runtime;
  var split = _g42.split;
  var boolean63 = _g42["boolean?"];
  var table63 = _g42["table?"];
  var search = _g42.search;
  var function63 = _g42["function?"];
  var number63 = _g42["number?"];
  var is63 = _g42["is?"];
  var cat = _g42.cat;
  var keys63 = _g42["keys?"];
  var pairwise = _g42.pairwise;
  var atom63 = _g42["atom?"];
  var string_literal63 = _g42["string-literal?"];
  var replicate = _g42.replicate;
  var join = _g42.join;
  var stash = _g42.stash;
  var drop = _g42.drop;
  var splice = _g42.splice;
  var substring = _g42.substring;
  var mapo = _g42.mapo;
  var keep = _g42.keep;
  var inner = _g42.inner;
  var write = _g42.write;
  var add = _g42.add;
  var reduce = _g42.reduce;
  var sub = _g42.sub;
  var list63 = _g42["list?"];
  var length = _g42.length;
  var iterate = _g42.iterate;
  var id_literal63 = _g42["id-literal?"];
  var _37 = _g42["%"];
  var write_file = _g42["write-file"];
  var _43 = _g42["+"];
  var _ = _g42["-"];
  var exclude = _g42.exclude;
  var _42 = _g42["*"];
  var _37message_handler = _g42["%message-handler"];
  var reverse = _g42.reverse;
  var make_id = _g42["make-id"];
  var apply = _g42.apply;
  var mapt = _g42.mapt;
  var unstash = _g42.unstash;
  var char = _g42.char;
  var _6061 = _g42["<="];
  var tl = _g42.tl;
  var _60 = _g42["<"];
  var _61 = _g42["="];
  var setenv = _g42.setenv;
  var to_string = _g42["to-string"];
  var code = _g42.code;
  var exit = _g42.exit;
  var nil63 = _g42["nil?"];
  var read_file = _g42["read-file"];
  var empty63 = _g42["empty?"];
  var extend = _g42.extend;
  var parse_number = _g42["parse-number"];
  var _62 = _g42[">"];
  var map = _g42.map;
  var hd = _g42.hd;
  var _47 = _g42["/"];
  var sublist = _g42.sublist;
  var _6261 = _g42[">="];
  var string63 = _g42["string?"];
  var composite63 = _g42["composite?"];
  var find = _g42.find;
  var last = _g42.last;
  var map42 = _g42["map*"];
  var some63 = _g42["some?"];
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g43 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g44 = keys63(_g43);
        if (_g44) {
          return(b[_g44]);
        } else {
          return(b);
        }
      }
    }
  }
  function macro_function(k) {
    return(getenv(k, {_stash: true, macro: true}));
  }
  function macro63(k) {
    return(is63(macro_function(k)));
  }
  function special63(k) {
    return(is63(getenv(k, {_stash: true, special: true})));
  }
  function special_form63(form) {
    return((list63(form) && special63(hd(form))));
  }
  function symbol_expansion(k) {
    return(getenv(k, {_stash: true, symbol: true}));
  }
  function symbol63(k) {
    return(is63(symbol_expansion(k)));
  }
  function variable63(k) {
    var b = find(function (frame) {
      return((frame[k] || frame._scope));
    }, reverse(environment));
    return((table63(b) && is63(b.variable)));
  }
  function global63(k) {
    return(getenv(k, {_stash: true, global: true}));
  }
  function bound63(x) {
    return((macro63(x) || special63(x) || symbol63(x) || variable63(x) || global63(x)));
  }
  function escape(str) {
    var str1 = "\"";
    var i = 0;
    while ((i < length(str))) {
      var c = char(str, i);
      var c1 = (function () {
        if ((c === "\n")) {
          return("\\n");
        } else if ((c === "\"")) {
          return("\\\"");
        } else if ((c === "\\")) {
          return("\\\\");
        } else {
          return(c);
        }
      })();
      str1 = (str1 + c1);
      i = (i + 1);
    }
    return((str1 + "\""));
  }
  function quoted(form) {
    if (string63(form)) {
      return(escape(form));
    } else if (atom63(form)) {
      return(form);
    } else {
      return(join(["list"], map42(quoted, form)));
    }
  }
  function stash42(args) {
    if (keys63(args)) {
      var l = ["%object", "_stash", true];
      var k = undefined;
      var _g45 = args;
      for (k in _g45) {
        if (isNaN(parseInt(k))) {
          var v = _g45[k];
          add(l, k);
          add(l, v);
        }
      }
      return(join(args, [l]));
    } else {
      return(args);
    }
  }
  function bind(lh, rh) {
    if ((composite63(lh) && list63(rh))) {
      var id = make_id();
      return(join([join([id, rh])], bind(lh, id)));
    } else if (atom63(lh)) {
      return(join([join([lh, rh])]));
    } else {
      var bs = [];
      var r = lh.rest;
      var i = 0;
      var _g46 = lh;
      while ((i < length(_g46))) {
        var x = _g46[i];
        bs = join(bs, bind(x, join(["at", rh, i])));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
      }
      var k = undefined;
      var _g47 = lh;
      for (k in _g47) {
        if (isNaN(parseInt(k))) {
          var v = _g47[k];
          if ((v === true)) {
            v = k;
          }
          if ((k != "rest")) {
            bs = join(bs, bind(v, join(["get", rh, join(["quote", k])])));
          }
        }
      }
      return(bs);
    }
  }
  function bind42(args, body) {
    var args1 = [];
    function rest() {
      if ((target === "js")) {
        return(join(["unstash", join(["sublist", "arguments", length(args1)])]));
      } else {
        add(args1, "|...|");
        return(["unstash", ["list", "|...|"]]);
      }
    }
    if (atom63(args)) {
      return([args1, join([join(["let", [args, rest()]], body)])]);
    } else {
      var bs = [];
      var r = (args.rest || (keys63(args) && make_id()));
      var _g49 = 0;
      var _g48 = args;
      while ((_g49 < length(_g48))) {
        var arg = _g48[_g49];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g49 = (_g49 + 1);
      }
      if (r) {
        bs = join(bs, [r, rest()]);
      }
      if (keys63(args)) {
        bs = join(bs, [sub(args, length(args)), r]);
      }
      if (empty63(bs)) {
        return([args1, body]);
      } else {
        return([args1, join([join(["let", bs], body)])]);
      }
    }
  }
  function quoting63(depth) {
    return(number63(depth));
  }
  function quasiquoting63(depth) {
    return((quoting63(depth) && (depth > 0)));
  }
  function can_unquote63(depth) {
    return((quoting63(depth) && (depth === 1)));
  }
  function quasisplice63(x, depth) {
    return((list63(x) && can_unquote63(depth) && (hd(x) === "unquote-splicing")));
  }
  function macroexpand(form) {
    if (symbol63(form)) {
      return(macroexpand(symbol_expansion(form)));
    } else if (atom63(form)) {
      return(form);
    } else {
      var x = hd(form);
      if ((x === "%for")) {
        var _g37 = form[0];
        var _g50 = form[1];
        var t = _g50[0];
        var k = _g50[1];
        var body = sub(form, 2);
        return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g38 = form[0];
        var args = form[1];
        var _g51 = sub(form, 2);
        add(environment, {_scope: true});
        var _g53 = (function () {
          var _g55 = 0;
          var _g54 = args;
          while ((_g55 < length(_g54))) {
            var _g52 = _g54[_g55];
            setenv(_g52, {_stash: true, variable: true});
            _g55 = (_g55 + 1);
          }
          return(join(["%function", map42(macroexpand, args)], macroexpand(_g51)));
        })();
        drop(environment);
        return(_g53);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g39 = form[0];
        var name = form[1];
        var _g56 = form[2];
        var _g57 = sub(form, 3);
        add(environment, {_scope: true});
        var _g59 = (function () {
          var _g61 = 0;
          var _g60 = _g56;
          while ((_g61 < length(_g60))) {
            var _g58 = _g60[_g61];
            setenv(_g58, {_stash: true, variable: true});
            _g61 = (_g61 + 1);
          }
          return(join([x, name, map42(macroexpand, _g56)], macroexpand(_g57)));
        })();
        drop(environment);
        return(_g59);
      } else if (macro63(x)) {
        return(macroexpand(apply(macro_function(x), tl(form))));
      } else {
        return(map42(macroexpand, form));
      }
    }
  }
  var quasiexpand;
  var quasiquote_list;
  quasiquote_list = function (form, depth) {
    var xs = [["list"]];
    var k = undefined;
    var _g62 = form;
    for (k in _g62) {
      if (isNaN(parseInt(k))) {
        var v = _g62[k];
        var _g63 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g63;
      }
    }
    var _g65 = 0;
    var _g64 = form;
    while ((_g65 < length(_g64))) {
      var x = _g64[_g65];
      if (quasisplice63(x, depth)) {
        var _g66 = quasiexpand(x[1]);
        add(xs, _g66);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g65 = (_g65 + 1);
    }
    var pruned = keep(function (x) {
      return(((length(x) > 1) || !((hd(x) === "list")) || keys63(x)));
    }, xs);
    return(join(["join*"], pruned));
  };
  quasiexpand = function (form, depth) {
    if (quasiquoting63(depth)) {
      if (atom63(form)) {
        return(["quote", form]);
      } else if ((can_unquote63(depth) && (hd(form) === "unquote"))) {
        return(quasiexpand(form[1]));
      } else if (((hd(form) === "unquote") || (hd(form) === "unquote-splicing"))) {
        return(quasiquote_list(form, (depth - 1)));
      } else if ((hd(form) === "quasiquote")) {
        return(quasiquote_list(form, (depth + 1)));
      } else {
        return(quasiquote_list(form, depth));
      }
    } else if (atom63(form)) {
      return(form);
    } else if ((hd(form) === "quote")) {
      return(form);
    } else if ((hd(form) === "quasiquote")) {
      return(quasiexpand(form[1], 1));
    } else {
      return(map42(function (x) {
        return(quasiexpand(x, depth));
      }, form));
    }
  };
  global.indent_level = 0;
  function indentation() {
    return(apply(cat, replicate(indent_level, "  ")));
  }
  var reserved = {"=": true, "return": true, "false": true, "for": true, "or": true, "and": true, "*": true, "end": true, "if": true, "instanceof": true, "break": true, "until": true, "in": true, "nil": true, "case": true, "var": true, "<=": true, "void": true, ">": true, "local": true, "not": true, "finally": true, "continue": true, "this": true, "throw": true, "-": true, "delete": true, "%": true, "/": true, "elseif": true, "else": true, "+": true, "while": true, "switch": true, "function": true, "do": true, "then": true, "true": true, "with": true, "typeof": true, "catch": true, "debugger": true, "default": true, ">=": true, "repeat": true, "new": true, "<": true, "==": true, "try": true};
  function numeric63(n) {
    return(((n > 47) && (n < 58)));
  }
  function valid_char63(n) {
    return((numeric63(n) || ((n > 64) && (n < 91)) || ((n > 96) && (n < 123)) || (n === 95)));
  }
  function valid_id63(id) {
    if (empty63(id)) {
      return(false);
    } else if (special63(id)) {
      return(false);
    } else if (reserved[id]) {
      return(false);
    } else {
      var i = 0;
      while ((i < length(id))) {
        var n = code(id, i);
        var valid63 = valid_char63(n);
        if ((!(valid63) || ((i === 0) && numeric63(n)))) {
          return(false);
        }
        i = (i + 1);
      }
      return(true);
    }
  }
  function to_id(id) {
    var id1 = "";
    var i = 0;
    while ((i < length(id))) {
      var c = char(id, i);
      var n = code(c);
      var c1 = (function () {
        if ((c === "-")) {
          return("_");
        } else if (valid_char63(n)) {
          return(c);
        } else if ((i === 0)) {
          return(("_" + n));
        } else {
          return(n);
        }
      })();
      id1 = (id1 + c1);
      i = (i + 1);
    }
    return(id1);
  }
  function module_key(spec) {
    if (atom63(spec)) {
      return(to_string(spec));
    } else {
      throw "Unsupported module specification";
    }
  }
  function exported() {
    var toplevel = hd(environment);
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var n = undefined;
    var _g69 = toplevel;
    for (n in _g69) {
      if (isNaN(parseInt(n))) {
        var b = _g69[n];
        if ((b.variable && b.export && (b.module === current_module))) {
          add(exports, join(["set", join(["get", m, join(["quote", n])]), n]));
        }
      }
    }
    if (some63(exports)) {
      return(join(["do", join(["define", m, join(["table"])]), join(["set", join(["get", "nexus", join(["quote", k])]), m])], exports));
    }
  }
  function imported(spec) {
    var k = module_key(spec);
    var x = nexus[k];
    if ((x && keys63(x))) {
      var m = make_id();
      var imports = [];
      add(imports, join(["%local", m, join(["get", "nexus", join(["quote", k])])]));
      var b = undefined;
      var _g70 = x;
      for (b in _g70) {
        if (isNaN(parseInt(b))) {
          var _g40 = _g70[b];
          add(imports, join(["%local", b, join(["get", m, join(["quote", b])])]));
        }
      }
      return(imports);
    }
  }
  function quote_binding(b) {
    b = extend(b, {_stash: true, module: join(["quote", b.module])});
    if (is63(b.symbol)) {
      return(extend(b, {_stash: true, symbol: join(["quote", b.symbol])}));
    } else if ((b.macro && b.form)) {
      return(exclude(extend(b, {_stash: true, macro: b.form}), {_stash: true, form: true}));
    } else if ((b.special && b.form)) {
      return(exclude(extend(b, {_stash: true, special: b.form}), {_stash: true, form: true}));
    } else if (is63(b.variable)) {
      return(b);
    } else if (is63(b.global)) {
      return(b);
    }
  }
  function quote_frame(t) {
    return(join(["%object"], mapo(function (_g41, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    return(join((function () {
      var _g71 = ["table"];
      _g71.export = quote_frame(m.export);
      _g71.import = quoted(m.import);
      return(_g71);
    })()));
  }
  function quote_modules() {
    return(join(["table"], map42(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g72 = {};
  nexus.utilities = _g72;
  _g72["macro-function"] = macro_function;
  _g72.imported = imported;
  _g72["quote-modules"] = quote_modules;
  _g72.quasiexpand = quasiexpand;
  _g72["special?"] = special63;
  _g72["quote-environment"] = quote_environment;
  _g72.macroexpand = macroexpand;
  _g72["valid-id?"] = valid_id63;
  _g72["module-key"] = module_key;
  _g72.getenv = getenv;
  _g72.bind = bind;
  _g72["bind*"] = bind42;
  _g72.exported = exported;
  _g72["to-id"] = to_id;
  _g72["stash*"] = stash42;
  _g72["bound?"] = bound63;
  _g72["variable?"] = variable63;
  _g72["symbol-expansion"] = symbol_expansion;
  _g72["symbol?"] = symbol63;
  _g72["special-form?"] = special_form63;
  _g72["macro?"] = macro63;
  _g72.indentation = indentation;
  _g72["initial-environment"] = initial_environment;
  _g72.quoted = quoted;
})();
(function () {
  var _g74 = nexus.runtime;
  var split = _g74.split;
  var boolean63 = _g74["boolean?"];
  var table63 = _g74["table?"];
  var search = _g74.search;
  var function63 = _g74["function?"];
  var number63 = _g74["number?"];
  var is63 = _g74["is?"];
  var cat = _g74.cat;
  var keys63 = _g74["keys?"];
  var pairwise = _g74.pairwise;
  var atom63 = _g74["atom?"];
  var string_literal63 = _g74["string-literal?"];
  var replicate = _g74.replicate;
  var join = _g74.join;
  var stash = _g74.stash;
  var drop = _g74.drop;
  var splice = _g74.splice;
  var substring = _g74.substring;
  var mapo = _g74.mapo;
  var keep = _g74.keep;
  var inner = _g74.inner;
  var write = _g74.write;
  var add = _g74.add;
  var reduce = _g74.reduce;
  var sub = _g74.sub;
  var list63 = _g74["list?"];
  var length = _g74.length;
  var iterate = _g74.iterate;
  var id_literal63 = _g74["id-literal?"];
  var _37 = _g74["%"];
  var write_file = _g74["write-file"];
  var _43 = _g74["+"];
  var _ = _g74["-"];
  var exclude = _g74.exclude;
  var _42 = _g74["*"];
  var _37message_handler = _g74["%message-handler"];
  var reverse = _g74.reverse;
  var make_id = _g74["make-id"];
  var apply = _g74.apply;
  var mapt = _g74.mapt;
  var unstash = _g74.unstash;
  var char = _g74.char;
  var _6061 = _g74["<="];
  var tl = _g74.tl;
  var _60 = _g74["<"];
  var _61 = _g74["="];
  var setenv = _g74.setenv;
  var to_string = _g74["to-string"];
  var code = _g74.code;
  var exit = _g74.exit;
  var nil63 = _g74["nil?"];
  var read_file = _g74["read-file"];
  var empty63 = _g74["empty?"];
  var extend = _g74.extend;
  var parse_number = _g74["parse-number"];
  var _62 = _g74[">"];
  var map = _g74.map;
  var hd = _g74.hd;
  var _47 = _g74["/"];
  var sublist = _g74.sublist;
  var _6261 = _g74[">="];
  var string63 = _g74["string?"];
  var composite63 = _g74["composite?"];
  var find = _g74.find;
  var last = _g74.last;
  var map42 = _g74["map*"];
  var some63 = _g74["some?"];
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  var whitespace = {"\t": true, " ": true, "\n": true};
  function make_stream(str) {
    return({pos: 0, len: length(str), string: str});
  }
  function peek_char(s) {
    if ((s.pos < s.len)) {
      return(char(s.string, s.pos));
    }
  }
  function read_char(s) {
    var c = peek_char(s);
    if (c) {
      s.pos = (s.pos + 1);
      return(c);
    }
  }
  function skip_non_code(s) {
    while (true) {
      var c = peek_char(s);
      if (nil63(c)) {
        break;
      } else if (whitespace[c]) {
        read_char(s);
      } else if ((c === ";")) {
        while ((c && !((c === "\n")))) {
          c = read_char(s);
        }
        skip_non_code(s);
      } else {
        break;
      }
    }
  }
  var read_table = {};
  var eof = {};
  function read(s) {
    skip_non_code(s);
    var c = peek_char(s);
    if (is63(c)) {
      return(((read_table[c] || read_table[""]))(s));
    } else {
      return(eof);
    }
  }
  function read_all(s) {
    var l = [];
    while (true) {
      var form = read(s);
      if ((form === eof)) {
        break;
      }
      add(l, form);
    }
    return(l);
  }
  function read_from_string(str) {
    return(read(make_stream(str)));
  }
  function key63(atom) {
    return((string63(atom) && (length(atom) > 1) && (char(atom, (length(atom) - 1)) === ":")));
  }
  function flag63(atom) {
    return((string63(atom) && (length(atom) > 1) && (char(atom, 0) === ":")));
  }
  read_table[""] = function (s) {
    var str = "";
    var dot63 = false;
    while (true) {
      var c = peek_char(s);
      if ((c && (!(whitespace[c]) && !(delimiters[c])))) {
        if ((c === ".")) {
          dot63 = true;
        }
        str = (str + c);
        read_char(s);
      } else {
        break;
      }
    }
    var n = parse_number(str);
    if (is63(n)) {
      return(n);
    } else if ((str === "true")) {
      return(true);
    } else if ((str === "false")) {
      return(false);
    } else if ((str === "_")) {
      return(make_id());
    } else if (dot63) {
      return(reduce(function (a, b) {
        return(join(["get", b, join(["quote", a])]));
      }, reverse(split(str, "."))));
    } else {
      return(str);
    }
  };
  read_table["("] = function (s) {
    read_char(s);
    var l = [];
    while (true) {
      skip_non_code(s);
      var c = peek_char(s);
      if ((c && !((c === ")")))) {
        var x = read(s);
        if (key63(x)) {
          var k = sub(x, 0, (length(x) - 1));
          var v = read(s);
          l[k] = v;
        } else if (flag63(x)) {
          l[sub(x, 1)] = true;
        } else {
          add(l, x);
        }
      } else if (c) {
        read_char(s);
        break;
      } else {
        throw ("Expected ) at " + s.pos);
      }
    }
    return(l);
  };
  read_table[")"] = function (s) {
    throw ("Unexpected ) at " + s.pos);
  };
  read_table["\""] = function (s) {
    read_char(s);
    var str = "\"";
    while (true) {
      var c = peek_char(s);
      if ((c && !((c === "\"")))) {
        if ((c === "\\")) {
          str = (str + read_char(s));
        }
        str = (str + read_char(s));
      } else if (c) {
        read_char(s);
        break;
      } else {
        throw ("Expected \" at " + s.pos);
      }
    }
    return((str + "\""));
  };
  read_table["|"] = function (s) {
    read_char(s);
    var str = "|";
    while (true) {
      var c = peek_char(s);
      if ((c && !((c === "|")))) {
        str = (str + read_char(s));
      } else if (c) {
        read_char(s);
        break;
      } else {
        throw ("Expected | at " + s.pos);
      }
    }
    return((str + "|"));
  };
  read_table["'"] = function (s) {
    read_char(s);
    return(["quote", read(s)]);
  };
  read_table["`"] = function (s) {
    read_char(s);
    return(["quasiquote", read(s)]);
  };
  read_table[","] = function (s) {
    read_char(s);
    if ((peek_char(s) === "@")) {
      read_char(s);
      return(["unquote-splicing", read(s)]);
    } else {
      return(["unquote", read(s)]);
    }
  };
  var _g80 = {};
  nexus.reader = _g80;
  _g80["read-table"] = read_table;
  _g80["make-stream"] = make_stream;
  _g80["read-all"] = read_all;
  _g80.read = read;
  _g80["read-from-string"] = read_from_string;
})();
(function () {
  var _g82 = nexus.runtime;
  var split = _g82.split;
  var boolean63 = _g82["boolean?"];
  var table63 = _g82["table?"];
  var search = _g82.search;
  var function63 = _g82["function?"];
  var number63 = _g82["number?"];
  var is63 = _g82["is?"];
  var cat = _g82.cat;
  var keys63 = _g82["keys?"];
  var pairwise = _g82.pairwise;
  var atom63 = _g82["atom?"];
  var string_literal63 = _g82["string-literal?"];
  var replicate = _g82.replicate;
  var join = _g82.join;
  var stash = _g82.stash;
  var drop = _g82.drop;
  var splice = _g82.splice;
  var substring = _g82.substring;
  var mapo = _g82.mapo;
  var keep = _g82.keep;
  var inner = _g82.inner;
  var write = _g82.write;
  var add = _g82.add;
  var reduce = _g82.reduce;
  var sub = _g82.sub;
  var list63 = _g82["list?"];
  var length = _g82.length;
  var iterate = _g82.iterate;
  var id_literal63 = _g82["id-literal?"];
  var _37 = _g82["%"];
  var write_file = _g82["write-file"];
  var _43 = _g82["+"];
  var _ = _g82["-"];
  var exclude = _g82.exclude;
  var _42 = _g82["*"];
  var _37message_handler = _g82["%message-handler"];
  var reverse = _g82.reverse;
  var make_id = _g82["make-id"];
  var apply = _g82.apply;
  var mapt = _g82.mapt;
  var unstash = _g82.unstash;
  var char = _g82.char;
  var _6061 = _g82["<="];
  var tl = _g82.tl;
  var _60 = _g82["<"];
  var _61 = _g82["="];
  var setenv = _g82.setenv;
  var to_string = _g82["to-string"];
  var code = _g82.code;
  var exit = _g82.exit;
  var nil63 = _g82["nil?"];
  var read_file = _g82["read-file"];
  var empty63 = _g82["empty?"];
  var extend = _g82.extend;
  var parse_number = _g82["parse-number"];
  var _62 = _g82[">"];
  var map = _g82.map;
  var hd = _g82.hd;
  var _47 = _g82["/"];
  var sublist = _g82.sublist;
  var _6261 = _g82[">="];
  var string63 = _g82["string?"];
  var composite63 = _g82["composite?"];
  var find = _g82.find;
  var last = _g82.last;
  var map42 = _g82["map*"];
  var some63 = _g82["some?"];
  var _g83 = nexus.utilities;
  var bind42 = _g83["bind*"];
  var bind = _g83.bind;
  var macroexpand = _g83.macroexpand;
  var valid_id63 = _g83["valid-id?"];
  var macro63 = _g83["macro?"];
  var quasiexpand = _g83.quasiexpand;
  var special_form63 = _g83["special-form?"];
  var macro_function = _g83["macro-function"];
  var initial_environment = _g83["initial-environment"];
  var special63 = _g83["special?"];
  var symbol_expansion = _g83["symbol-expansion"];
  var quote_modules = _g83["quote-modules"];
  var quote_environment = _g83["quote-environment"];
  var stash42 = _g83["stash*"];
  var exported = _g83.exported;
  var module_key = _g83["module-key"];
  var to_id = _g83["to-id"];
  var indentation = _g83.indentation;
  var imported = _g83.imported;
  var quoted = _g83.quoted;
  var bound63 = _g83["bound?"];
  var symbol63 = _g83["symbol?"];
  var variable63 = _g83["variable?"];
  var getenv = _g83.getenv;
  var _g84 = nexus.reader;
  var make_stream = _g84["make-stream"];
  var read = _g84.read;
  var read_from_string = _g84["read-from-string"];
  var read_table = _g84["read-table"];
  var read_all = _g84["read-all"];
  var infix = {lua: {"~=": true, "=": "==", cat: "..", "or": true, "and": true}, js: {"~=": "!=", "=": "===", cat: "+", "and": "&&", "or": "||"}, common: {"%": true, "/": true, "<=": true, "+": true, "<": true, "-": true, ">": true, ">=": true, "*": true}};
  function getop(op) {
    var op1 = (infix.common[op] || infix[target][op]);
    if ((op1 === true)) {
      return(op);
    } else {
      return(op1);
    }
  }
  function infix63(form) {
    return((list63(form) && is63(getop(hd(form)))));
  }
  var compile;
  function compile_args(args) {
    var str = "(";
    var i = 0;
    var _g85 = args;
    while ((i < length(_g85))) {
      var arg = _g85[i];
      str = (str + compile(arg));
      if ((i < (length(args) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_atom(x) {
    if (((x === "nil") && (target === "lua"))) {
      return(x);
    } else if ((x === "nil")) {
      return("undefined");
    } else if (id_literal63(x)) {
      return(inner(x));
    } else if (string_literal63(x)) {
      return(x);
    } else if (string63(x)) {
      return(to_id(x));
    } else if (boolean63(x)) {
      if (x) {
        return("true");
      } else {
        return("false");
      }
    } else if (number63(x)) {
      return((x + ""));
    } else {
      throw "Unrecognized atom";
    }
  }
  function compile_body(forms) {
    var _g86 = unstash(sublist(arguments, 1));
    var tail63 = _g86["tail?"];
    var str = "";
    var i = 0;
    var _g87 = forms;
    while ((i < length(_g87))) {
      var x = _g87[i];
      var t63 = (tail63 && (i === (length(forms) - 1)));
      str = (str + compile(x, {_stash: true, "tail?": t63, "stmt?": true}));
      i = (i + 1);
    }
    return(str);
  }
  function terminator(stmt63) {
    if (!(stmt63)) {
      return("");
    } else if ((target === "js")) {
      return(";\n");
    } else {
      return("\n");
    }
  }
  function compile_special(form, stmt63, tail63) {
    var _g88 = getenv(hd(form));
    var stmt = _g88.stmt;
    var self_tr63 = _g88.tr;
    var special = _g88.special;
    if ((!(stmt63) && stmt)) {
      return(compile(join([join(["%function", [], form])]), {_stash: true, "tail?": tail63}));
    } else {
      var tr = terminator((stmt63 && !(self_tr63)));
      return((special(tl(form), tail63) + tr));
    }
  }
  function compile_call(form) {
    if (empty63(form)) {
      return(compile_special(["%array"]));
    } else {
      var f = hd(form);
      var f1 = compile(f);
      var args = compile_args(stash42(tl(form)));
      if (list63(f)) {
        return(("(" + f1 + ")" + args));
      } else if (string63(f)) {
        return((f1 + args));
      } else {
        throw "Invalid function call";
      }
    }
  }
  function compile_infix(_g89) {
    var op = _g89[0];
    var args = sub(_g89, 1);
    var str = "(";
    var _g90 = getop(op);
    var i = 0;
    var _g91 = args;
    while ((i < length(_g91))) {
      var arg = _g91[i];
      if (((_g90 === "-") && (length(args) === 1))) {
        str = (str + _g90 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g90 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_branch(condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g92 = (function () {
      indent_level = (indent_level + 1);
      var _g93 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g93);
    })();
    var ind = indentation();
    var tr = (function () {
      if ((last63 && (target === "lua"))) {
        return((ind + "end\n"));
      } else if (last63) {
        return("\n");
      } else {
        return("");
      }
    })();
    if ((first63 && (target === "js"))) {
      return((ind + "if (" + cond1 + ") {\n" + _g92 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g92 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g92 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g92 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g92 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g92 + tr));
    }
  }
  function compile_function(args, body) {
    var _g94 = unstash(sublist(arguments, 2));
    var name = _g94.name;
    var prefix = _g94.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g95 = (prefix || "");
    var _g96 = compile_args(args);
    var _g97 = (function () {
      indent_level = (indent_level + 1);
      var _g98 = compile_body(body, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g98);
    })();
    var ind = indentation();
    var tr = (function () {
      if ((target === "js")) {
        return("");
      } else {
        return("end");
      }
    })();
    if (name) {
      tr = (tr + "\n");
    }
    if ((target === "js")) {
      return(("function " + id + _g96 + " {\n" + _g97 + ind + "}" + tr));
    } else {
      return((_g95 + "function " + id + _g96 + "\n" + _g97 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g99 = unstash(sublist(arguments, 1));
    var tail63 = _g99["tail?"];
    var stmt63 = _g99["stmt?"];
    if ((tail63 && can_return63(form))) {
      form = join(["return", form]);
    }
    if (nil63(form)) {
      return("");
    } else if (special_form63(form)) {
      return(compile_special(form, stmt63, tail63));
    } else {
      var tr = terminator(stmt63);
      var ind = (function () {
        if (stmt63) {
          return(indentation());
        } else {
          return("");
        }
      })();
      var _g100 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g100 + tr));
    }
  };
  global.current_module = undefined;
  function module(spec) {
    return(modules[module_key(spec)]);
  }
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g101 = macroexpand(body);
    var epilog = macroexpand(exported());
    return(join([join(["%function", []], join(_g101, [epilog]))]));
  }
  function compile_file(file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return((compile(form) + ";\n"));
  }
  var run = global.eval;
  var compiler_output;
  var compilation_level;
  function _37compile_module(spec) {
    var path = module_path(spec);
    var mod0 = current_module;
    var env0 = environment;
    var k = module_key(spec);
    if (number63(compilation_level)) {
      compilation_level = (compilation_level + 1);
    }
    current_module = spec;
    environment = initial_environment();
    var compiled = compile_file(path);
    var m = module(spec);
    var toplevel = hd(environment);
    current_module = mod0;
    environment = env0;
    var name = undefined;
    var _g115 = toplevel;
    for (name in _g115) {
      if (isNaN(parseInt(name))) {
        var binding = _g115[name];
        if ((binding.export && (binding.module === k))) {
          m.export[name] = binding;
        }
      }
    }
    if (number63(compilation_level)) {
      compilation_level = (compilation_level - 1);
      compiler_output = (compiler_output + compiled);
    } else {
      return(run(compiled));
    }
  }
  function open_module(spec) {
    var m = module(spec);
    var frame = last(environment);
    var k = undefined;
    var _g116 = m.export;
    for (k in _g116) {
      if (isNaN(parseInt(k))) {
        var v = _g116[k];
        frame[k] = v;
      }
    }
  }
  function load_module(spec) {
    if ((nil63(module(spec)) || (compilation_level === 1))) {
      _37compile_module(spec);
    }
    return(open_module(spec));
  }
  function in_module(spec) {
    load_module(spec);
    var m = module(spec);
    map(open_module, m.import);
    current_module = spec;
  }
  function compile_module(spec) {
    compilation_level = 0;
    compiler_output = "";
    load_module(spec);
    return(compiler_output);
  }
  function prologue() {
    if (current_module) {
      var m = module(current_module);
      return(join(imported(current_module), map(function (x) {
        return(splice(imported(x)));
      }, m.import)));
    }
  }
  function eval(form) {
    var previous = target;
    target = "js";
    var form1 = join(["do"], join(prologue(), [form]));
    var x = compile(macroexpand(form1));
    target = previous;
    return(run(x));
  }
  var _g117 = {};
  nexus.compiler = _g117;
  _g117.eval = eval;
  _g117["compile-branch"] = compile_branch;
  _g117["compile-function"] = compile_function;
  _g117["compile-module"] = compile_module;
  _g117["in-module"] = in_module;
  _g117["load-module"] = load_module;
  _g117["open-module"] = open_module;
  _g117["compile-special"] = compile_special;
  _g117["compile-call"] = compile_call;
  _g117["compile-body"] = compile_body;
  _g117.compile = compile;
})();
(function () {
  var _g120 = nexus.runtime;
  var split = _g120.split;
  var boolean63 = _g120["boolean?"];
  var table63 = _g120["table?"];
  var search = _g120.search;
  var function63 = _g120["function?"];
  var number63 = _g120["number?"];
  var is63 = _g120["is?"];
  var cat = _g120.cat;
  var keys63 = _g120["keys?"];
  var pairwise = _g120.pairwise;
  var atom63 = _g120["atom?"];
  var string_literal63 = _g120["string-literal?"];
  var replicate = _g120.replicate;
  var join = _g120.join;
  var stash = _g120.stash;
  var drop = _g120.drop;
  var splice = _g120.splice;
  var substring = _g120.substring;
  var mapo = _g120.mapo;
  var keep = _g120.keep;
  var inner = _g120.inner;
  var write = _g120.write;
  var add = _g120.add;
  var reduce = _g120.reduce;
  var sub = _g120.sub;
  var list63 = _g120["list?"];
  var length = _g120.length;
  var iterate = _g120.iterate;
  var id_literal63 = _g120["id-literal?"];
  var _37 = _g120["%"];
  var write_file = _g120["write-file"];
  var _43 = _g120["+"];
  var _ = _g120["-"];
  var exclude = _g120.exclude;
  var _42 = _g120["*"];
  var _37message_handler = _g120["%message-handler"];
  var reverse = _g120.reverse;
  var make_id = _g120["make-id"];
  var apply = _g120.apply;
  var mapt = _g120.mapt;
  var unstash = _g120.unstash;
  var char = _g120.char;
  var _6061 = _g120["<="];
  var tl = _g120.tl;
  var _60 = _g120["<"];
  var _61 = _g120["="];
  var setenv = _g120.setenv;
  var to_string = _g120["to-string"];
  var code = _g120.code;
  var exit = _g120.exit;
  var nil63 = _g120["nil?"];
  var read_file = _g120["read-file"];
  var empty63 = _g120["empty?"];
  var extend = _g120.extend;
  var parse_number = _g120["parse-number"];
  var _62 = _g120[">"];
  var map = _g120.map;
  var hd = _g120.hd;
  var _47 = _g120["/"];
  var sublist = _g120.sublist;
  var _6261 = _g120[">="];
  var string63 = _g120["string?"];
  var composite63 = _g120["composite?"];
  var find = _g120.find;
  var last = _g120.last;
  var map42 = _g120["map*"];
  var some63 = _g120["some?"];
  var _g121 = nexus.utilities;
  var bind42 = _g121["bind*"];
  var bind = _g121.bind;
  var macroexpand = _g121.macroexpand;
  var valid_id63 = _g121["valid-id?"];
  var macro63 = _g121["macro?"];
  var quasiexpand = _g121.quasiexpand;
  var special_form63 = _g121["special-form?"];
  var macro_function = _g121["macro-function"];
  var initial_environment = _g121["initial-environment"];
  var special63 = _g121["special?"];
  var symbol_expansion = _g121["symbol-expansion"];
  var quote_modules = _g121["quote-modules"];
  var quote_environment = _g121["quote-environment"];
  var stash42 = _g121["stash*"];
  var exported = _g121.exported;
  var module_key = _g121["module-key"];
  var to_id = _g121["to-id"];
  var indentation = _g121.indentation;
  var imported = _g121.imported;
  var quoted = _g121.quoted;
  var bound63 = _g121["bound?"];
  var symbol63 = _g121["symbol?"];
  var variable63 = _g121["variable?"];
  var getenv = _g121.getenv;
  var _g122 = nexus.compiler;
  var compile_module = _g122["compile-module"];
  var compile_body = _g122["compile-body"];
  var eval = _g122.eval;
  var compile_call = _g122["compile-call"];
  var compile_special = _g122["compile-special"];
  var compile = _g122.compile;
  var compile_branch = _g122["compile-branch"];
  var open_module = _g122["open-module"];
  var load_module = _g122["load-module"];
  var compile_function = _g122["compile-function"];
  var in_module = _g122["in-module"];
})();
(function () {
  var _g228 = nexus.runtime;
  var split = _g228.split;
  var boolean63 = _g228["boolean?"];
  var table63 = _g228["table?"];
  var search = _g228.search;
  var function63 = _g228["function?"];
  var number63 = _g228["number?"];
  var is63 = _g228["is?"];
  var cat = _g228.cat;
  var keys63 = _g228["keys?"];
  var pairwise = _g228.pairwise;
  var atom63 = _g228["atom?"];
  var string_literal63 = _g228["string-literal?"];
  var replicate = _g228.replicate;
  var join = _g228.join;
  var stash = _g228.stash;
  var drop = _g228.drop;
  var splice = _g228.splice;
  var substring = _g228.substring;
  var mapo = _g228.mapo;
  var keep = _g228.keep;
  var inner = _g228.inner;
  var write = _g228.write;
  var add = _g228.add;
  var reduce = _g228.reduce;
  var sub = _g228.sub;
  var list63 = _g228["list?"];
  var length = _g228.length;
  var iterate = _g228.iterate;
  var id_literal63 = _g228["id-literal?"];
  var _37 = _g228["%"];
  var write_file = _g228["write-file"];
  var _43 = _g228["+"];
  var _ = _g228["-"];
  var exclude = _g228.exclude;
  var _42 = _g228["*"];
  var _37message_handler = _g228["%message-handler"];
  var reverse = _g228.reverse;
  var make_id = _g228["make-id"];
  var apply = _g228.apply;
  var mapt = _g228.mapt;
  var unstash = _g228.unstash;
  var char = _g228.char;
  var _6061 = _g228["<="];
  var tl = _g228.tl;
  var _60 = _g228["<"];
  var _61 = _g228["="];
  var setenv = _g228.setenv;
  var to_string = _g228["to-string"];
  var code = _g228.code;
  var exit = _g228.exit;
  var nil63 = _g228["nil?"];
  var read_file = _g228["read-file"];
  var empty63 = _g228["empty?"];
  var extend = _g228.extend;
  var parse_number = _g228["parse-number"];
  var _62 = _g228[">"];
  var map = _g228.map;
  var hd = _g228.hd;
  var _47 = _g228["/"];
  var sublist = _g228.sublist;
  var _6261 = _g228[">="];
  var string63 = _g228["string?"];
  var composite63 = _g228["composite?"];
  var find = _g228.find;
  var last = _g228.last;
  var map42 = _g228["map*"];
  var some63 = _g228["some?"];
  var _g229 = nexus.utilities;
  var bind42 = _g229["bind*"];
  var bind = _g229.bind;
  var macroexpand = _g229.macroexpand;
  var valid_id63 = _g229["valid-id?"];
  var macro63 = _g229["macro?"];
  var quasiexpand = _g229.quasiexpand;
  var special_form63 = _g229["special-form?"];
  var macro_function = _g229["macro-function"];
  var initial_environment = _g229["initial-environment"];
  var special63 = _g229["special?"];
  var symbol_expansion = _g229["symbol-expansion"];
  var quote_modules = _g229["quote-modules"];
  var quote_environment = _g229["quote-environment"];
  var stash42 = _g229["stash*"];
  var exported = _g229.exported;
  var module_key = _g229["module-key"];
  var to_id = _g229["to-id"];
  var indentation = _g229.indentation;
  var imported = _g229.imported;
  var quoted = _g229.quoted;
  var bound63 = _g229["bound?"];
  var symbol63 = _g229["symbol?"];
  var variable63 = _g229["variable?"];
  var getenv = _g229.getenv;
  var _g230 = nexus.compiler;
  var compile_module = _g230["compile-module"];
  var compile_body = _g230["compile-body"];
  var eval = _g230.eval;
  var compile_call = _g230["compile-call"];
  var compile_special = _g230["compile-special"];
  var compile = _g230.compile;
  var compile_branch = _g230["compile-branch"];
  var open_module = _g230["open-module"];
  var load_module = _g230["load-module"];
  var compile_function = _g230["compile-function"];
  var in_module = _g230["in-module"];
  global.target = "js";
})();
(function () {
  var _g385 = nexus.runtime;
  var split = _g385.split;
  var boolean63 = _g385["boolean?"];
  var table63 = _g385["table?"];
  var search = _g385.search;
  var function63 = _g385["function?"];
  var number63 = _g385["number?"];
  var is63 = _g385["is?"];
  var cat = _g385.cat;
  var keys63 = _g385["keys?"];
  var pairwise = _g385.pairwise;
  var atom63 = _g385["atom?"];
  var string_literal63 = _g385["string-literal?"];
  var replicate = _g385.replicate;
  var join = _g385.join;
  var stash = _g385.stash;
  var drop = _g385.drop;
  var splice = _g385.splice;
  var substring = _g385.substring;
  var mapo = _g385.mapo;
  var keep = _g385.keep;
  var inner = _g385.inner;
  var write = _g385.write;
  var add = _g385.add;
  var reduce = _g385.reduce;
  var sub = _g385.sub;
  var list63 = _g385["list?"];
  var length = _g385.length;
  var iterate = _g385.iterate;
  var id_literal63 = _g385["id-literal?"];
  var _37 = _g385["%"];
  var write_file = _g385["write-file"];
  var _43 = _g385["+"];
  var _ = _g385["-"];
  var exclude = _g385.exclude;
  var _42 = _g385["*"];
  var _37message_handler = _g385["%message-handler"];
  var reverse = _g385.reverse;
  var make_id = _g385["make-id"];
  var apply = _g385.apply;
  var mapt = _g385.mapt;
  var unstash = _g385.unstash;
  var char = _g385.char;
  var _6061 = _g385["<="];
  var tl = _g385.tl;
  var _60 = _g385["<"];
  var _61 = _g385["="];
  var setenv = _g385.setenv;
  var to_string = _g385["to-string"];
  var code = _g385.code;
  var exit = _g385.exit;
  var nil63 = _g385["nil?"];
  var read_file = _g385["read-file"];
  var empty63 = _g385["empty?"];
  var extend = _g385.extend;
  var parse_number = _g385["parse-number"];
  var _62 = _g385[">"];
  var map = _g385.map;
  var hd = _g385.hd;
  var _47 = _g385["/"];
  var sublist = _g385.sublist;
  var _6261 = _g385[">="];
  var string63 = _g385["string?"];
  var composite63 = _g385["composite?"];
  var find = _g385.find;
  var last = _g385.last;
  var map42 = _g385["map*"];
  var some63 = _g385["some?"];
  var _g386 = nexus.utilities;
  var bind42 = _g386["bind*"];
  var bind = _g386.bind;
  var macroexpand = _g386.macroexpand;
  var valid_id63 = _g386["valid-id?"];
  var macro63 = _g386["macro?"];
  var quasiexpand = _g386.quasiexpand;
  var special_form63 = _g386["special-form?"];
  var macro_function = _g386["macro-function"];
  var initial_environment = _g386["initial-environment"];
  var special63 = _g386["special?"];
  var symbol_expansion = _g386["symbol-expansion"];
  var quote_modules = _g386["quote-modules"];
  var quote_environment = _g386["quote-environment"];
  var stash42 = _g386["stash*"];
  var exported = _g386.exported;
  var module_key = _g386["module-key"];
  var to_id = _g386["to-id"];
  var indentation = _g386.indentation;
  var imported = _g386.imported;
  var quoted = _g386.quoted;
  var bound63 = _g386["bound?"];
  var symbol63 = _g386["symbol?"];
  var variable63 = _g386["variable?"];
  var getenv = _g386.getenv;
  var _g387 = nexus.compiler;
  var compile_module = _g387["compile-module"];
  var compile_body = _g387["compile-body"];
  var eval = _g387.eval;
  var compile_call = _g387["compile-call"];
  var compile_special = _g387["compile-special"];
  var compile = _g387.compile;
  var compile_branch = _g387["compile-branch"];
  var open_module = _g387["open-module"];
  var load_module = _g387["load-module"];
  var compile_function = _g387["compile-function"];
  var in_module = _g387["in-module"];
  global.modules = {system: {export: {nexus: {global: true, module: "system", export: true}}, import: ["special", "core"]}, lib: {export: {}, import: ["core", "special"]}, boot: {export: {}, import: ["runtime", "utilities", "special", "core", "compiler"]}, compiler: {export: {"compile-module": {variable: true, module: "compiler", export: true}, "current-module": {global: true, module: "compiler", export: true}, "compile-body": {variable: true, module: "compiler", export: true}, eval: {variable: true, module: "compiler", export: true}, "compile-call": {variable: true, module: "compiler", export: true}, "compile-special": {variable: true, module: "compiler", export: true}, compile: {variable: true, module: "compiler", export: true}, "compile-branch": {variable: true, module: "compiler", export: true}, "open-module": {variable: true, module: "compiler", export: true}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g394 = sub(body, 0);
    var imports = [];
    var imp = _g394.import;
    var exp = _g394.export;
    var _g396 = 0;
    var _g395 = (imp || []);
    while ((_g396 < length(_g395))) {
      var k = _g395[_g396];
      load_module(k);
      imports = join(imports, imported(k));
      _g396 = (_g396 + 1);
    }
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g398 = 0;
    var _g397 = (exp || []);
    while ((_g398 < length(_g397))) {
      var k = _g397[_g398];
      setenv(k, {_stash: true, export: true});
      _g398 = (_g398 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler", export: true}, "load-module": {variable: true, module: "compiler", export: true}, "compile-function": {variable: true, module: "compiler", export: true}, "in-module": {variable: true, module: "compiler", export: true}}, import: ["runtime", "utilities", "special", "core", "reader"]}, reader: {export: {"read-table": {variable: true, module: "reader", export: true}, "define-reader": {export: true, module: "reader", macro: function (_g399) {
    var char = _g399[0];
    var stream = _g399[1];
    var body = unstash(sublist(arguments, 1));
    var _g400 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g400)]));
  }}, read: {variable: true, module: "reader", export: true}, "read-from-string": {variable: true, module: "reader", export: true}, "make-stream": {variable: true, module: "reader", export: true}, "read-all": {variable: true, module: "reader", export: true}}, import: ["runtime", "special", "core"]}, core: {export: {target: {macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, global: true, module: "core", export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g401 = body;
      for (k in _g401) {
        if (isNaN(parseInt(k))) {
          var v = _g401[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core", export: true}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, module: "core", export: true}, dec: {macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core", export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g402 = sub(body, 0);
    add(environment, {});
    var _g403 = (function () {
      map(function (_g404) {
        var name = _g404[0];
        var exp = _g404[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g402)));
    })();
    drop(environment);
    return(_g403);
  }, module: "core", export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g405 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g405))) {
      var _g406 = bind42(x, _g405);
      var args = _g406[0];
      var _g407 = _g406[1];
      return(join(["%local-function", name, args], _g407));
    } else {
      return(join(["%local", name, x]));
    }
  }, module: "core", export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g409 = 0;
    var _g408 = elements;
    while ((_g409 < length(_g408))) {
      var e = _g408[_g409];
      l[e] = true;
      _g409 = (_g409 + 1);
    }
    return(join(["table"], l));
  }, module: "core", export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g410 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g410)]));
  }, module: "core", export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g227, x) {
      return(x);
    }, body)));
  }, module: "core", export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g411 = sub(body, 0);
    add(environment, {});
    var _g412 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g411)));
    })();
    drop(environment);
    return(_g412);
  }, module: "core", export: true}, inc: {macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, module: "core", export: true}, "list*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g413 = xs;
      while ((i < length(_g413))) {
        var x = _g413[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, module: "core", export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, module: "core", export: true}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, module: "core", export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g414 = sub(body, 0);
    var form = join(["fn", args], _g414);
    eval(join((function () {
      var _g415 = ["setenv", join(["quote", name])];
      _g415.macro = form;
      _g415.form = join(["quote", form]);
      return(_g415);
    })()));
    return(undefined);
  }, module: "core", export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g416 = sub(body, 0);
    var form = join(["fn", args], _g416);
    var keys = sub(_g416, length(_g416));
    eval(join((function () {
      var _g417 = ["setenv", join(["quote", name])];
      _g417.special = form;
      _g417.form = join(["quote", form]);
      return(_g417);
    })(), keys));
    return(undefined);
  }, module: "core", export: true}, language: {macro: function () {
    return(join(["quote", target]));
  }, module: "core", export: true}, "with-bindings": {macro: function (_g418) {
    var names = _g418[0];
    var body = unstash(sublist(arguments, 1));
    var _g419 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g420 = ["with-frame", join(["across", join([names, x]), join((function () {
        var _g421 = ["setenv", x];
        _g421.variable = true;
        return(_g421);
      })())])];
      _g420.scope = true;
      return(_g420);
    })(), _g419));
  }, module: "core", export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g422 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g423) {
      var lh = _g423[0];
      var rh = _g423[1];
      var _g425 = 0;
      var _g424 = bind(lh, rh);
      while ((_g425 < length(_g424))) {
        var _g426 = _g424[_g425];
        var id = _g426[0];
        var val = _g426[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g425 = (_g425 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g422)])));
  }, module: "core", export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, module: "core", export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g427 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g427)]));
  }, module: "core", export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g428 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g428)]));
  }, module: "core", export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g429 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g430 = ["table"];
      _g430._scope = scope;
      return(_g430);
    })())]), join(["let", join([x, join(["do"], _g429)]), join(["drop", "environment"]), x])]));
  }, module: "core", export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core", export: true}, "define-global": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g431 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g431))) {
      var _g432 = bind42(x, _g431);
      var args = _g432[0];
      var _g433 = _g432[1];
      return(join(["%global-function", name, args], _g433));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core", export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g434 = sub(body, 0);
    var _g435 = bind42(args, _g434);
    var _g436 = _g435[0];
    var _g437 = _g435[1];
    return(join(["%function", _g436], _g437));
  }, module: "core", export: true}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, module: "core", export: true}, each: {macro: function (_g438) {
    var t = _g438[0];
    var k = _g438[1];
    var v = _g438[2];
    var body = unstash(sublist(arguments, 1));
    var _g439 = sub(body, 0);
    var t1 = make_id();
    return(join(["let", join([k, "nil", t1, t]), join(["%for", join([t1, k]), join(["if", join((function () {
      var _g440 = ["target"];
      _g440.lua = join(["not", join(["number?", k])]);
      _g440.js = join(["isNaN", join(["parseInt", k])]);
      return(_g440);
    })()), join(["let", join([v, join(["get", t1, k])])], _g439)])])]));
  }, module: "core", export: true}, across: {macro: function (_g441) {
    var l = _g441[0];
    var v = _g441[1];
    var i = _g441[2];
    var start = _g441[3];
    var body = unstash(sublist(arguments, 1));
    var _g442 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(join(["let", join([i, start, l1, l]), join(["while", join(["<", i, join(["length", l1])]), join(["let", join([v, join(["at", l1, i])])], join(_g442, [join(["inc", i])]))])]));
  }, module: "core", export: true}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, special: {export: {"do": {stmt: true, tr: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }, module: "special", export: true}, "%local-function": {stmt: true, tr: true, special: function (_g443) {
    var name = _g443[0];
    var args = _g443[1];
    var body = sub(_g443, 2);
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return((indentation() + x));
  }, module: "special", export: true}, "set": {stmt: true, module: "special", special: function (_g444) {
    var lh = _g444[0];
    var rh = _g444[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, export: true}, "%local": {stmt: true, module: "special", special: function (_g445) {
    var name = _g445[0];
    var value = _g445[1];
    var id = compile(name);
    var value1 = compile(value);
    var rh = (function () {
      if (is63(value)) {
        return((" = " + value1));
      } else {
        return("");
      }
    })();
    var keyword = (function () {
      if ((target === "js")) {
        return("var ");
      } else {
        return("local ");
      }
    })();
    var ind = indentation();
    return((ind + keyword + id + rh));
  }, export: true}, "%try": {stmt: true, tr: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g446 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g446);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g447 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g447);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, module: "special", export: true}, "while": {stmt: true, tr: true, special: function (_g448) {
    var condition = _g448[0];
    var body = sub(_g448, 1);
    var _g449 = compile(condition);
    var _g450 = (function () {
      indent_level = (indent_level + 1);
      var _g451 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g451);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g449 + ") {\n" + _g450 + ind + "}\n"));
    } else {
      return((ind + "while " + _g449 + " do\n" + _g450 + ind + "end\n"));
    }
  }, module: "special", export: true}, "break": {stmt: true, module: "special", special: function (_g119) {
    return((indentation() + "break"));
  }, export: true}, "if": {stmt: true, tr: true, special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g452 = form;
    while ((i < length(_g452))) {
      var condition = _g452[i];
      var last63 = (i >= (length(form) - 2));
      var else63 = (i === (length(form) - 1));
      var first63 = (i === 0);
      var body = form[(i + 1)];
      if (else63) {
        body = condition;
        condition = undefined;
      }
      str = (str + compile_branch(condition, body, first63, last63, tail63));
      i = (i + 1);
      i = (i + 1);
    }
    return(str);
  }, module: "special", export: true}, "error": {stmt: true, module: "special", special: function (_g453) {
    var x = _g453[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, export: true}, "get": {module: "special", special: function (_g454) {
    var t = _g454[0];
    var k = _g454[1];
    var _g455 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g455, 0) === "{"))) {
      _g455 = ("(" + _g455 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g455 + "." + inner(k)));
    } else {
      return((_g455 + "[" + k1 + "]"));
    }
  }, export: true}, "%object": {module: "special", special: function (forms) {
    var str = "{";
    var sep = (function () {
      if ((target === "lua")) {
        return(" = ");
      } else {
        return(": ");
      }
    })();
    var pairs = pairwise(forms);
    var i = 0;
    var _g456 = pairs;
    while ((i < length(_g456))) {
      var _g457 = _g456[i];
      var k = _g457[0];
      var v = _g457[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g458 = compile(v);
      var _g459 = (function () {
        if (valid_id63(k)) {
          return(k);
        } else if (((target === "js") && string_literal63(k))) {
          return(k);
        } else if ((target === "js")) {
          return(quoted(k));
        } else if (string_literal63(k)) {
          return(("[" + k + "]"));
        } else {
          return(("[" + quoted(k) + "]"));
        }
      })();
      str = (str + _g459 + sep + _g458);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, export: true}, "%for": {stmt: true, tr: true, special: function (_g460) {
    var _g461 = _g460[0];
    var t = _g461[0];
    var k = _g461[1];
    var body = sub(_g460, 1);
    var _g462 = compile(t);
    var ind = indentation();
    var _g463 = (function () {
      indent_level = (indent_level + 1);
      var _g464 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g464);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g462 + " do\n" + _g463 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g462 + ") {\n" + _g463 + ind + "}\n"));
    }
  }, module: "special", export: true}, "not": {module: "special", special: function (_g465) {
    var x = _g465[0];
    var _g466 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g466 + ")"));
  }, export: true}, "return": {stmt: true, module: "special", special: function (_g467) {
    var x = _g467[0];
    var _g468 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g468));
  }, export: true}, "%array": {module: "special", special: function (forms) {
    var open = (function () {
      if ((target === "lua")) {
        return("{");
      } else {
        return("[");
      }
    })();
    var close = (function () {
      if ((target === "lua")) {
        return("}");
      } else {
        return("]");
      }
    })();
    var str = "";
    var i = 0;
    var _g469 = forms;
    while ((i < length(_g469))) {
      var x = _g469[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, export: true}, "%function": {module: "special", special: function (_g470) {
    var args = _g470[0];
    var body = sub(_g470, 1);
    return(compile_function(args, body));
  }, export: true}, "%global-function": {stmt: true, tr: true, special: function (_g471) {
    var name = _g471[0];
    var args = _g471[1];
    var body = sub(_g471, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }, module: "special", export: true}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, runtime: {export: {split: {variable: true, module: "runtime", export: true}, "boolean?": {variable: true, module: "runtime", export: true}, "empty?": {variable: true, module: "runtime", export: true}, search: {variable: true, module: "runtime", export: true}, "function?": {variable: true, module: "runtime", export: true}, "number?": {variable: true, module: "runtime", export: true}, "is?": {variable: true, module: "runtime", export: true}, cat: {variable: true, module: "runtime", export: true}, "keys?": {variable: true, module: "runtime", export: true}, pairwise: {variable: true, module: "runtime", export: true}, "atom?": {variable: true, module: "runtime", export: true}, "string-literal?": {variable: true, module: "runtime", export: true}, replicate: {variable: true, module: "runtime", export: true}, join: {variable: true, module: "runtime", export: true}, exit: {variable: true, module: "runtime", export: true}, drop: {variable: true, module: "runtime", export: true}, splice: {variable: true, module: "runtime", export: true}, substring: {variable: true, module: "runtime", export: true}, mapo: {variable: true, module: "runtime", export: true}, keep: {variable: true, module: "runtime", export: true}, inner: {variable: true, module: "runtime", export: true}, write: {variable: true, module: "runtime", export: true}, add: {variable: true, module: "runtime", export: true}, extend: {variable: true, module: "runtime", export: true}, sub: {variable: true, module: "runtime", export: true}, "list?": {variable: true, module: "runtime", export: true}, length: {variable: true, module: "runtime", export: true}, iterate: {variable: true, module: "runtime", export: true}, "id-literal?": {variable: true, module: "runtime", export: true}, "%": {variable: true, module: "runtime", export: true}, "write-file": {variable: true, module: "runtime", export: true}, "+": {variable: true, module: "runtime", export: true}, "make-id": {variable: true, module: "runtime", export: true}, exclude: {variable: true, module: "runtime", export: true}, "some?": {variable: true, module: "runtime", export: true}, print: {global: true, module: "runtime", export: true}, "string?": {variable: true, module: "runtime", export: true}, reverse: {variable: true, module: "runtime", export: true}, last: {variable: true, module: "runtime", export: true}, "composite?": {variable: true, module: "runtime", export: true}, "/": {variable: true, module: "runtime", export: true}, apply: {variable: true, module: "runtime", export: true}, char: {variable: true, module: "runtime", export: true}, "<=": {variable: true, module: "runtime", export: true}, tl: {variable: true, module: "runtime", export: true}, "<": {variable: true, module: "runtime", export: true}, "nil?": {variable: true, module: "runtime", export: true}, ">": {variable: true, module: "runtime", export: true}, "table?": {variable: true, module: "runtime", export: true}, "=": {variable: true, module: "runtime", export: true}, setenv: {variable: true, module: "runtime", export: true}, unstash: {variable: true, module: "runtime", export: true}, stash: {variable: true, module: "runtime", export: true}, mapt: {variable: true, module: "runtime", export: true}, code: {variable: true, module: "runtime", export: true}, "parse-number": {variable: true, module: "runtime", export: true}, "*": {variable: true, module: "runtime", export: true}, map: {variable: true, module: "runtime", export: true}, hd: {variable: true, module: "runtime", export: true}, "-": {variable: true, module: "runtime", export: true}, sublist: {variable: true, module: "runtime", export: true}, ">=": {variable: true, module: "runtime", export: true}, "map*": {variable: true, module: "runtime", export: true}, reduce: {variable: true, module: "runtime", export: true}, "%message-handler": {variable: true, module: "runtime", export: true}, "read-file": {variable: true, module: "runtime", export: true}, "to-string": {variable: true, module: "runtime", export: true}, find: {variable: true, module: "runtime", export: true}}, import: ["special", "core"]}, utilities: {export: {"bind*": {variable: true, module: "utilities", export: true}, "to-id": {variable: true, module: "utilities", export: true}, macroexpand: {variable: true, module: "utilities", export: true}, "valid-id?": {variable: true, module: "utilities", export: true}, "macro?": {variable: true, module: "utilities", export: true}, quasiexpand: {variable: true, module: "utilities", export: true}, "special-form?": {variable: true, module: "utilities", export: true}, "macro-function": {variable: true, module: "utilities", export: true}, "initial-environment": {variable: true, module: "utilities", export: true}, "special?": {variable: true, module: "utilities", export: true}, bind: {variable: true, module: "utilities", export: true}, "symbol-expansion": {variable: true, module: "utilities", export: true}, "symbol?": {variable: true, module: "utilities", export: true}, indentation: {variable: true, module: "utilities", export: true}, "indent-level": {global: true, module: "utilities", export: true}, "variable?": {variable: true, module: "utilities", export: true}, exported: {variable: true, module: "utilities", export: true}, "bound?": {variable: true, module: "utilities", export: true}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, "stash*": {variable: true, module: "utilities", export: true}, "quote-environment": {variable: true, module: "utilities", export: true}, quoted: {variable: true, module: "utilities", export: true}, getenv: {variable: true, module: "utilities", export: true}, "module-key": {variable: true, module: "utilities", export: true}, imported: {variable: true, module: "utilities", export: true}, "quote-modules": {variable: true, module: "utilities", export: true}}, import: ["runtime", "special", "core"]}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g472 = sub(body, 0);
    var imports = [];
    var imp = _g472.import;
    var exp = _g472.export;
    var _g474 = 0;
    var _g473 = (imp || []);
    while ((_g474 < length(_g473))) {
      var k = _g473[_g474];
      load_module(k);
      imports = join(imports, imported(k));
      _g474 = (_g474 + 1);
    }
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g476 = 0;
    var _g475 = (exp || []);
    while ((_g476 < length(_g475))) {
      var k = _g475[_g476];
      setenv(k, {_stash: true, export: true});
      _g476 = (_g476 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler", export: true}}];
})();
(function () {
  var _g36 = nexus.runtime;
  var split = _g36.split;
  var boolean63 = _g36["boolean?"];
  var table63 = _g36["table?"];
  var search = _g36.search;
  var function63 = _g36["function?"];
  var number63 = _g36["number?"];
  var is63 = _g36["is?"];
  var cat = _g36.cat;
  var keys63 = _g36["keys?"];
  var pairwise = _g36.pairwise;
  var atom63 = _g36["atom?"];
  var string_literal63 = _g36["string-literal?"];
  var replicate = _g36.replicate;
  var join = _g36.join;
  var stash = _g36.stash;
  var drop = _g36.drop;
  var splice = _g36.splice;
  var substring = _g36.substring;
  var mapo = _g36.mapo;
  var keep = _g36.keep;
  var inner = _g36.inner;
  var write = _g36.write;
  var add = _g36.add;
  var reduce = _g36.reduce;
  var sub = _g36.sub;
  var list63 = _g36["list?"];
  var length = _g36.length;
  var iterate = _g36.iterate;
  var id_literal63 = _g36["id-literal?"];
  var _37 = _g36["%"];
  var write_file = _g36["write-file"];
  var _43 = _g36["+"];
  var _ = _g36["-"];
  var exclude = _g36.exclude;
  var _42 = _g36["*"];
  var _37message_handler = _g36["%message-handler"];
  var reverse = _g36.reverse;
  var make_id = _g36["make-id"];
  var apply = _g36.apply;
  var mapt = _g36.mapt;
  var unstash = _g36.unstash;
  var char = _g36.char;
  var _6061 = _g36["<="];
  var tl = _g36.tl;
  var _60 = _g36["<"];
  var _61 = _g36["="];
  var setenv = _g36.setenv;
  var to_string = _g36["to-string"];
  var code = _g36.code;
  var exit = _g36.exit;
  var nil63 = _g36["nil?"];
  var read_file = _g36["read-file"];
  var empty63 = _g36["empty?"];
  var extend = _g36.extend;
  var parse_number = _g36["parse-number"];
  var _62 = _g36[">"];
  var map = _g36.map;
  var hd = _g36.hd;
  var _47 = _g36["/"];
  var sublist = _g36.sublist;
  var _6261 = _g36[">="];
  var string63 = _g36["string?"];
  var composite63 = _g36["composite?"];
  var find = _g36.find;
  var last = _g36.last;
  var map42 = _g36["map*"];
  var some63 = _g36["some?"];
  var _g73 = nexus.utilities;
  var bind42 = _g73["bind*"];
  var bind = _g73.bind;
  var macroexpand = _g73.macroexpand;
  var valid_id63 = _g73["valid-id?"];
  var macro63 = _g73["macro?"];
  var quasiexpand = _g73.quasiexpand;
  var special_form63 = _g73["special-form?"];
  var macro_function = _g73["macro-function"];
  var initial_environment = _g73["initial-environment"];
  var special63 = _g73["special?"];
  var symbol_expansion = _g73["symbol-expansion"];
  var quote_modules = _g73["quote-modules"];
  var quote_environment = _g73["quote-environment"];
  var stash42 = _g73["stash*"];
  var exported = _g73.exported;
  var module_key = _g73["module-key"];
  var to_id = _g73["to-id"];
  var indentation = _g73.indentation;
  var imported = _g73.imported;
  var quoted = _g73.quoted;
  var bound63 = _g73["bound?"];
  var symbol63 = _g73["symbol?"];
  var variable63 = _g73["variable?"];
  var getenv = _g73.getenv;
  var _g81 = nexus.reader;
  var make_stream = _g81["make-stream"];
  var read = _g81.read;
  var read_from_string = _g81["read-from-string"];
  var read_table = _g81["read-table"];
  var read_all = _g81["read-all"];
  var _g118 = nexus.compiler;
  var compile_module = _g118["compile-module"];
  var compile_body = _g118["compile-body"];
  var eval = _g118.eval;
  var compile_call = _g118["compile-call"];
  var compile_special = _g118["compile-special"];
  var compile = _g118.compile;
  var compile_branch = _g118["compile-branch"];
  var open_module = _g118["open-module"];
  var load_module = _g118["load-module"];
  var compile_function = _g118["compile-function"];
  var in_module = _g118["in-module"];
  function rep(str) {
    var _g478 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g481) {
        return([false, _g481]);
      }
    })();
    var _g1 = _g478[0];
    var x = _g478[1];
    if (is63(x)) {
      return(print((to_string(x) + " ")));
    }
  }
  function repl() {
    var step = function (str) {
      rep(str);
      return(write("> "));
    };
    write("> ");
    (process.stdin.setEncoding)("utf8");
    return((process.stdin.on)("data", step));
  }
  function usage() {
    print((to_string("usage: lumen [options] <module>") + " "));
    print((to_string("options:") + " "));
    print((to_string("  -o <output>\tOutput file") + " "));
    print((to_string("  -t <target>\tTarget language (default: lua)") + " "));
    print((to_string("  -e <expr>\tExpression to evaluate") + " "));
    return(exit());
  }
  function main() {
    var args = sub(process.argv, 2);
    if (((hd(args) === "-h") || (hd(args) === "--help"))) {
      usage();
    }
    var spec = undefined;
    var output = undefined;
    var target1 = undefined;
    var expr = undefined;
    var i = 0;
    var _g479 = args;
    while ((i < length(_g479))) {
      var arg = _g479[i];
      if (((arg === "-o") || (arg === "-t") || (arg === "-e"))) {
        if ((i === (length(args) - 1))) {
          print((to_string("missing argument for") + " " + to_string(arg) + " "));
        } else {
          i = (i + 1);
          var val = args[i];
          if ((arg === "-o")) {
            output = val;
          } else if ((arg === "-t")) {
            target1 = val;
          } else if ((arg === "-e")) {
            expr = val;
          }
        }
      } else if ((nil63(spec) && ("-" != char(arg, 0)))) {
        spec = arg;
      }
      i = (i + 1);
    }
    if (output) {
      if (target1) {
        target = target1;
      }
      return(write_file(output, compile_module(spec)));
    } else {
      in_module((spec || "main"));
      if (expr) {
        return(rep(expr));
      } else {
        return(repl());
      }
    }
  }
  return(main());
})();
