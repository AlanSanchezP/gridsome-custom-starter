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
      // TODO: Will these trigger at once?
      document.body.addEventListener('click', el.offClick.bind(this));
      document.body.addEventListener('touchstart', el.offClick.bind(this));
    },
    unbind(el) {
      document.body.removeEventListener('click', el.offClick.bind(this));
      document.body.removeEventListener('touchstart', el.offClick.bind(this));
    }
  }