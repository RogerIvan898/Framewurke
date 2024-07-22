// babel-plugin-jsx-to-js.js

const htmlTags = new Set([
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote',
  'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del',
  'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd',
  'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup',
  'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script',
  'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody',
  'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'
]);

module.exports = function({ types: t }) {
  return {
    visitor: {
      JSXElement(path) {
        const openingElement = path.node.openingElement;
        const children = path.node.children.map(child => {
          if (t.isJSXText(child)) {
            const trimmedValue = child.value.trim();
            if (trimmedValue) {
              return t.stringLiteral(trimmedValue);
            } else {
              return null; // Удалить пустые строки
            }
          } else if (t.isJSXExpressionContainer(child)) {
            return child.expression;
          }
          return child;
        }).filter(Boolean);

        const tagNameNode = openingElement.name;
        let tagName = null;
        let isCustomComponent = false;

        if (t.isJSXIdentifier(tagNameNode)) {
          tagName = tagNameNode.name;
          isCustomComponent = !htmlTags.has(tagName); // Проверка на стандартные HTML теги
        } else if (t.isJSXMemberExpression(tagNameNode)) {
          tagName = `${tagNameNode.object.name}.${tagNameNode.property.name}`;
          isCustomComponent = true;
        }

        const attributes = openingElement.attributes.map(attr => {
          if (t.isJSXAttribute(attr)) {
            const attributeName = t.stringLiteral(attr.name.name);
            let attributeValue = attr.value || t.booleanLiteral(true);
            if (t.isJSXExpressionContainer(attributeValue)) {
              attributeValue = attributeValue.expression;
            }
            return t.objectProperty(attributeName, attributeValue);
          }
          return null;
        }).filter(Boolean);

        let createElementInvoke = null;
        if (isCustomComponent) {
          createElementInvoke = t.callExpression(
            t.identifier(tagName),
            [t.objectExpression(attributes)]
          );
        } else {
          createElementInvoke = t.callExpression(
            t.memberExpression(t.identifier("VDOM"), t.identifier("createElement")),
            [
              t.stringLiteral(tagName),
              t.objectExpression(attributes),
              ...children
            ]
          );
        }

        path.replaceWith(createElementInvoke);
      }
    }
  };
};
