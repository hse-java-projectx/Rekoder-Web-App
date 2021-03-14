import db from '@/js/backend/db';

const Backend = {
  getUserAccess(username, password) {
    let accessGranted = false;
    let userFound = false;
    let userData = null;
    db.users.forEach(
      (user) => {
        if (user.username === username) {
          userFound = true;
          userData = user;
          accessGranted = user.password === password;
        }
      },
    );
    if (!userFound) {
      return { success: false, error: 'User not found' };
    }
    return accessGranted
      ? { success: true, user: userData }
      : { success: false, error: 'Invalid password' };
  },

  getUser(userId) {
    let userFound = null;
    db.users.forEach(
      (user) => {
        if (user.id === userId) {
          userFound = user;
        }
      },
    );
    return userFound;
  },

  getUserByUsername(username) {
    let userFound = null;
    db.users.forEach((user) => {
      if (user.username === username) {
        userFound = user;
      }
    });
    return userFound;
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

  getFolderContent(username, folderId) {
    const user = this.getUserByUsername(username);
    if (!user) {
      return null;
    }
    const userId = user.id;
    const items = []; // { name, isDirectory, solved, id }
    this.getFolder(folderId).items.forEach((dir) => {
      let name = 'undefinedName';
      let isSolved = null;
      if (dir.isFolder) {
        name = this.getFolder(dir.id).name;
      } else {
        const problem = this.getProblem(userId, dir.id);
        name = problem.name;
        isSolved = problem.ok;
      }
      items.push({
        name,
        isDirectory: dir.isFolder,
        solved: isSolved,
        id: dir.id,
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
    return path.reverse();
  },
};

export default Backend;
