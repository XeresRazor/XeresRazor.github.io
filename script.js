(function () {
  "use strict";

  var list = document.getElementById("cards");
  if (!list) return;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function isArray(v) { return Array.isArray(v); }

  function buildCard(item) {
    var li = el("li", "card");
    var h = el("h3", "card-title");
    var a = el("a", "card-link", String(item.title || "Untitled"));
    a.href = String(item.url || "#");
    h.appendChild(a);
    li.appendChild(h);

    if (item.description) li.appendChild(el("p", "card-desc", String(item.description)));

    if (isArray(item.tags) && item.tags.length) {
      var tags = el("ul", "tags");
      tags.setAttribute("aria-label", "Tags");
      item.tags.forEach(function (t) { tags.appendChild(el("li", "tag", String(t))); });
      li.appendChild(tags);
    }

    var meta = el("p", "card-meta");
    var hasMeta = false;
    if (item.source) {
      var s = el("a", "card-source", "Source code");
      s.href = String(item.source);
      meta.appendChild(s);
      hasMeta = true;
    }
    if (item.updated) {
      if (hasMeta) meta.appendChild(document.createTextNode(" · "));
      meta.appendChild(el("span", "card-updated", "Updated " + String(item.updated)));
      hasMeta = true;
    }
    if (hasMeta) li.appendChild(meta);
    return li;
  }

  function showError() {
    var box = el("li", "message");
    box.setAttribute("role", "alert");
    box.appendChild(el("p", "", "The list of designs could not be loaded. Here is a direct link instead."));
    var ul = el("ul", "plain-list");
    var li = el("li");
    var a = el("a", "", "Gridfinity lidded bin");
    a.href = "/Cadovafinity/";
    li.appendChild(a);
    ul.appendChild(li);
    box.appendChild(ul);
    list.appendChild(box);
  }

  fetch("customizers.json", { headers: { "Accept": "application/json" } })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (items) {
      if (!isArray(items)) throw new Error("Unexpected data");
      items.forEach(function (item) { list.appendChild(buildCard(item)); });
    })
    .catch(showError);
})();
