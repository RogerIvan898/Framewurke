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

        const tagNameNode = openingElement.name
        let tagName = null
        let isCustomComponent = false

        if(t.isJSXIdentifier(tagNameNode)){
          tagName = tagNameNode.name
          isCustomComponent = tagName !== 'div' && tagName !== 'span'
        } else if(t.isJSXMemberExpression(tagNameNode)){
          tagName = `${tagNameNode.object.name}.${tagNameNode.property.name}`
          isCustomComponent = true
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

        let createElementInvoke = null
        if(isCustomComponent){
          createElementInvoke = t.callExpression(t.identifier(tagName), [])
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
        path.replaceWith(createElementInvoke)
      }
    }
  };
};
