let context = require.context('./client', true, /spec\.ts$/);
context.keys().forEach(context);
