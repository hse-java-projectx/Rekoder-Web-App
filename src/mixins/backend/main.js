import db from '@/mixins/backend/db';

const Backend = {
  getUserAccess(username, password) {
    let accessGranted = false;
    let userFound = false;
    db.users.forEach(
      (user) => {
        if (user.username === username) {
          userFound = true;
          accessGranted = user.password === password;
        }
      },
    );
    if (!userFound) {
      return { success: false, error: 'User not found' };
    }
    return accessGranted ? { success: true, error: '' } : { success: false, error: 'Invalid password' };
  },

  getProblem(userId, problemId) {
    let problemFound = null;
    db.users.forEach(
      (user) => {
        if (user.id === userId) {
          user.problems.forEach((problem) => {
            if (problem.id === problemId) {
              problemFound = problem;
            }
          });
        }
      },
    );
    return problemFound;
  },

  getFolder(folderId) {
    let foundFolder = null;
    db.folders.forEach(
      (folder) => {
        if (folder.id === folderId) {
          foundFolder = folder;
        }
      },
    );
    return foundFolder;
  },

  getFolderContent(userId, folderId) {
    const items = []; // { name, isDirectory, solved, id }
    this.getFolder(folderId).items.forEach((isFolder, id) => {
      let name = 'undefinedName';
      let isSolved = null;
      if (isFolder) {
        name = this.getFolder(folderId).name;
      } else {
        const problem = this.getProblem(userId, folderId);
        name = problem.name;
        isSolved = problem.ok;
      }
      items.push({
        name,
        isDirectory: isFolder,
        solved: isSolved,
        id,
      });
    });
    return items;
  },

  getPathToRoot(folderId) {
    let curFolder = this.getFolder(folderId);
    const path = [];
    while (curFolder != null) {
      path.push({ name: curFolder.name, id: curFolder.id });
      curFolder = this.getFolder(curFolder.parent);
    }
    return path;
  },
};

const BackendMixin = {
  data() {
    return {
      backend: Backend,
    };
  },
};

export default BackendMixin;
