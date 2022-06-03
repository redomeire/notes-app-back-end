
# Description

This repo contains Notes API that provide us basic feature of the API.
In order to pass the 'Making beginner backend app' class, i made this project. 
<br>
<br>
Enjoy!!


## API Documentation

#### Get all notes

```bash
  GET /notes
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| none | `none` | **Required**. Getting All Notes | 

#### Get note by title

```bash
  GET /notes/{title}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Get data with matching title |

#### Adding new note

```bash
  POST /notes
```

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| *title, tags, body, archived*    | `string, boolean` | **Required**. Add new note |


#### Editing note

```bash
  PUT /notes/{id}
```
| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| *title, tags, body, archived*    | `string, boolean` | **Required**. Editing note based on the id |


#### Delete note

```bash
  DELETE /notes/{id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| *id*   | `string` |  **Required**. Deleting note based on the id |

When adding or edit note, your request body must contains data like this :

```
  {
    title : (string),
    tags : (string),
    body: (string),
    archived: (boolean)
  }
```


## Installation

For now, i'm not hosting it yet. So, to run it, you have to install it in your localhost

[clone blablablah]

#### npm

```bash
  npm install
```

#### Run project
```bash
  node ./src/server.js
```
If success, the the text displayed in the terminal should be

```bash
  Server telah berjalan pada port http://localhost:5000
```

    