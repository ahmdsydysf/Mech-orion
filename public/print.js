// the print window's script (loaded with <script src>, so the CSP needs no inline script): the back and print buttons,
// then print once the fonts and the images are in
(function () {
  var pb = document.getElementById('pwBack'), pp = document.getElementById('pwPrint');
  if (pb) pb.onclick = function () { window.close(); setTimeout(function () { location.replace(window.opener && !window.opener.closed ? window.opener.location.href : document.baseURI); }, 400); };
  if (pp) pp.onclick = function () { window.print(); };
  var imgs = [].map.call(document.images, function (i) { return i.complete ? 0 : new Promise(function (r) { i.onload = i.onerror = r; }); });
  Promise.all([document.fonts ? document.fonts.ready : 0].concat(imgs)).then(function () { setTimeout(function () { window.print(); }, 300); });
})();
