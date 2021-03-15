import db from '@/js/backend/db';

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

const Backend = {
  getUserAccessImpl(userid, password) {
    let accessGranted = false;
    let userFound = false;
    let userData = null;
    db.users.forEach(
      (user) => {
        if (user.id === userid) {
          userFound = true;
          userData = user;
          accessGranted = user.password === password;
        }
      },
    );
    if (!userFound) {
      throw new Error('User not found');
    }
    if (!accessGranted) {
      throw new Error('Invalid password');
    }
    return userData;
  },

  async getUserAccess(userid, password) {
    await sleep();
    return this.getUserAccessImpl(userid, password);
  },

  getUserImpl(userId) {
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

  async getUser(userId) {
    await sleep();
    return this.getUserImpl(userId);
  },

  getProblemImpl(userId, problemId) {
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

  async getProblem(userId, problemId) {
    await sleep();
    return this.getProblemImpl(userId, problemId);
  },

  getFolderImpl(folderId) {
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

  async getFolder(folderId) {
    await sleep();
    return this.getFolderImpl(folderId);
  },

  getFolderContentImpl(userId, folderId) {
    const items = []; // { name, isDirectory, solved, id }
    this.getFolderImpl(folderId).items.forEach((dir) => {
      let name = 'undefinedName';
      let isSolved = null;
      if (dir.isFolder) {
        name = this.getFolderImpl(dir.id).name;
      } else {
        const problem = this.getProblemImpl(userId, dir.id);
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

  async getFolderContent(userId, folderId) {
    await sleep();
    return this.getFolderContentImpl(userId, folderId);
  },

  getPathToRootImpl(folderId) {
    let curFolder = this.getFolderImpl(folderId);
    const path = [];
    while (curFolder != null) {
      path.push({ name: curFolder.name, id: curFolder.id });
      curFolder = this.getFolderImpl(curFolder.parent);
    }
    return path.reverse();
  },

  async getPathToRoot(folderId) {
    await sleep();
    return this.getPathToRootImpl(folderId);
  },
};

export default Backend;
