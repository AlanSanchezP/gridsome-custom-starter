export class OffClickHandlerBuilder {
    #action = () => {};
    #evaluator = () => true;
    #ignoredRefs = [];

    setAction(action) {
        this.#action = action;
        return this;
    }

    // Sets a function that determines if the event should be
    //  processed or ignored, by returning a boolean value. 
    //  The default function always returns true.
    setEvaluator(evaluator) {
        this.#evaluator = evaluator;
        return this;
    }

    // Adds a ref NAME (inside the same parent component) 
    //  that should be treated as part of the element itself
    ignoreRefName(refElementName) {
        this.#ignoredRefs.push(refElementName);
        return this;
    }

    removeIgnoredRefName(refElementName) {
        this.#ignoredRefs = this.#ignoredRefs.filter(item => item !== refElementName);
        return this;
    }

    build() {
        return new OffClickHandler(this.#action, this.#evaluator, this.#ignoredRefs);
    }
};

class OffClickHandler {
    constructor(action, evaluator, ignoredRefs) {
        if (!(action && action.constructor && action.call && action.apply)) {
            throw new Error('No evaluator function was provided.');
        }
        if (!(evaluator && evaluator.constructor && evaluator.call && evaluator.apply)) {
            throw new Error('No evaluator function was provided.');
        }
        this.action = action;
        this.evaluator = evaluator;
        this.ignoredRefs = ignoredRefs;
    }
}

var touchWasActivated = false;
var mouseDownWasActivated = false;
var handlers = [];

function universalListenerManager(e) {
  // Prevents all events from firing the same callbacks one after another.
  //  All three listeners are needed to cover all screens and use cases
  if (e.type == 'touchstart') {
    touchWasActivated = true;
  } else if (e.type == 'mousedown') {
    mouseDownWasActivated = true;
    if (touchWasActivated) {
      touchWasActivated = false;
      return;
    }
  } else if (e.type == 'click') {
    if (mouseDownWasActivated) {
      mouseDownWasActivated = false;
      return;
    } else {
      console.warn('Click event got fired but mousedown didn\'t.');
    }
  }

  for (let handler of handlers) {
    handler(e);
  }
}

function toggleEventListenersFor(element, attach) {
  if (attach) {
    if (!handlers.length) {
      document.body.addEventListener('touchstart', universalListenerManager);
      document.body.addEventListener('mousedown', universalListenerManager);
      document.body.addEventListener('click', universalListenerManager);
    }
    handlers.push(element.offClick);
  } else {
    handlers = handlers.filter(item => item !== element.offClick);
    if (!handlers.length) {
      document.body.removeEventListener('touchstart', universalListenerManager);
      document.body.removeEventListener('mousedown', universalListenerManager);
      document.body.removeEventListener('click', universalListenerManager);
    }
  }
}

export default {
    bind(el, binding, vnode) {
      var offClickHandler = binding.value;
      if (!(offClickHandler instanceof OffClickHandler)) {
        throw new Error('Provided value is not an instance of OffClickHandler.');
      }

      var associatedComponent = vnode.context;
      function processEvent(event) {
        // Target is outside desired element
        if (el !== event.target && !el.contains(event.target)) {
          let shouldIgnoreTarget = false;
          // Check if target is an ignored sibling
          for (let i of offClickHandler.ignoredRefs) {
            let element = associatedComponent.$refs[i];
            if (element === undefined) {
              console.warn(`Reference '${i}' was not found in parent component.`);
              continue;
            }
            if (element === event.target || element.contains(event.target)) {
              shouldIgnoreTarget = true;
              break;
            }
          }
        
          // If not, call action
          if (!shouldIgnoreTarget) {
            offClickHandler.action(event, el);
          }
        }
      }
      el.offClick = function offClickEvaluation(event) {
        if (offClickHandler.evaluator()) {
          processEvent(event);
        }
      };

      toggleEventListenersFor(el, true);
    },
    unbind(el) {
      toggleEventListenersFor(el, false);
    }
  }