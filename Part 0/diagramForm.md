sequenceDiagram
  participant browser
  participant user
  participant server

  user->>browser: click input 
  user->>browser: write in the input field
  user->>browser: click the save button
  browser->>server: POST /new_note with text written by the user
  activate server
  Note right of server: Server gets and processes the text

  server->>browser: 302 redirects to /notes
  deactivate server
  browser->>server: GET /notes
  activate server
  server->>browser: responds with the updated list including the new note
  deactivate server
  browser->>user: displays the updated list on the page