const { nanoid } = require('nanoid');
const notes = require('./notes');
const accounts = require('./account');
const { response } = require('@hapi/hapi/lib/validation');
// const archived = require('./archived');

const addNoteHandler = (request, h) => {
  const { title, tags, body, archived } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString;
  const updateAt = createdAt;
  const newNote = {
    title, tags, body, id, archived, createdAt, updateAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByTitleHandler = (request, h) => {
  const { title } = request.params;

  const note = notes.filter((n) => {
    if (n.title.toLowerCase().includes(title))
      return n
  });

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body, archived } = request.payload;
  const updateAt = new Date().toISOString;
  // mendapatkan index
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      archived,
      updateAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'failed',
    message: 'Gagal memperbaharui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const loginHandler = (request, h) => {
  //login body
  const { username, password } = request.payload;
  const jwtToken = nanoid(20);

  const isSuccess = accounts.filter((account) => {
    return account.username === username && account.password === password;
  }).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'berhasil login',
      data: {
        token: jwtToken
      }
    })
    response.code(201);
    return response;
  } else if(username === "" || password === "") {
    const response = h.response({
      status: 'fail',
      message: 'password atau email tidak boleh kosong'
    })

    response.code(400);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'username or password not match'
  })
  response.code(400);
  return response;
}
const registerHandler = (request, h) => {
  //login body
  const id = nanoid(16);
  const { username, password, email } = request.payload;
  const createdAt = new Date().toISOString;
  const newAccount = {
    id: id,
    username: username,
    password: password,
    email: email,
    createdAt: createdAt
  }

  accounts.push(newAccount);
  const isSuccess = accounts.filter((account) => account.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'register berhasil',
      data: {
        noteId: id,
      },
    })
    response.code(201);
    return response;
  }

  const alreadyUsedUsername = accounts.filter((account, index) => accounts.indexOf(account) !== index)
  //jika ada yang duplikat
  if (alreadyUsedUsername !== null) {
    const response = h.response({
      status: 'fail',
      message: 'username telah digunakan'
    })
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'register gagal',
  });

  response.code(400);
  return response;
}

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByTitleHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
  registerHandler,
  loginHandler
};
