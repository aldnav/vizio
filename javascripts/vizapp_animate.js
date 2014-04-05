///////////////////
// VIZIO LIBRARY //
///////////////////

function Vizio() {
    stage = $('#stage');
    var width = 960, height = 640;
    stgsvg = createSVG('svg', { width: width, height:height, id: 'stgsvg' });
    stage.append(stgsvg);
    stgsvg = $('svg');
    colorLib = {
        'turquoise': ['#1CCDAA', '#19B698'],
        'green': ['#40D47E', '#2CC36B'],
        'blue': ['#44A0DE', '#2E8ECE'],
        'purple': ['#A66ABE', '#9B50BA'],
        'orange': ['#F2C821', '#F4A62A'],
        'red': ['#EA6153', '#C1392B'],
        'gray': ['#A3B1B2', '#8C9899'],
        'darkgray': ['#3D566E', '#2F4256']
    };
    centerX = stgsvg.attr('width') / 2;
    centerY = stgsvg.attr('height') / 2;
    g_nodeCount = 0;
    c_radius = 10;
    t_size = 12;
    clicked = false;

    /////////////////////////////////////
    // Get random color from color lib //
    /////////////////////////////////////

    function getRandomHue() {
        var min = 0, max = Object.size(colorLib),
            keys = Object.keys(colorLib),
            id = Math.floor(Math.random() * (max - min)) + min,
            count = 0, hue = null;
        for (el in colorLib) {
            if (count == id) {
                hue = el;
                return colorLib[hue];
            }
            count++;
        }
    }

    ////////////////////
    // CLICK HANDLERS //
    ////////////////////

    ///////////////////////////////
    // SVG MOUSEDOWN = ADD STATE //
    ///////////////////////////////

    stgsvg.on('mousedown', function(e) {
        clicked = true;
        var hue = getRandomHue();
        var g_node = createSVG('g', {class: 'g_node'});
        var c_node = createSVG('circle', {cx: e.pageX, cy: e.pageY, r: c_radius, fill: hue[0], 'stroke-width': 3, stroke: hue[1], class: 'c_node'});
        var t_node = createSVG('text', {x: e.pageX-(t_size/2), y: e.pageY+(t_size/4), fill: 'white','font-size': t_size, class: 't_node'});
        t_node.innerHTML = 'q' + g_nodeCount;
        // var animateX = createSVG('animate', {attributeName: 'cx', attributeType: 'XML', from: e.pageX, to: e.pageX-10, begin:'0s', dur:'2s', fill:'freeze'});
        // var animateY = createSVG('animate', {attributeName: 'cy', attributeType: 'XML', from: e.pageY, to: e.pageY-10, begin:'0s', dur:'2s', fill:'freeze'});
        // c_node.appendChild(animateX);
        // c_node.appendChild(animateY);
        // t_node.appendChild(animateX);
        // t_node.appendChild(animateY);
        g_node.appendChild(c_node);
        g_node.appendChild(t_node);
        stgsvg.append(g_node);
        g_nodeCount++;
    });

    $('g').on('mousemove', function(e) {
        if (clicked) {
            console.log($(this));
        }
    });

}


/////////////////////////
// Create svg elements //
/////////////////////////

function createSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

///////////////////////////////////
// Get size of associative array //
///////////////////////////////////

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};