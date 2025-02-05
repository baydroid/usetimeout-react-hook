<h1 align="center">usetimeout-react-hook</h1>

> React.js custom hook that sets a leak-safe timeout and returns a function to cancel it before the timeout expires.

## Why this fork?

This fork is is almost exactly identical to the original.

It's intended to avoid version check issues which otherwise needlessly block usetimeout-react-hook from working with later versions of react-native.
(The only things the code imports from react are the useEffect() and useRef() functions, neither of which seems likely to change in the forseeable future.)

The differences from the orginal are:
- build procedure simplified to not use rollup;
- tests removed;
- package-lock.json removed;
- package.json modified;
- tsconfig.json modified;
- And README.md modified.

The typescript source (in src) is exactly identical to the original.

## Install

```sh
npm install https://github.com/baydroid/usetimeout-react-hook
```

## 🔑 Key features

* 🥇 inspired by [this awesome blog post](https://overreacted.io/making-setinterval-declarative-with-react-hooks) by [Dan Abramov](https://github.com/gaearon)
* ⚠️ optional manual cancelability of timeout
* ✨ uses [useEffect](https://reactjs.org/docs/hooks-effect.html) dependencies array as a policy to dictate the hook updates, by default no dependency is specified
* 💪 written in TypeScript
* ✔️ 100% test coverage

## 🤔 Yet another setTimeout hook, why?

If you search something among the lines of [react-use-timeout](https://www.npmjs.com/search?q=react-use-timeout) a number of results
appear. Why was this package necessary?

Most of the other timeout hook packages I've glanced at had the following shortcomings:

* stuck with setTimeout, with no generic timer support
* no custom re-render policy
* no tests in place

Sometimes user needs the ability to use a custom timer, since `setTimeout` may not always be the best choice, especially in
React Native applications. In fact, the primary reason I built this custom hook was to expose a customizable and reusable
timeout manager for an other package of mine, [react-native-user-inactivity](https://github.com/jkomyno/react-native-user-inactivity).
A number of users had pointed out that on **React Native** there were the following issues with `setTimeout`:

* it would cause a crash on Android after many minutes of timeout
* it would simply stop working when the application is in background

Hopefully this package will be useful to others as well.

## ❔ How to use

This package exposes two hooks, [useTimeoutDefault](src/useTimeoutDefault.ts) and [useTimeout](src/useTimeout.ts).
Actually, the first one is just a wrapper for the second, and uses the standard `setTimeout` and `clearTimeout` as
timeout handler methods.
Since useTimeoutDefault is what many users probably need the most, it's the default exported package.
Each of this hook return a single function, which can be optionally used to manually cancel the timeout before it expires.
The type of this function, `CancelTimer`, is: `() => void`.

The signature of `useTimeoutDefault` is the following:

```typescript
import useTimeoutDefault from 'usetimeout'; // notice that it's a default import

/**
 * useTimeoutDefault is a React.js custom hook that sets a leak-safe timeout and returns
 * a function to cancel it before the timeout expires.
 * It uses the default timeout handlers, i.e. window.setTimeout and window.clearTimeout.
 * It's composed of two other native hooks, useRef and useEffect.
 * If a new callback is given to the hook before the previous timeout expires,
 * only the new callback will be executed at the moment the timeout expires.
 * When the hook receives a new callback, the timeout isn't reset.
 * 
 * @param callback the function to be executed after the timeout expires
 * @param timeout the number of milliseconds after which the callback should be triggered
 * @param deps useEffect dependencies that should cause the timeout to be reset
 * @return function to cancel the timer before the timeout expires
 */
type UseTimeoutDefault = (callback: () => void, timeout: number, deps?: unknown[]) => CancelTimer;
```

Since `usetimeout` supports a generic timer, it requires an implementation of the TimeoutHandler interface, which is defined as:

```typescript
interface TimeoutHandler<T> {
  /**
   * Timeout function that accepts two parameters:
   * a function and the timeout after which that function is fired.
   * If not provided, the default `setTimeout` implementation will be
   * the standard `window.setTimeout`.
   */
  setTimeout: (fn: () => void, timeout: number) => T;

  /**
   * Function that should be used to clear the effects of `setTimeout` after
   * the component where it is rendered is unmounted.
   * If not provided, the default `clearTimeout` implementation will be
   * the standard `window.clearTimeout`.
   */
  clearTimeout: (timeout: T | undefined) => void;
}
```

The signature of `useTimeout` is the following:

```typescript
import { useTimeout } from 'usetimeout'; // notice that it's a named import

/**
 * useTimeout is a React.js custom hook that sets a leak-safe timeout and returns
 * a function to cancel it before the timeout expires.
 * It's composed of two other native hooks, useRef and useEffect.
 * It requires a custom way of setting a timeout and clearing it, expressed as an implementation
 * of the generic TimeoutHandler<T> interface.
 * The timer is restarted every time an item in `deps` changes.
 * If a new callback is given to the hook before the previous timeout expires,
 * only the new callback will be executed at the moment the timeout expires.
 * When the hook receives a new callback, the timeout isn't reset.
 * 
 * @param callback the function to be executed after the timeout expires
 * @param timeout the number of milliseconds after which the callback should be triggered
 * @param timeHandler TimeoutHandler instance that's used to set and clear the timeout
 * @param deps useEffect dependencies that should cause the timeout to be reset
 * @return function to cancel the timer before the timeout expires
 */
type UseTimeout = <T>(callback: () => void, timeout: number, timeHandler: TimeoutHandler<T>, deps?: unknown[]) => CancelTimer;
```

---------------------------------------------------------

## 👤 Author

**Alberto Schiabel**

* Github: [@jkomyno](https://github.com/jkomyno)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/jkomyno/usetimeout-react-hook/issues).
The code is short, throughly commented and well tested, so you should feel quite comfortable working on it.
If you have any doubt or suggestion, please open an issue.

## 🦄 Show your support

Give a ⭐️ if this project helped or inspired you!

## 📝 License

Built with ❤️ by [Alberto Schiabel](https://github.com/jkomyno).<br />
This project is [MIT](https://github.com/jkomyno/usetimeout-react-hook/blob/master/LICENSE) licensed.

## Related packages

* [react-native-user-inactivity](https://github.com/jkomyno/react-native-user-inactivity)
