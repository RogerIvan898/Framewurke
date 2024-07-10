var virtualDom = {
    type: 'element',
    tag: 'div',
    props: null,
    content: [{
            type: 'element',
            tag: 'div',
            props: { textContent: 'text' },
            content: null
        }]
};
var createVDomElement = function (tag, props) {
    var element = document.createElement(tag);
    if (props)
        Object.keys(props).forEach(function (key) {
            element.setAttribute(key, props[key]);
        });
    return element;
};
var createDomElementFromVirtual = function (vNode) {
    var _a;
    if (vNode.type === 'element') {
        var vElement = vNode;
        var element_1 = createVDomElement(vElement.tag, vElement.props);
        if ((_a = vElement.content) === null || _a === void 0 ? void 0 : _a.length)
            vElement.content.forEach(function (childNode) {
                element_1.appendChild(createDomElementFromVirtual(childNode));
            });
        return element_1;
    }
    else if (vNode.type === 'text') {
        var vText = vNode;
        return document.createTextNode(vText.content);
    }
    throw new Error('Unknown virtual node type');
};
var dom = createDomElementFromVirtual(virtualDom);
document.body.appendChild(dom);
