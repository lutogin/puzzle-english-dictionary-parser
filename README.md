## Description

If you use puzzle-english and you need to get words from your vocabulary, you don't have this functionality.
This app solve that problem.

## Preparing
Put you ```session``` data from puzzle-english to the ```.env``` file

## Running the app (local)

```bash
# run at local
$ npm install
$ npm run build
$ npm run start
```

## Running the app (docker)

```bash
# run at docker
$ docker-compose up pe-parser
```

## Using

Main endpoint for run parsing words is `GET` to ```http://127.0.0.1/pe-parser```
Also you can add additional params ```startPage``` and ```endPage``` if you need some special words to parse.
Default puzzle-english use order by date add to your vocabulary.

After run script you see your words and translations into out directory inside the app.

## Feature
Maybe if I will have a time I will add integration to google spreadsheet.

## Stay in touch

- Linkedin - [Andrew](https://www.linkedin.com/in/andrey-lutogin-b03849182/)

## License

It's [MIT licensed](LICENSE).
