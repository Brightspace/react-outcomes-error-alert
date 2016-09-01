# react-outcomes-error-alert

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]

Error alert displayed when connection or server errors occur. Two types or errors will be shown.

1. Connection Error: This errors is for when a network error or a timeout has occured. It will notify the user that the request will be retried.

![screenshot of loading component](/examples/connection-error.png?raw=true)

2. Server Error: This error is for when a fatal error has occured such as a 400 is returned from an API. Within this error is the ability to reload the page.

![screenshot of loading component](/examples/fatal-error.png?raw=true)

## Installation

`react-outcomes-error-alert` can be installed from [NPM][npm-url]
```shell
npm install react-outcomes-error-alert
```

## Usage

Include SASS file in your project:

```sass
@import 'node_modules\react-outcomes-error-alert\dist\ErrorAlert.scss'
```

Import and add the react component into your project

The error takes the following property:

* `refresh`: required, function to attack to link in the fatal error in order to reload the page

```javascript
import ErrorAlert from 'react-outcomes-error-alert';

let refresh = () => window.location.reload();

<ErrorAlert refresh={refresh} />
```

To Trigger the different error alerts the library exposes three error actions:

* `handleServerTimeout`: Will display connection error alert
* `handleServerError`: Will display server error alert
* `hideErrorAlert`: Will hide the erro alert

```javascript

import { ErrorActions } from 'react-outcomes-error-alert';

ErrorActions.showConnErrorAlert();
ErrorActions.showServerErrorAlert();
ErrorActions.hideErrorAlert();
```
## Contributing

 **Fork** the repository. Committing directly against this repository is
   highly discouraged. Please create a Pull Request.


## Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) rules and contributions should make use of them.


[npm-url]: https://www.npmjs.org/package/react-outcomes-error-alert
[npm-image]: https://img.shields.io/npm/v/react-outcomes-error-alert.svg
[ci-url]: https://travis-ci.org/Brightspace/react-outcomes-error-alert
[ci-image]: https://img.shields.io/travis-ci/Brightspace/react-outcomes-error-alert.svg
