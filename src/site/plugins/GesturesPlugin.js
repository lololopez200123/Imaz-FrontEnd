export default {
  install(Vue) {
    Vue.mixin({
      directives: {
        swipe: {
          bind(el, bindings, vnode) {
            let startX = 0;
            let endX = 0;
            const start = ev => {
              if (ev.touches && ev.touches[0] && ev.touches[0].clientX)
                startX = ev.touches[0].clientX;
            };
            const move = ev => {
              if (ev.touches && ev.touches[0] && ev.touches[0].clientX)
                endX = ev.touches[0].clientX;
            };
            const end = () => {
              if (Math.abs(endX - startX) > window.innerWidth / 3) {
                const fnLeft = Object.keys(bindings.modifiers)[0];
                const fnRight = Object.keys(bindings.modifiers)[1];
                const val = bindings.value;
                if (fnRight && endX < startX) {
                  vnode.context[fnRight](val);
                } else if (fnLeft && endX > startX) {
                  vnode.context[fnLeft](val);
                }
                startX = 0;
                endX = 0;
              }
            };
            el.addEventListener("touchstart", start, true);
            el.addEventListener("touchmove", move, true);
            el.addEventListener("touchend", end, true);
            el.addEventListener("touchcancel", end, true);
          }
        }
      }
    });
  }
};
