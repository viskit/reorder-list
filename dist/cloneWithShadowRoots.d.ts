/**
 *
 * From https://gist.github.com/developit/45c85e9be01e8c3f1a0ec073d600d01e
 *
 * cloneNode(true), but also clones shadow roots.
 * @param {Element}
 * @param {ShadowRoot[]} [shadowRoots] Any closed shadow roots passed here will be included.
 */
declare function cloneWithShadowRoots(node: any, shadowRoots?: any[]): any;
export { cloneWithShadowRoots };
