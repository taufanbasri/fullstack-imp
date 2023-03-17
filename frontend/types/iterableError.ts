export class IterableError extends Error {
  *[Symbol.iterator]() {
    yield this;
  }
}
