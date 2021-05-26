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
    teamProblem(userId) {
      return `${this.domain}/teams/${userId}/problems`;
    },
    team(teamId) {
      return `${this.domain}/teams/${teamId}`;
    },
    teamMembers(teamId) {
      return `${this.domain}/teams/${teamId}/users`;
    },
    addTeamMember(teamId) {
      return `${this.domain}/teams/${teamId}/users`;
    },
    removeTeamMember(teamId, userId) {
      return `${this.domain}/teams/${teamId}/users/${userId}`;
    },
    userTeams(userId) {
      return `${this.domain}/users/${userId}/teams`;
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
    login() {
      return `${this.domain}/login`;
    },
  },

  withToken(token) {
    return { authorization: token };
  },

  async getHttpResponse(url, type, data, headers) {
    console.log(`URL: ${url}, TYPE: ${type}, HEADERS: ${JSON.stringify(headers)} DATA: ${JSON.stringify(data)}`);
    let request = null;
    if (type === 'GET') {
      request = await axios.get(url, { headers });
    } else if (type === 'POST') {
      request = await axios.post(url, data, { headers });
    } else if (type === 'PATCH') {
      request = await axios.patch(url, data, {
        headers: {
          ...headers,
          'Content-Type': 'application/merge-patch+json',
        },
      });
    } else if (type === 'DELETE') {
      request = await axios.delete(url, { headers });
    } else {
      throw Error(`'${url}' Invalid request type: ${type}`);
    }
    if (request.status !== 200 && request.status !== 204) {
      throw Error(`Request: ${type} ${url} Status: ${request.status}`);
    }
    console.log(`Recieved: ${JSON.stringify(request)}`);
    return request;
  },

  async getJSON(url, type, data, headers) {
    return (await this.getHttpResponse(url, type, data, headers)).data;
  },

  async getLoginToken(user) {
    const { headers } = await this.getHttpResponse(
      this.url.login(),
      'POST',
      {
        id: user.id,
        password: user.password,
      },
    );
    return headers.authorization;
  },

  async getUser(user) {
    if (user.type === 'user') {
      const userData = await this.getJSON(this.url.user(user.id), 'GET');
      const contacts = [];
      Object.keys(userData.contacts).forEach((c) => {
        contacts.push({ name: c, ref: userData.contacts[c] });
      });
      return {
        ...userData,
        following: [],
        followers: [],
        type: 'user',
        contacts,
      };
    } if (user.type === 'team') {
      const team = await this.getJSON(this.url.team(user.id), 'GET');
      return {
        ...team,
        type: 'team',
      };
    }
    throw Error(`Unknown user type: ${user.type}`);
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

  async getUserFollowers(/* userId */) {
    return [];
  },

  async getUserFollowing(/* userId */) {
    return [];
  },

  async getUserActivity(/* userId */) {
    return [];
  },

  async getUserTeams(userId) {
    return this.getJSON(this.url.userTeams(userId), 'GET');
  },

  // async getUserFeed(userId) {
  //   await sleep();
  //   return this.getUserFeedImpl(userId);
  // },

  async createFolder(parentFolderId, folderName, ownerId, accessToken) {
    return this.getJSON(
      this.url.folderFolders(parentFolderId),
      'POST',
      { name: folderName },
      this.withToken(accessToken),
    );
  },

  async createProblem(parentFolderId, problemName, ownerId, accessToken) {
    const problem = await this.getJSON(
      this.url.userProblem(ownerId),
      'POST',
      { name: problemName, statement: 'Print sum of two numbers' },
      this.withToken(accessToken),
    );
    await this.getJSON(
      this.url.folderProblms(parentFolderId),
      'PATCH',
      { problemId: problem.id },
      this.withToken(accessToken),
    );
    return problem;
  },

  async editProblem(problem, accessToken) {
    return this.getJSON(
      this.url.problem(problem.id),
      'PATCH',
      problem,
      this.withToken(accessToken),
    );
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

  async getProblems(user) {
    if (user.type === 'user') {
      return this.getJSON(this.url.userProblem(user.id), 'GET');
    } if (user.type === 'team') {
      return this.getJSON(this.url.teamProblem(user.id), 'GET');
    }
    throw Error(`Unknown user type: ${user.type}`);
  },

  async canEdit(editorId, owner) {
    if (editorId === null) {
      return false;
    }
    if (!owner) {
      throw Error('No owner in request canEdit');
    }
    if (!editorId) {
      throw Error('No editor in request canEdit');
    }
    if (!(owner.id && owner.type)) {
      throw Error(`Owner must contain id and type in request canEdit: ${owner}`);
    }
    if (owner.type === 'user') {
      return owner.id === editorId;
    }
    const team = await this.getUser(owner);
    return team.memberIds.indexOf(editorId) !== -1;
  },

  async getAlreadySolvableProblem(solverId, problemId) {
    const solverProblems = await this.getProblems({ id: solverId, type: 'user' });
    let solvableProblem = null;
    solverProblems.forEach((solverProblem) => {
      if (solverProblem.originalProblemId !== null
        && solverProblem.originalProblemId === problemId) {
        solvableProblem = solverProblem;
      }
    });
    return solvableProblem;
  },

  async deleteProblem(problemId, accessToken) {
    return this.getJSON(
      this.url.problem(problemId),
      'DELETE',
      {},
      this.withToken(accessToken),
    );
  },

  async deleteFolder(problemId, accessToken) {
    return this.getJSON(
      this.url.folder(problemId),
      'DELETE',
      {},
      this.withToken(accessToken),
    );
  },

  async createProfile(profile) {
    return this.getJSON(this.url.newUser(), 'POST', profile);
  },

  async createTeam(id, accessToken) {
    return this.getJSON(
      this.url.newTeam(),
      'POST',
      { id },
      this.withToken(accessToken),
    );
  },

  async editProfile(profileInfo, editedProfile, accessToken) {
    let response;
    if (profileInfo.type === 'user') {
      response = await this.getJSON(
        this.url.user(profileInfo.id),
        'PATCH',
        editedProfile,
        this.withToken(accessToken),
      );
    } else if (profileInfo.type === 'team') {
      response = await this.getJSON(
        this.url.team(profileInfo.id),
        'PATCH',
        editedProfile,
        this.withToken(accessToken),
      );
    } else {
      throw Error(`Undefined profile type: ${profileInfo.type}`);
    }
    return response;
  },

  async getProblemSubmissions(problemId) {
    return this.getJSON(this.url.problemSubmissions(problemId), 'GET');
  },

  async editSubmission(submission, accessToken) {
    return this.getJSON(
      this.url.submission(submission.id),
      'PATCH',
      submission,
      this.withToken(accessToken),
    );
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
        avatarPath: 'https://www.pngitem.com/pimgs/m/390-3900455_transparent-team-icon-png-blue-team-icon-png.png',
        name: 'Ample',
      },
      {
        entity: 'team',
        id: 'Project X',
        avatarPath: 'https://www.pngitem.com/pimgs/m/390-3900455_transparent-team-icon-png-blue-team-icon-png.png',
        name: 'Project X',
      },
    ];
  },

  // async cloneProblem(problemId, targetUserInfo) {
  //   const problem = await this.getProblem(problemId);
  //   console.log('Got problem', problem);
  //   problem.authorId = targetUserInfo.id;
  //   const targetUser = await this.getUser(targetUserInfo.type, targetUserInfo.id);
  //   console.log('Got target user', targetUser);
  // const targetUserRootFolderSubfolders = await this.getFolderSubfolders(targetUser.rootFolderId);
  //   console.log('Got target user root subfolders', targetUserRootFolderSubfolders);
  //   let targetFolderId = null;
  //   targetUserRootFolderSubfolders.forEach((rootSubfolder) => {
  //     if (rootSubfolder.name === problem.ownerId) {
  //       targetFolderId = rootSubfolder.id;
  //     }
  //   });
  //   if (targetFolderId === null) {
  //     targetFolderId = await this.createFolder(targetUser.rootFolderId, problem.ownerId).id;
  //   }
  //   const targetFolderProblems = await this.getFolderProblems(targetFolderId);
  //   targetFolderProblems.forEach((problem) => {

  //   });
  //   return this.getJSON(this.url.folderProblms(targetFolderId), { problemId:  })
  // },

  // async searchContent(query, contentTypes) {
  //   await sleep();
  //   return this.searchContentImpl(query, contentTypes);
  // },

  async getTeamMembers(teamId) {
    return this.getJSON(this.url.teamMembers(teamId), 'GET');
  },

  async addTeamMember(teamId, userId, accessToken) {
    return this.getJSON(
      this.url.addTeamMember(teamId),
      'POST',
      { memberId: userId },
      this.withToken(accessToken),
    );
  },

  async removeTeamMember(teamId, userId, accessToken) {
    return this.getJSON(
      this.url.removeTeamMember(teamId, userId),
      'DELETE',
      {},
      this.withToken(accessToken),
    );
  },
};

export default Backend;
