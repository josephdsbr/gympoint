## Installing dependencies

Use `yarn` or `npm install` to install the projects' dependencies.

## Configuration

This application uses a request to access a Rest API. Then, we have to set the host of our backend. For it, you can access the folder **(~/mobile/src/services/api.js)** and set the host of the backend.

If you are using your backend on the localhost, be careful, because React Native interprets localhost or 127.0.0.1 as the IP of your device, not your machine.

## Available Scripts

In the project directory, you can run:

### `yarn android`

Builds the app for an Android device.

### `yarn ios`

Builds the app for IOS devices.

This project was made only testing Android, if you want to test it on an Apple device then you should follow more steps.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn start`

Starts the app in your device.

To this script runs correctly is needed to have run the scripts `yarn android` or `yarn ios` before.

### `yarn test`

Runs tests if it exists.

### `yarn lint`

Search in the project errors based on eslint rules.
