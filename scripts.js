var lastLogTimestamp;

var toTest = {  // https://developer.mozilla.org/en-US/docs/Web/Events
  'mouse': {    // https://www.w3.org/TR/DOM-Level-3-Events/#events-mouse-types
    id: 'mouse-events',
    label: 'Mouse Events',
    events: ['click', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup']
  },
  'touch': {    // https://www.w3.org/TR/touch-events/#list-of-touchevent-types
    id: 'touch-events',
    label: 'Touch Events',
    events: ['touchstart', 'touchend', 'touchmove', 'touchcancel']
  },
  'pointer': {  // https://www.w3.org/TR/pointerevents/#pointer-event-types
    id: 'pointer-events',
    label: 'Pointer Events',
    events: ['pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture']
  }
}

function buildCheckboxListItem(item) {
  var checkbox, label, li;
  var listenerActive = false;
  var listenerTarget = document.getElementById('test-container');
  var ID = item.id;
  var LABEL_TEXT = item.label;
  var VALUE = item.id;

  li = document.createElement('li')

  checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', ID);
  checkbox.setAttribute('value', VALUE);
  checkbox.onchange = function() {
    listenerActive
      ? item.events.forEach(function(event) { removeEventListenerFromTarget(listenerTarget, event); })
      : item.events.forEach(function(event) { addEventListenerToTarget(listenerTarget, event); });
    listenerActive = !listenerActive;
  }
  li.appendChild(checkbox)

  label = document.createElement('label');
  label.setAttribute('for', ID);
  label.innerHTML = LABEL_TEXT;
  li.appendChild(label)

  return li;
}

function log(event) {
  var container, li, timestamp, timeDiff;
  var logMessage = '';

  timestamp = Date.now();
  timeDiff = lastLogTimestamp ? timestamp - lastLogTimestamp : null;
  lastLogTimestamp = timestamp;

  container = document.getElementById('log-list')

  logMessage += event.type;

  if (typeof(timeDiff) !== 'undefined') {
    logMessage += '(' + timeDiff + 'ms)'
  }

  li = document.createElement('li');
  li.innerHTML = logMessage;

  container.appendChild(li);
}

function addEventListenerToTarget(target, event) {
  target.addEventListener(event, log);
}

function removeEventListenerFromTarget(target, event) {
  target.removeEventListener(event, log);
}

function addSidebarOptions() {
  var container, checkboxes;

  container = document.getElementById('options-checkboxes');

  checkboxes = document.createElement('ul')
  container.appendChild(checkboxes)

  Object.keys(toTest).forEach(function(key) {
    var li = buildCheckboxListItem(toTest[key]);
    checkboxes.appendChild(li);
  });
}

function clearResults() {
  var container = document.getElementById('log-list');
  container.innerHTML = '';
}

function addButtonFunctionality() {
  var clearButton = document.getElementById('clear-log-list');
  clearButton.onclick = clearResults;
}

addSidebarOptions();
addButtonFunctionality();
