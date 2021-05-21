import axios from 'axios';

const Backend = {
  url: {
    domain: 'https://rekoderback.cfapps.eu10.hana.ondemand.com',
    user(userId) {
      return `${this.domain}/users/${userId}`;
    },
    userProblem(userId) {
      return `${this.domain}/users/${userId}/problems`;
    },
    team(teamId) {
      return `${this.domain}/teams/${teamId}`;
    },
    judge(judgeId) {
      return `${this.domain}/judges/${judgeId}`;
    },
    newUser() {
      return `${this.domain}/users`;
    },
    newTeam() {
      return `${this.domain}/teams`;
    },
    newJudge() {
      return `${this.domain}/judges`;
    },
    problem(problemId) {
      return `${this.domain}/problems/${problemId}`;
    },
    problemSubmissions(problemId) {
      return `${this.domain}/problems/${problemId}/submissions`;
    },
    folder(folderId) {
      return `${this.domain}/folders/${folderId}`;
    },
    folderFolders(folderId) {
      return `${this.domain}/folders/${folderId}/folders`;
    },
    folderProblms(folderId) {
      return `${this.domain}/folders/${folderId}/problems`;
    },
    submission(submissionId) {
      return `${this.domain}/submissions/${submissionId}`;
    },
  },

  async getJSON(url, type, data) {
    console.log(`URL: ${url}, TYPE: ${type}, DATA: ${JSON.stringify(data)}`);
    let request = null;
    if (type === 'GET') {
      request = await axios.get(url);
    } else if (type === 'POST') {
      request = await axios.post(url, data);
    } else if (type === 'PATCH') {
      request = await axios.patch(url, data, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      });
    } else if (type === 'DELETE') {
      request = await axios.delete(url);
    } else {
      throw Error(`'${url}' Invalid request type: ${type}`);
    }
    if (request.status !== 200 && request.status !== 204) {
      throw Error(`Request: ${type} ${url} Status: ${request.status}`);
    }
    return request.data;
  },

  async queryProfile(userType, userId, request, data) {
    let user;
    if (userType === 'user') {
      user = await this.getJSON(this.url.user(userId), request, data);
    } else if (userType === 'team') {
      user = await this.getJSON(this.url.team(userId), request, data);
    } else if (userType === 'judge') {
      user = await this.getJSON(this.url.judge(userId), request, data);
    } else {
      throw Error(`Undefined profile type: ${userType}`);
    }
    return user;
  },

  async getUserAccess(userType, userId) {
    return this.getUser(userType, userId);
  },

  async getUser(userType, userId) {
    if (userType === 'user') {
      const user = await this.getJSON(this.url.user(userId), 'GET');
      const contacts = [];
      Object.keys(user.contacts).forEach((c) => {
        contacts.push({ name: c, ref: user.contacts[c] });
      });
      return {
        ...user,
        following: [],
        followers: [],
        teams: user.teamIds,
        contacts,
        avatarPath: 'https://i.pinimg.com/originals/60/99/f3/6099f305983371dadaceae99f5c905bf.png',
      };
    } if (userType === 'team') {
      const team = await this.getJSON(this.url.team(userId), 'GET');
      return {
        ...team,
        avatarPath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/FBK_logo_new.svg/1200px-FBK_logo_new.svg.png',
        members: team.membersId,
      };
    } if (userType === 'judge') {
      return this.getJSON(this.url.judge(userId), 'GET');
    }
    throw Error(`Unknown user type: ${userType}`);
  },

  async getSubmission(submissionId) {
    return this.getJSON(this.url.submission(submissionId), 'GET');
  },

  async getProblem(problemId) {
    return this.getJSON(this.url.problem(problemId), 'GET');
  },

  async getFolder(folderId) {
    return this.getJSON(this.url.folder(folderId), 'GET');
  },

  async getFolderSubfolders(folderId) {
    return this.getJSON(this.url.folderFolders(folderId), 'GET');
  },

  async getFolderProblems(folderId) {
    return this.getJSON(this.url.folderProblms(folderId), 'GET');
  },

  async getPathToRoot(/* folderId */) {
    return [{ link: '/', name: 'Path' }, { link: '/', name: 'To' }, { link: '/', name: 'Folder' }];
  },

  async getUserTeams(/* userId */) {
    return [];
  },

  async getUserFollowers(/* userId */) {
    return [];
  },

  async getUserFollowing(/* userId */) {
    return [];
  },

  async getUserActivity(/* userId */) {
    return [];
  },

  // async getUserFeed(userId) {
  //   await sleep();
  //   return this.getUserFeedImpl(userId);
  // },

  async createFolder(parentFolderId, folderName) {
    return this.getJSON(this.url.folderFolders(parentFolderId), 'POST', { name: folderName });
  },

  async createProblem(parentFolderId, problemName, ownerId) {
    const problem = await this.getJSON(this.url.userProblem(ownerId), 'POST', { name: problemName, statement: 'Print sum of two numbers' });
    await this.getJSON(this.url.folderProblms(parentFolderId), 'PATCH', { problemId: problem.id });
    return problem;
  },

  async editProblem(problemId, problem) {
    return this.getJSON(this.url.problem(problemId), 'PATCH', problem);
  },

  // async addProblem(userId, parentFolderId, newProblem) {
  //   return this.addProblemImpl(userId, parentFolderId, newProblem);
  // },

  // async addEmptyProblem(userId, parentFolderId, name) {
  // },

  // async getContentGeneratorType(profileId) {
  //   await sleep();
  //   return this.getContentGeneratorTypeImpl(profileId);
  // },

  async canEdit(/* editorId, ownerId */) {
    return true;// editorId === ownerId;
  },

  async deleteProblem(problemId) {
    return this.getJSON(this.url.problem(problemId), 'DELETE');
  },

  async createProfile(profile) {
    if (profile.type === 'user') {
      return this.getJSON(this.url.newUser(), 'POST', profile);
    } if (profile.type === 'team') {
      return this.getJSON(this.url.newTeam(), 'POST', profile);
    } if (profile.type === 'judge') {
      return this.getJSON(this.url.newJudge(), 'POST', profile);
    }
    throw Error(`Unknown profile type: ${profile.type}`);
  },

  async editProfile(profileType, profileId, profile) {
    return this.queryProfile(profileType, profileId, 'PATCH', profile);
  },

  async getProblemSubmissions(problemId) {
    return this.getJSON(this.url.problemSubmissions(problemId), 'GET');
  },

  async editSubmission(submissionId, submission) {
    return this.getJSON(this.url.submission(submissionId), 'PATCH', submission);
  },

  async searchContent(
    // query, // String
    // contentType, // ['user', 'problem', 'submission', 'team', 'judge', 'folder']
    // locations // [{ entity: 'user', id: 'Glebanister' }, { entity: 'judge', id: 'Glebanister' }]
  ) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      {
        entity: 'submission',
        id: '5',
      },
      {
        entity: 'user',
        id: 'Glebanister',
        avatarPath: 'https://i.pinimg.com/originals/60/99/f3/6099f305983371dadaceae99f5c905bf.png',
        name: 'Gleb Marin',
      },
      {
        entity: 'user',
        id: 'Glebanister 12',
        avatarPath: 'https://i.pinimg.com/originals/60/99/f3/6099f305983371dadaceae99f5c905bf.png',
        name: 'Gleb Marin 2',
      },
      {
        entity: 'problem',
        id: '4',
        name: 'A + B Problem',
      },
      {
        entity: 'folder',
        id: '5',
        name: 'My Collection',
      },
      {
        entity: 'folder',
        id: '1',
        name: 'My Collection',
      },
      {
        entity: 'team',
        id: 'Ample',
        avatarPath: 'https://i.pinimg.com/originals/60/99/f3/6099f305983371dadaceae99f5c905bf.png',
        name: 'Ample',
      },
      {
        entity: 'team',
        id: 'Project X',
        avatarPath: 'https://i.pinimg.com/originals/60/99/f3/6099f305983371dadaceae99f5c905bf.png',
        name: 'Project X',
      },
    ];
  },

  // async searchContent(query, contentTypes) {
  //   await sleep();
  //   return this.searchContentImpl(query, contentTypes);
  // },

  // async getTeamMembers(teamId) {
  //   await sleep();
  //   return this.getTeamMembersImpl(teamId);
  // },
};

export default Backend;
