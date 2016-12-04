let context = require.context('./client/corelogic', true, /\.ts$/);
context.keys().forEach(context);
