// Helper functions: debounce, DOM helpers, Queue helpers

export function debounce(fn, delay = 200) {
  let t;
  return (...args) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

export const qs = (sel, scope = document) => scope.querySelector(sel);
export const qsa = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));
export const on = (el, ev, handler, opts) => el.addEventListener(ev, handler, opts);
export function createEl(tag, props = {}) {
  const el = document.createElement(tag);
  Object.assign(el, props);
  return el;
}

export class Queue {
  constructor(items = []) {
    this.items = Array.isArray(items) ? items.slice() : [];
    this.index = this.items.length ? 0 : -1;
  }
  setList(items) {
    this.items = Array.isArray(items) ? items.slice() : [];
    this.index = this.items.length ? 0 : -1;
  }
  pushUnique(id) {
    if (!id) return this.items.length;
    const i = this.items.indexOf(id);
    if (i === -1) this.items.push(id);
    return this.items.length;
  }
  current() {
    if (this.index < 0 || this.index >= this.items.length) return null;
    return this.items[this.index];
  }
  hasPrev() { return this.items.length > 0 && this.index > 0; }
  hasNext() { return this.items.length > 0 && this.index >= 0 && this.index < this.items.length - 1; }
  next() {
    if (this.hasNext()) this.index += 1;
    return this.current();
  }
  prev() {
    if (this.hasPrev()) this.index -= 1;
    return this.current();
  }
  setIndexById(id) {
    const i = this.items.indexOf(id);
    if (i !== -1) this.index = i;
    return this.index;
  }
  toArray() { return this.items.slice(); }
}
