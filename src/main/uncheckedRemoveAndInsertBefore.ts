import { ParentNode } from './ParentNode';
import { ChildNode } from './ChildNode';
import { uncheckedRemoveChild } from './uncheckedRemoveChild';
import { uncheckedInsertBefore } from './uncheckedInsertBefore';
import { CHILD_NODES, CHILDREN, isDocumentFragment } from './utils';
import { InsertableNode } from './uncheckedToInsertableNode';

export function uncheckedRemoveAndInsertBefore(parent: ParentNode, node: InsertableNode, child: ChildNode): void {
  if (isDocumentFragment(node)) {
    const childNodes = node[CHILD_NODES];
    const children = node[CHILDREN];

    let nodeChild = node.firstChild;

    while (nodeChild != null) {
      const { nextSibling } = nodeChild;
      uncheckedInsertBefore(parent, nodeChild, child);
      nodeChild = nextSibling;
    }

    if (childNodes != null) {
      childNodes.length = 0;
    }
    if (children != null) {
      children.length = 0;
    }
    node.firstChild = node.lastChild = null;
    return;
  }

  const { parentNode } = node;

  if (parentNode != null) {
    uncheckedRemoveChild(parentNode, node);
  }
  uncheckedInsertBefore(parent, node, child);
}
