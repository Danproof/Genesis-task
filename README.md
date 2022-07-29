# Genesis-task
## To run

1. Install and run [Docker](https://www.docker.com/).
2. Run `docker build . -t genesis` to build docker image.
3. You need to get the app password in your Google account from which you going to send emails/ [Tutorial](https://support.google.com/mail/answer/185833?hl=en).
4. Run `docker run --rm -e EMAIL=your_email@example.com -e PASSWORD=**************** -p 3000:3000 genesis`.
5. Go to http://localhost:3000/api.
