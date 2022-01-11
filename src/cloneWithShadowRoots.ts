/**
 *
 * From https://gist.github.com/developit/45c85e9be01e8c3f1a0ec073d600d01e
 *
 * cloneNode(true), but also clones shadow roots.
 * @param {Element}
 * @param {ShadowRoot[]} [shadowRoots] Any closed shadow roots passed here will be included.
 */
function cloneWithShadowRoots(node, shadowRoots = []) {
  function walk(node, clone) {

    let shadow = node.shadowRoot || shadowRoots.find((r) => r.host === node);
    if (shadow) {
      const cloneShadow = clone.shadowRoot || clone.attachShadow({ mode: shadow.mode });
      cloneShadow.append(...[].map.call(shadow.childNodes, (c) => c.cloneNode(true)));
    }
    for (let i = 0; i < node.children.length; i++)
      walk(node.children[i], clone.children[i]);
  }
  const clone = node.cloneNode(true);

  walk(node, clone);
  return clone;
}

export { cloneWithShadowRoots };
