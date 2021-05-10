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
    db.teams.forEach(
      (user) => {
        if (user.id === userId) {
          userFound = user;
        }
      },
    );
    db.systems.forEach(
      (user) => {
        if (user.id === userId) {
          userFound = user;
        }
      },
    );
    if (userFound == null) {
      throw new Error(`Profile not found: ${userId}`);
    }
    return userFound;
  },

  async getUser(userId) {
    await sleep();
    return this.getUserImpl(userId);
  },

  getSubmissionImpl(userId, problemId, submissionId) {
    let foundSubmission = null;
    const problem = this.getProblemImpl(userId, problemId);
    problem.submissions.forEach((submission) => {
      if (submission.id === submissionId) {
        foundSubmission = submission;
      }
    });
    if (foundSubmission == null) {
      throw new Error('Submission not found');
    }
    foundSubmission.problem = problem.name;
    return foundSubmission;
  },

  async getSubmission(userId, problemId, submissionId) {
    await sleep();
    return this.getSubmissionImpl(userId, problemId, submissionId);
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
    if (problemFound == null) {
      throw new Error('Problem not found');
    }
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
    if (foundFolder == null) {
      throw new Error(`Folder not found${folderId}`);
    }
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
      if (dir.isFolder) {
        name = this.getFolderImpl(dir.id).name;
      } else {
        const problem = this.getProblemImpl(userId, dir.id);
        name = problem.name;
      }
      items.push({
        name,
        isDirectory: dir.isFolder,
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
    while (curFolder.parent != null) {
      path.push({ name: curFolder.name, id: curFolder.id });
      curFolder = this.getFolderImpl(curFolder.parent);
    }
    path.push({ name: curFolder.name, id: curFolder.id });
    return path.reverse();
  },

  async getPathToRoot(folderId) {
    await sleep();
    return this.getPathToRootImpl(folderId);
  },

  getUserTeamsImpl(userId) {
    const user = this.getUserImpl(userId);
    const teams = [];
    db.teams.forEach((team) => {
      if (user.teams.indexOf(team.id) !== -1) {
        teams.push(team);
      }
    });
    return teams;
  },

  async getUserTeams(userId) {
    await sleep();
    return this.getUserTeamsImpl(userId);
  },

  getUserFollowersImpl(userId) {
    const user = this.getUserImpl(userId);
    const followers = [];
    db.users.forEach((follower) => {
      if (user.followers.indexOf(follower.id) !== -1) {
        followers.push(follower);
      }
    });
    return followers;
  },

  async getUserFollowers(userId) {
    await sleep();
    return this.getUserFollowersImpl(userId);
  },

  getUserFollowingImpl(userId) {
    const user = this.getUserImpl(userId);
    const followings = [];
    db.users.forEach((following) => {
      if (user.following.indexOf(following.id) !== -1) {
        followings.push(following);
      }
    });
    return followings;
  },

  async getUserFollowing(userId) {
    await sleep();
    return this.getUserFollowingImpl(userId);
  },

  getUserActivityImpl(userId) {
    const activity = [];
    this.getUserImpl(userId).activity.forEach((act) => {
      activity.push({
        type: act.type,
        object: act.object,
        subject: act.subject,
        date: act.date,
        count: act.count,
      });
    });
    return activity;
  },

  async getUserActivity(userId) {
    sleep();
    return this.getUserActivityImpl(userId);
  },

  getUserFeedImpl(userId) {
    const user = this.getUserImpl(userId);
    let feed = [];
    user.following.forEach((followee) => {
      feed = feed.concat(this.getUserActivityImpl(followee));
    });
    return feed;
  },

  async getUserFeed(userId) {
    sleep();
    return this.getUserFeedImpl(userId);
  },

  makeid(length) {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result.push(characters.charAt(Math.floor(Math.random()
        * charactersLength)));
    }
    return result.join('');
  },

  createFolderImpl(parentFolderId, newFolderName) {
    const parentFolder = this.getFolderImpl(parentFolderId);
    const newFolderId = `folderid${this.makeid(5)}`;
    db.folders.forEach((folder) => {
      if (folder.id === parentFolderId) {
        folder.items.push({
          isFolder: true,
          id: newFolderId,
        });
      }
    });
    db.folders.push({
      owner: parentFolder.owner,
      id: newFolderId,
      parent: parentFolderId,
      name: newFolderName,
      items: [],
    });
  },

  async createFolder(parentFolderId, folderName) {
    sleep();
    return this.createFolderImpl(parentFolderId, folderName);
  },

  editProblemImpl(userId, problemId, changedProblem) {
    const user = this.getUserImpl(userId);
    const problemToInsert = changedProblem;
    problemToInsert.id = problemId;
    let changed = false;
    user.problems.forEach((problem) => {
      if (problem.id === problemToInsert.id) {
        // eslint-disable-next-line no-param-reassign
        problem.name = problemToInsert.name;
        // eslint-disable-next-line no-param-reassign
        problem.statement = problemToInsert.statement;
        changed = true;
      }
    });
    if (!changed) {
      throw new Error(`Unable to find problem of user ${userId} with id ${problemId}`);
    }
  },

  async editProblem(userId, problemId, problem) {
    sleep();
    return this.editProblemImpl(userId, problemId, problem);
  },

  addProblemImpl(userId, parentFolderId, newProblem) {
    // eslint-disable-next-line no-param-reassign
    newProblem.id = `problemid${this.makeid(6)}`;
    const user = this.getUserImpl(userId);
    user.problems.push(newProblem);
    db.folders.forEach((folder) => {
      if (folder.id === parentFolderId) {
        folder.items.push({ isFolder: false, id: newProblem.id });
      }
    });
    return newProblem.id;
  },

  async addProblem(userId, parentFolderId, newProblem) {
    sleep();
    return this.addProblemImpl(userId, parentFolderId, newProblem);
  },

  async addEmptyProblem(userId, parentFolderId, name) {
    return this.addProblem(userId, parentFolderId, { name, statement: 'Print sum of two numbers.' });
  },

  getContentGeneratorTypeImpl(profileId) {
    let type = null;
    db.users.forEach((user) => {
      if (user.id === profileId) {
        type = 'user';
      }
    });
    db.teams.forEach((team) => {
      if (team.id === profileId) {
        type = 'team';
      }
    });
    db.systems.forEach((system) => {
      if (system.id === profileId) {
        type = 'system';
      }
    });
    return type;
  },

  async getContentGeneratorType(profileId) {
    sleep();
    return this.getContentGeneratorTypeImpl(profileId);
  },

  canEditImpl(editorId, ownerId) {
    if (editorId === null || editorId === undefined) {
      return false;
    }

    const editorType = this.getContentGeneratorTypeImpl(editorId);
    const ownerType = this.getContentGeneratorTypeImpl(ownerId);

    if (editorType === 'user' && ownerType === 'team') {
      return this.getUserImpl(ownerId).members.indexOf(editorType) !== -1;
    }

    return editorId === ownerId;
  },

  async canEdit(editorId, ownerId) {
    sleep();
    return this.canEditImpl(editorId, ownerId);
  },

  deleteProblemImpl(ownerId, problemId) {
    db.folders.forEach((folder) => {
      let itemIndex = -1;
      let curIndex = 0;
      folder.items.forEach((item) => {
        if (item.id === problemId) {
          itemIndex = curIndex;
        }
        curIndex += 1;
      });
      if (itemIndex !== -1) {
        folder.items.splice(itemIndex, 1);
      }
    });
    return true;
  },

  async deleteProblem(ownerId, problemId) {
    sleep();
    this.deleteProblemImpl(ownerId, problemId);
  },

  createProfileImpl(profile) {
    const newId = this.makeid(6);
    const folderId = this.makeid(6);
    if (profile.type === 'user') {
      db.users.push({
        id: newId,
        registrationDate: new Date(),
        name: profile.name,
        password: profile.password,
        avatarPath: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        bio: null,
        contacts: {},
        following: [],
        followers: [],
        teams: [],
        root: folderId,
        activity: [],
        problems: [],
      });
    } else if (profile.type === 'team') {
      db.teams.push(
        {
          id: newId,
          registrationDate: new Date(),
          name: profile.name,
          password: profile.password,
          avatarPath: 'https://cdn.raceroster.com/assets/images/team-placeholder.png',
          members: [],
          bio: null,
          followers: [],
          root: folderId,
          activity: [],
          problems: [],
        },
      );
    } else if (profile.type === 'system') {
      db.systems.push({
        id: newId,
        registrationDate: new Date(),
        name: profile.name,
        avatarPath: 'https://i.kym-cdn.com/photos/images/newsfeed/001/996/641/bc2.jpg',
        origin: null,
        root: folderId,
        activity: [],
        problems: [],
      });
    }
    db.folders.push({
      id: folderId,
      parent: null,
      name: profile.name,
      owner: newId,
      items: [],
    });
    return { id: newId, root: folderId };
  },

  async createProfile(profile) {
    sleep();
    return this.createProfileImpl(profile);
  },
};

export default Backend;
