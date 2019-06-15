# stalkR

StalkR enables you to stalk anyone on instagram.

## Getting Started

In order for the application to work properly you need to create ".env" file at the root level of project structure. That file needs all the properties inside of the "env.sample" file.

Run this command to create vapid keys and add them to .env file that you just created:
```
./node_modules/.bin/web-push generate-vapid-keys
```

To make a succesfull connection to the database you need to provide MongoDB Atlas server name and password inside of .env file as well.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
