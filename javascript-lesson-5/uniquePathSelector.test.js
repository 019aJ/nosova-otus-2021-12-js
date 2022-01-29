const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const getPath = require('./uniquePathSelector')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

test('input should be valid HTMLElement', () => {
    expect(() => {
        getPath(null);
    }).toThrow();
});

test('getPath should return value if HTMLElement is in document', () => {
    const result = getPath(document.getElementById('header'));
    expect(result).toBeDefined();
});

test('getPath should return null if HTMLElement is not in document', () => {
    const result = getPath(toElement("<div></div>"));
    expect(result).toBeDefined();
});

test('getPath should return selector for first-level element', () => {
    const result = getPath(document.body);
    expect(document.querySelectorAll(result)).toMatchObject(document.body);
});

test('getPath should return selector for first-level element', () => {
    const result = getPath(document.body);
    expect(document.querySelectorAll(result)).toMatchObject(document.body);
});

test('getPath should return selector for element with unique id', () => {
    const result = getPath(document.getElementById('header'));
    expect(document.querySelectorAll(result)).toMatchObject(document.body);
});

test('getPath should return selector for element with unique class', () => {
    const h = document.querySelectorAll('header h1')[0]
    const result = getPath(h);
    expect(document.querySelectorAll(result)).toMatchObject(h);
});

test('getPath should return selector for element with unique class/tag combination', () => {
    const h = document.querySelectorAll('div.lds-ripple')[0]
    const result = getPath(h);
    expect(document.querySelectorAll(result)).toMatchObject(h);
});

test('getPath should return selector for element with unique class/tag + parentPath combination', () => {
    const h = document.querySelectorAll('div.lds-ripple h2.subtitle')[0]
    const result = getPath(h);
    expect(document.querySelectorAll(result)).toMatchObject(h);
});

test('getPath should return selector for element with not unique class/tag + parentPath combination (use orderNumber)', () => {
    const h = document.querySelectorAll('div.lds-ripple h3.subtitle2')[0]
    const result = getPath(h);
    expect(document.querySelectorAll(result)).toMatchObject(h);
});

test('getPath should return selector for element with not unique class/tag + parentPath combination (use orderNumber) when parent has same problem', () => {
    const h = document.querySelectorAll('#navigation li:nth-child(3) a:nth-child(2)')[0]
    const result = getPath(h);
    expect(document.querySelectorAll(result)).toMatchObject(h);
});

test('getPath should return selector for element with multiple classes', () => {
    const h = document.querySelectorAll('.tab.active')[0]
    const result = getPath(h);
    expect(document.querySelectorAll(result)).toMatchObject(h);
});


test('Check All DOM', () => {
    domIterator(document.documentElement);
});

function domIterator(node) { 
    const result = getPath(node);
    expect(document.querySelectorAll(result)).toMatchObject(node);
    if (node.children.length > 0) { 
        for (let index = 0; index < node.children.length; index++) {
            const element = node.children[index];
            domIterator(element)
        }
    }
}

function toElement(s = '', c, t = document.createElement('template'), l = 'length') {
    t.innerHTML = s.trim(); c = [...t.content.childNodes]; return c[l] > 1 ? c : c[0] || '';
}

beforeAll(() => {
    document.body.innerHTML =
        "< !DOCTYPE html >" +
        "<html lang=\"en\">" +
        "<head>" +
        "  <meta charset=\"UTF-8\">" +
        "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
        "  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">" +
        "  <title>JS Prepare</title>" +
        "</head>" +
        "<body>" +
        "  <header id=\"header\">" +
        "    <h1 class=\"title\">БЛОГ 001001</h1>" +
        "    <h2 class=\"subtitle\">Создавайте статьи и добавляйте их в избранное</h2>" +
        "    <button class=\"get-started button button-primary button-large js-header-start\">Приступить</button>" +
        "  </header>" +
        "  <section class=\"container w-container\">" +
        "    <ul class=\"tabs\" id=\"navigation\">" +
        "      <li><a class=\"tab \" href=\"#\" data-name=\"posts\">Посты</a></li>" +
        "      <li><a class=\"tab active\" href=\"#\" data-name=\"create\">Создать</a></li>" +
        "      <li><a class=\"tab\" href=\"#\" data-name=\"favorite\">Избранное</a>" +
        "          <a class=\"tab\" href=\"ya.ru\" data-name=\"favorite\">Избранное2</a>" +
        "      </li>" +
        "    </ul>" +
        "    <div class=\"loader-wrap hide\" id=\"loader\">" +
        "      <div class=\"lds-ripple\">" +
        "        <h1 class=\"lds-ripple\"></h1>" +
        "        <h2 class=\"subtitle\"></h2>" +
        "        <h3 class=\"subtitle2\"></h3>" +
        "        <h3 class=\"subtitle2\"></h3>" +
        "        <div></div>" +
        "      </div>" +
        "    </div>" +
        "  </section>" +
        "</body>" +
        "</html>";
});

