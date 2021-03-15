const users = [
  {
    id: 'Glebanister',
    registrationDate: new Date(),
    name: 'Gleb Marin',
    password: 'G1l2e3b4',
    avatarPath: '@/assets/avatars/1.jpg',
    bio: 'My mind is going a mile an hour.',
    contacts: [
      { telegram: 'glebmarin', email: 'glebmar2001@gmail.com', twitter: 'glebanister' },
    ],
    following: ['userid2', 'userid3', 'teamid1'],
    followers: ['userid2', 'userid3'],
    teams: ['teamid1', 'teamid2'],
    root: 'folderid1',
    problems: [
      {
        id: 'problemid1',
        name: 'A + B problem',
        statement: 'print sum of two given numbers.',
        submissions: [
          {
            id: 'submissionid1',
            language: 'Python',
            source: 'print(1 + sum(input().split()))',
            ok: false,
            comment: 'Wrond Answer',
            date: new Date(),
          },
          {
            id: 'submissionid2',
            language: 'Python',
            source: 'print(sum(input().split()))',
            ok: true,
            comment: 'Accepted',
            date: new Date(),
          },
        ],
      },
      {
        id: 'problemid2',
        name: 'A - B problem',
        statement: 'print difference of two given numbers.',
        submissions: [
          {
            id: 'submissionid3',
            language: 'C++',
            source: 'std::cout << a + b << std::endl;',
            ok: false,
            comment: 'Wrond Answer',
            date: new Date(),
          },
          {
            id: 'submissionid4',
            language: 'C++',
            source: 'std::cout << a - b << std::endl;',
            ok: true,
            comment: 'Accepted',
            date: new Date(),
          },
        ],
      },
      {
        id: 'problemid3',
        name: 'Random',
        statement: 'print random number.',
        submissions: [
          {
            id: 'submissionid5',
            language: 'Python',
            source: 'print(rand()',
            ok: false,
            comment: 'Wrond Answer',
            date: new Date(),
          },
          {
            id: 'submissionid6',
            language: 'Python',
            source: 'print(rand())',
            ok: true,
            comment: 'Accepted',
            date: new Date(),
          },
          {
            id: 'submissionid7',
            language: 'Python',
            source: 'print(rand())',
            ok: false,
            comment: 'Wrond Answer',
            date: new Date(),
          },
        ],
      },
      {
        id: 'problemid4',
        name: 'A * B problem',
        statement: 'print product of two given numbers.',
        submissions: [
          {
            id: 'submissionid8',
            language: 'C++',
            source: 'std::cout << a * b << std::endl;',
            ok: false,
            comment: 'Wrond Answer',
            date: new Date(),
          },
        ],
      },
    ],
  },
  {
    id: 'userid2',
    registrationDate: new Date(),
    name: 'Danil Bubnov',
    password: 'password',
    avatarPath: '@/assets/avatars/2.jpg',
    bio: 'Intellij IDEA Pugin Developer',
    contacts: [
      { telegram: 'danilbk123' },
    ],
    following: ['userid2', 'userid3', 'teamid1'],
    followers: ['userid2', 'userid3'],
    teams: ['teamid1', 'teamid2'],
    root: 'folderid2',
  },
  {
    id: 'userid3',
    registrationDate: new Date(),
    name: 'Ilya Onofriychuk',
    password: 'password',
    avatarPath: '@/assets/avatars/3.jpg',
    bio: 'Backend Developer',
    contacts: [
      { telegram: 'ilyaonoff', email: 'ilyaonoff@gmail.com' },
    ],
    following: ['userid2', 'userid3', 'teamid1'],
    followers: ['userid2', 'userid3'],
    teams: ['teamid1', 'teamid2'],
    root: 'folderid3',
  },
  {
    id: 'userid4',
    registrationDate: new Date(),
    name: 'Alexey Luchinin',
    password: 'password',
    avatarPath: '@/assets/avatars/4.jpg',
    bio: 'Developer of Something',
    contacts: [
      { telegram: 'alex99999', email: 'alex99999@yandex.ru' },
    ],
    following: ['userid2', 'userid3', 'teamid1'],
    followers: ['userid2', 'userid3'],
    teams: ['teamid1', 'teamid2'],
    root: 'folderid4',
  },
];

const teams = [
  {
    id: 'teamid1',
    registrationDate: new Date(),
    bio: 'ProjecX',
    permissions: {
      Glebanister: ['admin'],
      userid2: ['admin'],
      userid3: ['admin'],
    },
  },
  {
    id: 'teamid2',
    registrationDate: new Date(),
    bio: 'Ample',
    permissions: {
      Glebanister: ['admin'],
      userid2: ['admin'],
      userid4: ['non-admin'],
    },
  },
];

const folders = [
  {
    id: 'folderid1',
    parent: null,
    visibility: 'public',
    name: 'Glebanister',
    items: [
      { isFolder: true, id: 'folderid2' },
      { isFolder: true, id: 'folderid3' },
    ],
  },
  {
    id: 'folderid2',
    parent: 'folderid1',
    visibility: 'private',
    sharedWith: ['Glebanister', 'userid2'],
    name: 'codeforces',
    items: [
      { isFolder: false, id: 'problemid1' },
      { isFolder: false, id: 'problemid2' },
      { isFolder: false, id: 'problemid3' },
    ],
  },
  {
    id: 'folderid3',
    parent: 'folderid1',
    visibility: 'public',
    name: 'my collections',
    items: [
      { isFolder: false, id: 'problemid3' },
      { isFolder: false, id: 'problemid4' },
    ],
  },
];

const db = {
  users,
  teams,
  folders,
};

export default db;
