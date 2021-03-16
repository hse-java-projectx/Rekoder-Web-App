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
