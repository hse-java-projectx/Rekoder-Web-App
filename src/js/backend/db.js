const users = [
  {
    id: 'userid1',
    type: 'user',
    registrationDate: new Date(),
    name: 'Gleb Marin',
    password: 'G1l2e3b4',
    avatarPath: 'https://sun9-14.userapi.com/impg/QLCF2inSBFKbTyR2a20T_A4xxqHTCrvT01rqFQ/T44GXmY4ED8.jpg?size=1602x2160&quality=96&sign=5815abbab30801c1eafdbe672e7ada5a&type=album',
    bio: 'My mind is going a mile an hour.',
    contacts:
      [{ name: 'telegram', ref: 'glebmarin' }, { name: 'email', ref: 'glebmar2001@gmail.com' }, { name: 'twitter', ref: 'Glebanister' }],
    following: ['userid2', 'userid3', 'userid4'],
    followers: ['userid4'],
    teams: ['teamid1', 'teamid2'],
    root: 'folderid1',
    problems: [
      {
        id: 'problemid1',
        tests: [],
        inputFormat: '',
        outputFormat: '',
        name: 'Сортировка матрицы',
        statement: `
        Даны две таблицы A и B размера n×m.

Назовём сортировкой по столбцу следующее действие: выбирается столбец, и все строки упорядочиваются по значению в этом столбце, от строк, содержащих меньшие значения, к строкам с большими. В случае, если две строки имеют одинаковое значение в этом столбце, их порядок не меняется (такие сортировки называются стабильными).

Подобное поведение сортировки по столбцу можно найти практически в любом офисном приложении для работы с таблицами. Петя работает в одном из таких приложений, и у него открыта таблица A. Он хочет проделать ноль или более операций сортировки по столбцу, чтобы получить таблицу B.

Определите, может ли он это сделать, и если может, предложите ему алгоритм действий — последовательность столбцов, по которым нужно применить сортировку по столбцу. Обратите внимание, что не требуется минимизировать число действий.`,
        submissions: [
          {
            id: 'submissionid1',
            language: 'C++',
            source: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 5e6 + 5;
const int N = 2e5 + 5;
const double edg = 1e-12;
int x[maxn] = {0}, y[maxn] = {0}, a[N];
//map<int , bool> mp;
//map<int , pair<int, int> > ans;
  
  
int main(){
    ios::sync_with_stdio(0);
    cin.tie(); cout.tie(0);
  
    #ifndef ONLINE_JUDGE
    freopen("in.txt", "r", stdin);
    #endif // ONLINE_JUDGE
  
    int n; cin >> n;
    //mp.clear();
    //ans.clear();
    for(int i = 1 ; i <= n; i ++) cin >> a[i];
    for(int i = 1; i <= n; i ++){
        for(int j = i + 1; j <= n; j ++){
            int tmp = a[i] + a[j];
            if(x[tmp] && y[tmp] && x[tmp] != i && x[tmp] != j && y[tmp] != i && y[tmp] != j){
                cout << "YES" << i << " " << j << " " << x[tmp] << " " << y[tmp] << "";
                return 0;
            }
            x[tmp] = i, y[tmp] = j;
        }
    }
    cout << "NO\n";
    return 0;
}`,
            comment: 'Wrond Answer',
            date: new Date(),
          },
          {
            id: 'submissionid2',
            language: 'Python',
            source: 'print(sum(input().split()))',
            comment: 'Accepted',
            date: new Date(),
          },
        ],
      },
      {
        id: 'problemid2',
        tests: [],
        inputFormat: '',
        outputFormat: '',
        name: 'A - B problem',
        statement: 'print difference of two given numbers.',
        submissions: [
          {
            id: 'submissionid3',
            language: 'C++',
            source: 'std::cout << a + b << std::endl;',
            comment: 'Wrond Answer',
            date: new Date(),
          },
          {
            id: 'submissionid4',
            language: 'C++',
            source: 'std::cout << a - b << std::endl;',
            comment: 'Accepted',
            date: new Date(),
          },
        ],
      },
      {
        id: 'problemid3',
        tests: [],
        inputFormat: '',
        outputFormat: '',
        name: 'Random',
        statement: 'print random number.',
        submissions: [
          {
            id: 'submissionid5',
            language: 'Python',
            source: 'print(rand()',
            comment: 'Wrond Answer',
            date: new Date(),
          },
          {
            id: 'submissionid6',
            language: 'Python',
            source: 'print(rand())',
            comment: 'Accepted',
            date: new Date(),
          },
          {
            id: 'submissionid7',
            language: 'Python',
            source: 'print(rand())',
            comment: 'Wrond Answer',
            date: new Date(),
          },
        ],
      },
      {
        id: 'problemid4',
        tests: [],
        inputFormat: '',
        outputFormat: '',
        name: 'A * B problem',
        statement: 'print product of two given numbers.',
        submissions: [
          {
            id: 'submissionid8',
            language: 'C++',
            source: 'std::cout << a * b << std::endl;',
            comment: 'Wrond Answer',
            date: new Date(),
          },
        ],
      },
    ],
    activity: [
      {
        object: { id: 'userid1', name: 'Gleb Marin' },
        type: 'follow',
        subject: { id: 'userid4', name: 'Alexey Luchinin' },
        date: new Date('01 May 2021 13:12:11 GMT'),
        count: 1,
      },
      {
        object: { id: 'userid1', name: 'Gleb Marin' },
        type: 'problem-attempt',
        subject: { id: 'problemid1', name: 'Сортировка матрицы' },
        date: new Date(),
        count: 1,
      },
      {
        object: { id: 'userid1', name: 'Gleb Marin' },
        type: 'problem-new',
        subject: { id: 'problemid2', name: 'A - B problem' },
        date: new Date(),
        count: 1,
      },
    ],
  },
  {
    id: 'userid2',
    type: 'user',
    registrationDate: new Date(),
    name: 'Danil Bubnov',
    password: 'password',
    avatarPath: 'https://sun9-59.userapi.com/impf/c846320/v846320980/1c585a/o1H12CIh8R4.jpg?size=1484x1200&quality=96&sign=1eb888a5878b3cfd5eeb45042093497c&type=album',
    bio: 'Intellij IDEA Pugin Developer',
    contacts:
      [{ name: 'telegram', ref: 'danilbk123' }],
    following: ['userid3'],
    followers: ['userid1', 'userid3', 'userid4'],
    teams: ['teamid1'],
    root: 'folderid2',
    activity: [],
    problems: [
      {
        id: 'problemid21',
        name: 'A - B problem',
        statement: 'print difference of two given numbers.',
        submissions: [
          {
            id: 'submissionid3',
            language: 'C++',
            source: 'std::cout << a + b << std::endl;',
            comment: 'Wrond Answer',
            date: new Date(),
          },
          {
            id: 'submissionid4',
            language: 'C++',
            source: 'std::cout << a - b << std::endl;',
            comment: 'Accepted',
            date: new Date(),
          },
        ],
      },
    ],
  },
  {
    id: 'userid3',
    type: 'user',
    registrationDate: new Date(),
    name: 'Ilya Onofriychuk',
    password: 'password',
    avatarPath: 'https://sun9-2.userapi.com/impf/c604628/v604628475/9b54/Bm0f5SmnuXM.jpg?size=1080x1080&quality=96&sign=86980b7d8ca33964a4fadecc914ea90f&type=album',
    bio: 'Backend Developer',
    contacts: [],
    following: ['userid2'],
    followers: ['userid1', 'userid2'],
    teams: ['teamid1', 'teamid2'],
    root: 'folderid3',
    activity: [],
    problems: [],
  },
  {
    id: 'userid4',
    type: 'user',
    registrationDate: new Date(),
    name: 'Alexey Luchinin',
    password: 'password',
    avatarPath: 'https://sun9-25.userapi.com/impf/Knsi9wbEI8AeAkvQDlgiBXP1oVNxj8IkXrT6gQ/xXdOBgyRQJ4.jpg?size=1920x1920&quality=96&sign=fb7759441823347dfb3c2512023a2377&type=album',
    bio: 'Developer of Something',
    contacts: [],
    following: ['userid1', 'userid2'],
    followers: ['userid1'],
    teams: ['teamid2'],
    root: 'folderid4',
    activity: [],
    problems: [],
  },
];

const teams = [
  {
    id: 'teamid1',
    type: 'team',
    registrationDate: new Date(),
    name: 'ProjectX',
    password: 'password',
    avatarPath: 'https://rusmonitor.com/wp-content/uploads/2019/08/B2th9IcQ_400x400.png',
    members: ['userid1', 'userid2', 'userid3'],
    bio: 'Yong HSE Java lovers',
    followers: [],
    root: 'teamfolderid1',
    activity: [],
    problems: [],
  },
  {
    id: 'teamid2',
    type: 'team',
    registrationDate: new Date(),
    name: 'Ample',
    password: 'password',
    avatarPath: 'https://upload.wikimedia.org/wikipedia/ru/d/d6/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%9D%D0%98%D0%A3_%D0%92%D0%A8%D0%AD.jpg',
    members: ['userid1', 'userid4', 'userid3'],
    bio: 'Yong HSE C++ (and .json) lovers',
    followers: [],
    root: 'teamfolderid2',
    activity: [],
    problems: [],
  },
];

const systems = [
  {
    id: 'codeforces',
    type: 'system',
    registrationDate: new Date(),
    name: 'Codeforces',
    avatarPath: 'https://habrastorage.org/getpro/habr/upload_files/c5c/d81/221/c5cd81221fffa306f13a4cdea6d4cb1f.png',
    origin: 'https://codeforces.com/',
    root: 'judgefolderid1',
    activity: [],
    problems: [],
  },
  {
    id: 'atcoder',
    type: 'system',
    registrationDate: new Date(),
    name: 'AtCoder',
    avatarPath: 'https://img.atcoder.jp/assets/atcoder.png',
    origin: 'https://atcoder.jp/',
    root: 'judgefolderid2',
    activity: [],
    problems: [],
  },
];

const folders = [
  {
    id: 'folderid1',
    parent: null,
    name: 'Gleb Marin',
    owner: 'userid1',
    items: [
      { isFolder: false, id: 'problemid1' },
      { isFolder: false, id: 'problemid2' },
      { isFolder: false, id: 'problemid3' },
    ],
  },
  {
    id: 'folderid2',
    parent: null,
    sharedWith: ['userid1', 'userid2'],
    name: 'Danil Bubnov',
    owner: 'userid2',
    items: [
      { isFolder: false, id: 'problemid21' },
    ],
  },
  {
    id: 'folderid3',
    parent: null,
    owner: 'userid3',
    name: 'Ilya Onofriychuck',
    items: [],
  },
  {
    id: 'folderid4',
    parent: null,
    owner: 'userid4',
    name: 'Alexey Luchinin',
    items: [],
  },
  {
    id: 'teamfolderid1',
    parent: null,
    owner: 'teamid1',
    name: 'ProjectX',
    items: [],
  },
  {
    id: 'teamfolderid2',
    parent: null,
    owner: 'teamid2',
    name: 'Ample',
    items: [],
  },
  {
    id: 'judgefolder1',
    parent: null,
    owner: 'codeforces',
    name: 'Codeforces',
    items: [],
  },
  {
    id: 'judgefolder2',
    parent: null,
    owner: 'atcoder',
    name: 'AtCoder',
    items: [],
  },
];

const db = {
  users,
  teams,
  folders,
  systems,
};

export default db;
