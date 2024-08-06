sequenceDiagram
  participant browser
  participant user
  participant server

  user->>browser: navigate to https://studies.cs.helsinki.fi/exampleapp/spa

  browser->>server: GET /exampleapp/spa
  activate server
  server-->>browser: HTML
  deactivate server

  browser->>server: GET /exampleapp/main.css
  activate server
  server-->>browser: CSS
  deactivate server

  browser->>server: GET /exampleapp/spa.js
  activate server
  server-->>browser: JavaScript
  deactivate server

  Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

  browser->>server: GET /exampleapp/data.json
  activate server
  server-->>browser: JSON data [ { content: "single page app does not reload the whole page", date: "2019-05-25T15:15:59.905Z" }, ... ]
  deactivate server

  Note right of browser: JavaScript processes and displays notes dynamically
  browser->>user: displays the page